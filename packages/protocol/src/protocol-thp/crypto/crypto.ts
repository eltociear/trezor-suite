// State HH1
// https://www.notion.so/satoshilabs/Handshake-phase-1a1570ee0964418484c68117a1840819
// Reference: /trezor-firmware/core/src/trezor/wire/thp/crypto.py
import * as crypto from 'crypto';

import { curve25519, getCurve25519KeyPair } from './curve25519';
import { AESGCM } from './aesgcm';
import { ThpHandshakeCredentials, ThpCredentialResponse } from '../messages';

const PROTOCOL_NAME = Buffer.concat([
    Buffer.from('Noise_XX_25519_AESGCM_SHA256'),
    Buffer.alloc(4).fill(0),
]);

const hmacSHA256 = (key: Buffer, data: Buffer) =>
    crypto.createHmac('sha256', key).update(data).digest();

const hkdf = (chainingKey: Buffer, input: Buffer) => {
    const tempKey = hmacSHA256(chainingKey, input);
    const output1 = hmacSHA256(tempKey, Buffer.from([0x01]));

    const ctxOutput2 = crypto.createHmac('sha256', tempKey).update(output1);
    ctxOutput2.update(Buffer.from([0x02]));
    const output2 = ctxOutput2.digest();

    return [output1, output2];
};

const hashOfTwo = (hash1: Buffer, hash2: Buffer) =>
    crypto.createHash('sha256').update(hash1).update(hash2).digest();

export const getIvFromNonce = (nonce: number): Buffer => {
    const iv = new Uint8Array(12);
    const nonceBytes = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
        nonceBytes[7 - i] = nonce & 0xff;
        nonce = nonce >> 8;
    }

    iv.set(nonceBytes, 4);

    return Buffer.from(iv);
};

export const cipherMessage = (
    key: Buffer,
    sendNonce: number,
    handshakeHash: Buffer,
    payload: Buffer,
) => {
    // Set encrypted_payload = AES-GCM-ENCRYPT(key=k, IV=0^96, ad=h, plaintext=payload_binary).
    const aesGcm = new AESGCM(key, getIvFromNonce(sendNonce));
    aesGcm.auth(handshakeHash);
    const encryptedPayload = aesGcm.encrypt(payload);
    const encryptedPayloadTag = aesGcm.finish();

    return Buffer.concat([encryptedPayload, encryptedPayloadTag]);
};

export const decipherMessage = (
    key: Buffer,
    recvNonce: number,
    _handshakeHash: Buffer,
    payload: Buffer,
    tag: Buffer,
) => {
    const aesGcm = new AESGCM(key, getIvFromNonce(recvNonce));
    // aesGcm.auth(handshakeHash);
    aesGcm.auth(Buffer.alloc(0));
    const trezorMaskedStaticPubkey = aesGcm.decrypt(payload, tag);

    return trezorMaskedStaticPubkey.subarray(1); // session_id
    // return trezorMaskedStaticPubkey;
};

// TODO: rename me
export const handleCreateChannelResponse = (deviceProperties: Buffer) => {
    // 1. Set h = SHA-256(protocol_name || device_properties).
    return hashOfTwo(PROTOCOL_NAME, deviceProperties);
};

// called after handshakeCompletionRequest
export const updateKeys = (credentials: ThpHandshakeCredentials, payload: Buffer) => {
    const handshakeHash = hashOfTwo(credentials.handshakeHash, payload);
    const [hostKey, trezorKey] = hkdf(credentials.trezorKey, Buffer.alloc(0));

    // 2. Set trezor_state, success = AES-GCM-DECRYPT(key=key_response, IV=0^96, ad=empty_string, plaintext=trezor_state). Assert that success is True.
    // const aesGcm = new AESGCM(hostKey, Buffer.alloc(12));
    // aesGcm.auth(handshakeHash);
    // const trezorState =

    return {
        ...credentials,
        handshakeHash,
        trezorKey,
        hostKey,
    };
};

// 10. Search credentials for a pairs (trezor_static_pubkey, credential) such that trezor_masked_static_pubkey == X25519(SHA-256(trezor_static_pubkey || trezor_ephemeral_pubkey), trezor_static_pubkey).
export const findKnownPairingCredentials = (
    trezorStaticPubkey: Buffer,
    trezorEphemeralPubkey: Buffer,
) => {
    // X25519(SHA-256(trezor_static_pubkey || trezor_ephemeral_pubkey), trezor_static_pubkey).
    const h = hashOfTwo(trezorStaticPubkey, trezorEphemeralPubkey);

    return curve25519(h, trezorStaticPubkey);
};

export const getTrezorState = (credentials: ThpHandshakeCredentials, payload: Buffer) => {
    // 2. Set trezor_state, success = AES-GCM-DECRYPT(key=key_response, IV=0^96, ad=empty_string, plaintext=trezor_state). Assert that success is True.
    const aesGcm = new AESGCM(credentials.trezorKey, Buffer.alloc(12));
    aesGcm.auth(Buffer.alloc(0));
    const trezorState = aesGcm.decrypt(payload.subarray(0, 1), payload.subarray(1, 17));

    return trezorState.readUint8();
};

type KeyPair = {
    publicKey: Buffer;
    privateKey: Buffer;
};

