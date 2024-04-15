import { createHash, randomBytes } from 'crypto';
import { Messages } from '@trezor/transport';
import { thp as protocolThp } from '@trezor/protocol';
import type { Device } from './Device';
import { UiResponseThpPairingTag, DEVICE } from '../events';

type DefaultMessageResponse = any;

// TODO: react to device disconnection?
// TODO: return type
export const thpCall = async (
    device: Device,
    name: keyof protocolThp.ThpMessageType | Messages.MessageKey,
    data: Record<string, unknown> = {},
): Promise<any> => {
    console.warn('THPCall', name, device.transportState);
    const result = await device.transport.call({
        session: device.activitySessionID!, // TODO: possible conflicts
        name,
        data,
        protocol: device.protocol,
        protocolState: device.transportState,
        // TODO: abort signal
    }).promise;
    console.warn('THPCall result', result);

    if (result.success) {
        if (
            (name === 'ThpStartPairingRequest' || name === 'ThpCodeEntryChallenge') &&
            result.payload.type === 'ThpPairingPreparationsFinished'
        ) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return thpWaitForThpPairingTag(device);
        }

        // TODO: duplicate with DeviceCommands
        if (result.payload.type === 'ButtonRequest') {
            return thpCall(device, 'ButtonAck', {});
        }
        if (result.payload.type === 'Failure') {
            throw new Error('thpCall Failure');
        }
    }

    return result;
};

// TODO: return type
export const thpHandshake = async (device: Device, _settings: any): Promise<any> => {
    const hostStaticKeys = protocolThp.getCurve25519KeyPair(randomBytes(32)); // TODO: move this level up
    const hostEphemeralKeys = protocolThp.getCurve25519KeyPair(randomBytes(32));
    const hostEphemeralPubKey = Buffer.from(hostEphemeralKeys.publicKey).toString('hex');

    const handshakeInit = await thpCall(device, 'ThpHandshakeInitRequest', {
        key: hostEphemeralPubKey,
    });
    if (!handshakeInit.success) {
        return handshakeInit;
    }

    const { trezorEphemeralPubkey, trezorEncryptedStaticPubkey, tag } =
        handshakeInit.payload.message;

    const protocolState = device.transportState;

    // Result of ThpCredentialRequest below
    const knownCredentials: any[] = [
        // {
        //     staticPubkey: '00bf529fc8dd4662d4d1d1fa66368b8758c0b6673a1bb9d532d95ca607cbf700',
        //     credential: undefined,
        // },
        // {
        //     trezor_static_pubkey:
        //         '2991323cda7f4d5e8a1d24a79d13d93495f23e9eb8bf4348cd55d7c50bda8322',
        //     credential:
        //         '0a0a0a08486f73744e616d651220489054607ae8deb607303831f1257352e3262aa17e530ffea66c081890ecbd52',
        // },
    ];

    // const isKnown = protocolThp.findKnownPairingCredentials(
    //     Buffer.from(knownCredentials[0].trezor_static_pubkey, 'hex'),
    //     trezorEphemeralPubkey,
    // );

    const handshakeCredentials = protocolThp.handleHandshakeInitResponse({
        hostStaticKeys,
        hostEphemeralKeys,
        trezorEphemeralPubkey,
        trezorEncryptedStaticPubkey,
        tag,
        handshakeHash: protocolState.handshakeCredentials!.handshakeHash,
        sendNonce: protocolState.sendNonce,
        recvNonce: protocolState.recvNonce,
        knownCredentials,
    });

    const { hostKey, trezorKey, trezorMaskedStaticPubkey, hostEncryptedStaticPubkey } =
        handshakeCredentials;

    // console.warn('isKnown?', Buffer.compare(isKnown, trezorMaskedStaticPubkey));

    device.transportState.updateHandshakeCredentials({
        trezorEncryptedStaticPubkey,
        hostEncryptedStaticPubkey,
        handshakeHash: handshakeCredentials.handshakeHash,
        trezorKey,
        hostKey,
    });

    return thpCall(device, 'ThpHandshakeCompletionRequest', {
        hostPubkey: hostEncryptedStaticPubkey,
        noise: {
            // pairing_methods: ['PairingMethod_CodeEntry'],
            pairing_methods: [2],
            // pairing_methods: [2, 3],
            // pairing_methods: [1],
            // host_pairing_credential: Buffer.from(
            //     '0a0a0a08486f73744e616d65122003c8b7112fa0f103cad46a828088dafb9b80f96926a595f7f333b5f436e03ede',
            //     'hex',
            // ),
        },
        trezorMaskedStaticPubkey,
        trezorEphemeralPubkey,
        knownCredentials: [], // TODO
    });
};

