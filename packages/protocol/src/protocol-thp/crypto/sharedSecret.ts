import { randomBytes, createHash } from 'crypto';

import { elligator2, curve25519 } from './curve25519';

const sha256 = (buffer: Buffer) => createHash('sha256').update(buffer).digest();

// const sha512 = (buffer: Buffer) => createHash('sha512').update(buffer).digest();

export const getCpaceHostKeys = (code: number, handshakeHash: Buffer) => {
    // https://www.notion.so/satoshilabs/Pairing-phase-996b0e879fff4ebd9460ae27376fce76
    // If the user enters code, take the following actions:
    // 2. Compute *pregenerator* as the first 32 bytes of SHA-512(*prefix* || *code* - 6 bytes || *padding || h*), where *prefix* is the byte-string  0x08 || 0x43 || 0x50 || 0x61 || 0x63 || 0x65 || 0x32 || 0x35 || 0x35 || 0x06 and *padding* is the byte-string 0x50 || 0x00 ^ 80 || 0x20.
    // 3. Set *generator =* ELLIGATOR2(*pregenerator*).
    // 4. Generate a random 32-byte *cpace_host_private_key.*
    // 5. Set *cpace_host_public_key* = X25519(*cpace_host_private_key*, *generator*).
    // 6. Send the message CodeEntryCpaceHost(*cpace_host_public_key*) to the host.

    // TODO: code value on 6 bytes written with offset 2
    const codeValue = Buffer.alloc(6);
    codeValue.writeUint32BE(code, 2);

    const shaCtx = createHash('sha512');
    shaCtx.update(Buffer.from([0x08, 0x43, 0x50, 0x61, 0x63, 0x65, 0x32, 0x35, 0x35, 0x06]));
    shaCtx.update(codeValue);
    shaCtx.update(
        Buffer.concat([Buffer.from([0x6f]), Buffer.alloc(111).fill(0), Buffer.from([0x20])]),
    );
    shaCtx.update(handshakeHash);
    shaCtx.update(Buffer.from([0x00]));
    const sha = shaCtx.digest().subarray(0, 32);

    const generator = elligator2(sha);

    const privateKey = randomBytes(32);
    const publicKey = curve25519(privateKey, generator);

    return { privateKey, publicKey };
};

export const getShareSecret = (publicKey: Buffer, privateKey: Buffer) => {
    // 1. Set *shared_secret* = X25519(*cpace_host_private_key*, *cpace_trezor_public_key*).
    // 2. Set *tag* = SHA-256(*shared_secret*).

    const sharedSecret = curve25519(privateKey, publicKey);

    const sha = sha256(Buffer.from(sharedSecret));

    return sha;
};