type ThpCryptoOptions = {
    handshakeHash: Buffer;
    hostStaticKeys: KeyPair;
    hostEphemeralKeys: KeyPair;
    trezorEphemeralPubkey: Buffer;
    trezorEncryptedStaticPubkey: Buffer;
    tag: Buffer;
    sendNonce: number;
    recvNonce: number;
    knownCredentials: ThpCredentialResponse[];
};

export const handleHandshakeInitResponse = ({
    handshakeHash,
    hostStaticKeys,
    hostEphemeralKeys,
    trezorEphemeralPubkey,
    trezorEncryptedStaticPubkey,
    tag,
    knownCredentials,
    sendNonce,
    recvNonce,
}: ThpCryptoOptions) => {
    const iv0 = getIvFromNonce(sendNonce); // should be 0
    const iv1 = getIvFromNonce(recvNonce); // should be 1

    let h: Buffer, point: Buffer, aesGcm: AESGCM;

    // 1. Set h = SHA-256(protocol_name || device_properties).
    // h = hash_of_two(PROTOCOL_NAME, deviceProperties); // moved to handleCreateChannelResponse
    h = handshakeHash;
    // 2. Set h = SHA-256(h || host_ephemeral_pubkey).
    h = hashOfTwo(h, hostEphemeralKeys.publicKey);
    // 3. Set h = SHA-256(h || trezor_ephemeral_pubkey).
    h = hashOfTwo(h, trezorEphemeralPubkey);
    // 4. Set ck, k = HKDF(protocol_name, X25519(host_ephemeral_privkey, trezor_ephemeral_pubkey)).
    point = curve25519(hostEphemeralKeys.privateKey, trezorEphemeralPubkey);
    let [ck, k] = hkdf(PROTOCOL_NAME, point);

    // 5. Set trezor_masked_static_pubkey, success = AES-GCM-DECRYPT(key=k, IV=0^96 (bits, 12 bytes), ad=h, plaintext=encrypted_trezor_static_pubkey). Assert that success is True.
    aesGcm = new AESGCM(k, iv0);
    aesGcm.auth(h);
    const trezorStaticPubkey = trezorEncryptedStaticPubkey.subarray(0, 32);
    const trezorStaticPubkeyTag = trezorEncryptedStaticPubkey.subarray(32, 32 + 16);
    const trezorMaskedStaticPubkey = aesGcm.decrypt(trezorStaticPubkey, trezorStaticPubkeyTag);
    // 6. Set h = SHA-256(h || encrypted_trezor_static_pubkey)
    h = hashOfTwo(h, trezorEncryptedStaticPubkey);
    // 7. Set ck, k = HKDF(ck, X25519(host_ephemeral_privkey, trezor_masked_static_pubkey))
    point = curve25519(hostEphemeralKeys.privateKey, trezorMaskedStaticPubkey);
    [ck, k] = hkdf(ck, point);

    // 8. Set tag_of_empty_string, success = AES-GCM-DECRYPT(key=k, IV=0^96 (bits, 12 bytes), ad=h, plaintext=empty_string). Assert that success is True.
    aesGcm = new AESGCM(k, iv0);
    aesGcm.auth(h);
    aesGcm.decrypt(Buffer.alloc(0), tag);
    // 9. Set h = SHA-256(h || tag)
    h = hashOfTwo(h, tag);

    // 10. Search credentials for a pairs (trezor_static_pubkey, credential) such that trezor_masked_static_pubkey == X25519(SHA-256(trezor_static_pubkey || trezor_ephemeral_pubkey), trezor_static_pubkey).
    const credentials = knownCredentials.find(c => {
        return findKnownPairingCredentials(
            Buffer.from(c.trezor_static_pubkey!, 'hex'),
            trezorEphemeralPubkey,
        );
    });

    // 10.1 If found set (temp_host_static_privkey, temp_host_static_pubkey) = (host_static_privkey, host_static_pubkey).
    // 10.2 If not found set (temp_host_static_privkey, temp_host_static_pubkey) = (X25519(0, B), 0).
    const hostTempKeys = credentials
        ? hostStaticKeys
        : getCurve25519KeyPair(Buffer.alloc(32).fill(0));

    // 11. Set encrypted_host_static_pubkey = AES-GCM-ENCRYPT(key=k, IV=0^95 || 1, ad=h, plaintext=temp_host_static_pubkey).
    aesGcm = new AESGCM(k, iv1);
    aesGcm.auth(h);
    const hostEncryptedStaticPubkey = Buffer.concat([
        aesGcm.encrypt(hostTempKeys.publicKey),
        aesGcm.finish(),
    ]);
    // 12. Set h = SHA-256(h || encrypted_host_static_pubkey).
    h = hashOfTwo(h, hostEncryptedStaticPubkey);
    // 13. Set ck, k = HKDF(ck, X25519(temp_host_static_privkey, trezor_ephemeral_pubkey)).
    point = curve25519(hostTempKeys.privateKey, trezorEphemeralPubkey);
    [ck, k] = hkdf(ck, point);

    return {
        trezorMaskedStaticPubkey,
        trezorEncryptedStaticPubkey,
        hostEncryptedStaticPubkey,
        hostKey: k,
        trezorKey: ck,
        handshakeHash: h,
        credentials,
    };
};