// Try to establish Trezor Host Protocol channel
// this operation is allowed to fail:
// - on older FW without THP
// - using older trezord, bridge older than 3.0.0 adds MESSAGE_MAGIC_HEADER_BYTE to each chunk
export const createThpChannel = async (device: Device) => {
    console.warn('createThpChannel');
    if (device.useLegacyProtocol()) {
        console.warn(`Trezor Host Protocol unavailable on bridge ${device.transport.version}`);

        // TODO: try protocolV1 anyway, it sill can be an older device...
        return false;
    }

    // already set
    // if (device.transportState.channel.toString('hex') !== 'ffff') {
    //     if (!device.features) {
    //         console.warn('Start pairing...', device.transportState);
    //         const handshake = await thpHandshake(device);
    //         console.warn('Hanshake success', handshake);
    //         if (!handshake.success) {
    //             return handshake;
    //         }

    //         // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //         await thpPairing(device);
    //     }

    //     return;
    // }

    const createChannel = await thpCall(device, 'ThpCreateChannelRequest', {
        nonce: randomBytes(8),
    });

    if (createChannel.success) {
        const { properties, ...p } = createChannel.payload.message;
        device.properties = properties;
        device.transportState.setChannel(p.channel);
        device.transportState.updateHandshakeCredentials({ handshakeHash: p.handshakeHash });
    } else {
        throw new Error('ThpCreateChannelRequest error');
    }

    // if (withHandshake) {
    //     await thpHandshake(device);
    // }
};

export const initThpChannel = async (device: Device, settings: any) => {
    console.warn('initThpChannel');
    if (device.useLegacyProtocol()) {
        console.warn(`Trezor Host Protocol unavailable on bridge ${device.transport.version}`);

        // TODO: try protocolV1 anyway, it sill can be an older device...
        return false;
    }

    if (device.transportState.channel.toString('hex') === 'ffff') {
        await createThpChannel(device);
    }

    if (!device.features) {
        console.warn('Start pairing...', device.transportState);
        const handshake = await thpHandshake(device, settings);
        console.warn('Hanshake success', handshake);
        if (!handshake.success) {
            return handshake;
        }

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await thpPairing(device, settings);
    }
};

const promptThpPairing = (device: Device) => {
    return new Promise<UiResponseThpPairingTag>((resolve, reject) => {
        device.emit(DEVICE.THP_PAIRING, device, (err, code) => {
            if (err) {
                reject(err);
            } else {
                resolve(code);
            }
        });
    });
};

// TODO: duplicate with DeviceCommands
type PassphrasePromptResponse = {
    passphrase?: string;
    passphraseOnDevice?: boolean;
    cache?: boolean;
};
const promptPassphrase = (device: Device) => {
    return new Promise<PassphrasePromptResponse>((resolve, reject) => {
        device.emit(DEVICE.PASSPHRASE, device, (response, error?: Error) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

const thpWaitForThpPairingTag = async (device: Device): Promise<DefaultMessageResponse> => {
    // @ts-expect-error
    const debugState = await thpCall(device, 'DebugLinkGetState', {});
    const { thp_pairing_code_entry_code } = debugState.payload.message;

    console.warn('debugState', debugState);

    const readCancel = device.transport.receive({
        session: device.activitySessionID!,
        protocol: device.protocol,
        protocolState: device.transportState,
    });

    const cancelPromise = readCancel.promise
        .then(r => {
            if (!r.success) {
                console.warn('readCancelPromise resolved with error', r);

                return new Promise<DefaultMessageResponse>(() => {});
            }
            console.warn('readCancelPromise result', r);

            // TODO: type is wrong, r is a TransportResponse not DefaultMessageResponse
            return r as unknown as DefaultMessageResponse;
        })
        .catch(e => {
            console.warn('readCancelPromise error', e);

            // never resolve?
            return new Promise<DefaultMessageResponse>(() => {});
            // throw new Error(`Unknown source + ${response.payload.source}`);
        });

    const pairingPromise = promptThpPairing(device).then(
        response => {
            readCancel.abort();

            response.payload.value = thp_pairing_code_entry_code;

            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return processThpPairingResponse(device, response);
        },
        () => thpCall(device, 'Cancel', {}),
    );

    console.warn('Waiting....');

    // return either cancel on Trezor or pairing process
    return Promise.race([cancelPromise, pairingPromise]);
};

export const getThpSession = async (device: Device) => {
    console.warn('getThpSession', device.transportState.sessionId);
    if (device.transportState.sessionId) {
        return device.transportState.sessionId;
    }

    console.warn('Waiting for PASSPHRASE');
    const passphrase = await promptPassphrase(device)
        .then(response => {
            // const { passphrase, passphraseOnDevice, cache } = response;
            console.warn('PASSS', response);

            return response;
        })
        .catch(e => {
            console.warn('PASSS error', e);
        });

    if (passphrase) {
        const newSessionParams = passphrase.passphraseOnDevice
            ? { on_device: passphrase.passphraseOnDevice }
            : { passphrase: passphrase.passphrase };

        const newSession = await thpCall(device, 'ThpCreateNewSession', newSessionParams);

        console.warn('my new session is', newSessionParams, newSession);

        device.transportState.setSessionId(newSession.payload.message.new_session_id);

        return newSession.payload.message.new_session_id;
    }
};

const processThpPairingResponse = async (device: Device, { payload }: UiResponseThpPairingTag) => {
    console.warn('processThpPairingResponse', payload);

    if (payload.source === 'qr-code') {
        return thpCall(device, 'ThpQrCodeTag', {
            tag: createHash('sha256')
                .update(Buffer.from(payload.value, 'hex'))
                .digest()
                .toString('hex'),
        });
    }

    if (payload.source === 'nfc') {
        return thpCall(device, 'ThpNfcUnidirectionalTag', {
            tag: '00', // TODO
        });
    }

    if (payload.source === 'code-entry') {
        const hostKeys = protocolThp.getCpaceHostKeys(
            payload.value,
            device.transportState!.handshakeCredentials!.handshakeHash,
        );
        const cpaceTrezor = await thpCall(device, 'ThpCodeEntryCpaceHost', {
            cpace_host_public_key: hostKeys.publicKey.toString('hex'),
        });

        if (!cpaceTrezor.success) throw new Error('cpaceTrezor unsuccessful');

        if (!cpaceTrezor.payload.message.cpace_trezor_public_key) {
            throw new Error('TODO: is it optional?');
        }

        const tag = protocolThp
            .getShareSecret(
                Buffer.from(cpaceTrezor.payload.message.cpace_trezor_public_key, 'hex'),
                hostKeys.privateKey,
            )
            .toString('hex');

        return thpCall(device, 'ThpCodeEntryTag', {
            tag,
        });
    }

    throw new Error(`Unknown THP pairing source + ${payload.source}`);
};

const thpPairing = async (device: Device, _settings: any) => {
    const pairingReq = await thpCall(device, 'ThpStartPairingRequest', {
        host_name: 'HostName',
    });
    if (!pairingReq.success) return pairingReq;

    // using No_Method
    if (pairingReq.payload.type === 'ThpEndResponse') {
        // isPaired = true;
        return;
    }

    console.warn('after ThpStartPairingRequest', pairingReq);

    if (pairingReq.payload.type === 'ThpCodeEntryCommitment') {
        const createCodeEntryChallenge = await thpCall(device, 'ThpCodeEntryChallenge', {
            challenge: randomBytes(32),
        });

        console.warn('createCodeEntryChallenge', createCodeEntryChallenge);

        if (!createCodeEntryChallenge.success) {
            throw new Error('ThpCodeEntryChallenge unsuccessful');
        }
    }

    const createEndReq = await thpCall(device, 'ThpEndRequest', {});

    if (!createEndReq) {
        throw new Error('ThpEndRequest error');
    }
};
