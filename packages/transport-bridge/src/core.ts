import { WebUSB } from 'usb';

import {
    v1 as protocolV1,
    v2 as protocolV2,
    thp as protocolThp,
    bridge as protocolBridge,
    TransportProtocol,
} from '@trezor/protocol';
import { receive as receiveUtil } from '@trezor/transport/src/utils/receive';
import { createChunks, sendChunks } from '@trezor/transport/src/utils/send';
import { SessionsBackground } from '@trezor/transport/src/sessions/background';
import { SessionsClient } from '@trezor/transport/src/sessions/client';
import { UsbApi } from '@trezor/transport/src/api/usb';
import { UdpApi } from '@trezor/transport/src/api/udp';
import { AcquireInput, ReleaseInput } from '@trezor/transport/src/transports/abstract';
import { Session } from '@trezor/transport/src/types';
import { Log } from '@trezor/utils';
import { AbstractApi } from '@trezor/transport/src/api/abstract';

export const createCore = (apiArg: 'usb' | 'udp' | AbstractApi, logger?: Log) => {
    let api: AbstractApi;

    const abortController = new AbortController();
    const sessionsBackground = new SessionsBackground({ signal: abortController.signal });

    const sessionsClient = new SessionsClient({
        requestFn: args => sessionsBackground.handleMessage(args),
        registerBackgroundCallbacks: () => {},
    });

    sessionsBackground.on('descriptors', descriptors => {
        sessionsClient.emit('descriptors', descriptors);
    });

    if (typeof apiArg === 'string') {
        api =
            apiArg === 'udp'
                ? new UdpApi({ logger })
                : new UsbApi({
                      logger,
                      usbInterface: new WebUSB({
                          allowAllDevices: true, // return all devices, not only authorized
                      }),

                      // todo: possibly only for windows
                      forceReadSerialOnConnect: true,
                  });
    } else {
        api = apiArg;
    }

    api.listen();

    // whenever low-level api reports changes to descriptors, report them to sessions module
    api.on('transport-interface-change', descriptors => {
        logger?.debug(`core: transport-interface-change ${JSON.stringify(descriptors)}`);
        sessionsClient.enumerateDone({ descriptors });
    });

    const writeUtil = async ({
        path,
        data,
        signal,
        protocol,
    }: {
        path: string;
        data: string;
        signal: AbortSignal;
        protocol: TransportProtocol;
    }) => {
        let encodedMessage;
        if (protocol.name === 'v2') {
            // no need to change protocol encoding, just use received format
            encodedMessage = Buffer.from(data, 'hex');
        } else {
            const { messageType, payload } = protocolBridge.decode(Buffer.from(data, 'hex'));
            encodedMessage = protocolV1.encode(payload, { messageType });
        }

        const chunks = createChunks(
            encodedMessage,
            protocol.getChunkHeader(encodedMessage),
            api.chunkSize,
        );
        const apiWrite = (chunk: Buffer) => api.write(path, chunk, signal);
        const sendResult = await sendChunks(chunks, apiWrite);

        return sendResult;
    };

    const readUtil = async ({
        path,
        signal,
        protocol,
    }: {
        path: string;
        signal: AbortSignal;
        protocol: TransportProtocol;
    }) => {
        console.warn('Read', path);
        try {
            const { messageType, payload, header } = await receiveUtil(
                () =>
                    api.read(path, signal).then(result => {
                        console.warn('API READ!!!', result);
                        if (result.success) {
                            return result.payload;
                        }
                        throw new Error(result.error);
                    }),
                protocol,
            );

            const encoder =
                messageType === 'TrezorHostProtocolMessage'
                    ? protocolV2.encode
                    : protocolBridge.encode;

            return {
                success: true as const,
                payload: encoder(payload, { header, messageType }).toString('hex'),
            };
        } catch (err) {
            logger?.debug(`core: readUtil catch: ${err.message}`);

            return { success: false as const, error: err.message as string };
        }
    };

    const enumerate = async ({ signal }: { signal: AbortSignal }) => {
        const enumerateResult = await api.enumerate(signal);

        if (!enumerateResult.success) {
            return enumerateResult;
        }

        const enumerateDoneResponse = await sessionsClient.enumerateDone({
            descriptors: enumerateResult.payload,
        });

        return enumerateDoneResponse;
    };

    const acquire = async (
        acquireInput: Omit<AcquireInput, 'previous'> & {
            previous: Session | 'null';
            signal: AbortSignal;
        },
    ) => {
        const acquireIntentResult = await sessionsClient.acquireIntent({
            path: acquireInput.path,
            previous: acquireInput.previous === 'null' ? null : acquireInput.previous,
        });
        if (!acquireIntentResult.success) {
            return acquireIntentResult;
        }

        const openDeviceResult = await api.openDevice(acquireInput.path, true, acquireInput.signal);
        logger?.debug(`core: openDevice: result: ${JSON.stringify(openDeviceResult)}`);

        if (!openDeviceResult.success) {
            return openDeviceResult;
        }
        await sessionsClient.acquireDone({ path: acquireInput.path });

        return acquireIntentResult;
    };

    const release = async ({ session }: Omit<ReleaseInput, 'path'>) => {
        await sessionsClient.releaseIntent({ session });

        const sessionsResult = await sessionsClient.getPathBySession({
            session,
        });

        if (!sessionsResult.success) {
            return sessionsResult;
        }

        const closeRes = await api.closeDevice(sessionsResult.payload.path);

        if (!closeRes.success) {
            logger?.error(`core: release: api.closeDevice error: ${closeRes.error}`);
        }

        return sessionsClient.releaseDone({ path: sessionsResult.payload.path });
    };

    const getProtocol = (url: string) => {
        try {
            const query = new URLSearchParams(url.split('?')[1] || '');
            if (query.get('protocol') === 'v2') {
                return protocolV2;
            }
        } catch (e) {
            // silent
        }

        return protocolBridge;
    };

    const getRequestBody = (data: string, protocol?: TransportProtocol) => {
        if (protocol?.name === 'v2') {
            try {
                const json = JSON.parse(data);
                const protocolState = new protocolThp.ThpProtocolState();
                protocolState.deserialize(json.state);

                return {
                    protocolState,
                    body: json.body,
                };
            } catch (e) {
                logger?.debug(`THP getRequestBody error: session: ${e}`);
                // TODO: break communication and return success: false
            }
        }

        return {
            protocolState: undefined,
            body: data,
        };
    };

    const call = async ({
        url,
        session,
        data,
        signal,
    }: {
        url: string;
        session: Session;
        data: string;
        signal: AbortSignal;
    }) => {
        logger?.debug(`core: call: session: ${session}`);
        const sessionsResult = await sessionsClient.getPathBySession({
            session,
        });
        if (!sessionsResult.success) {
            logger?.error(`core: call: retrieving path error: ${sessionsResult.error}`);

            return sessionsResult;
        }
        const protocol = getProtocol(url);
        const { body, protocolState } = getRequestBody(data, protocol);

        const { path } = sessionsResult.payload;
        logger?.debug(`core: call ${url}: retrieved path ${path} for session ${session}`);

        const openResult = await api.openDevice(path, false, signal);

        if (!openResult.success) {
            logger?.error(`core: call: api.openDevice error: ${openResult.error}`);

            return openResult;
        }
        logger?.debug(`core: call: api.openDevice done`);

        const writeResult = await writeUtil({ path, data: body, protocol, signal });
        if (!writeResult.success) {
            logger?.error(`core: call: writeUtil ${writeResult.error}`);

            return writeResult;
        }
        logger?.debug('core: call: readUtil');

        const readResult = await readUtil({ path, protocol, signal });
        if (!readResult.success) {
            return readResult;
        }

        if (protocol.name === 'v2') {
            const buffer = Buffer.from(readResult.payload, 'hex');
            const thpMessage = protocol.decode(buffer);
            const isThpAck = protocolThp.decodeAck(thpMessage);

            if (isThpAck) {
                protocolState?.updateSyncBit('send');
                // protocolState?.updateNonce('send');

                console.warn('ACK in response, reading again');
                const realResult = await readUtil({ path, protocol, signal });
                if (!realResult.success) {
                    return realResult;
                }
                // protocolState?.updateNonce('recv');

                console.warn('Send ThpReadAck');
                const chunk = protocolThp.encodeAck(Buffer.from(realResult.payload, 'hex'));

                const ackResult = await writeUtil({
                    path,
                    data: chunk.toString('hex'),
                    signal,
                    protocol,
                });
                if (!ackResult.success) {
                    return ackResult;
                }
                protocolState?.updateSyncBit('recv');

                return {
                    ...realResult,
                    payload: JSON.stringify({
                        body: realResult.payload,
                        state: protocolState?.serialize(),
                    }),
                };
            } else {
                return {
                    ...readResult,
                    payload: JSON.stringify({
                        body: readResult.payload,
                        state: protocolState?.serialize(),
                    }),
                };
            }
        }

        return readResult;
    };

    const send = async ({
        url,
        session,
        data,
        signal,
    }: {
        url: string;
        session: Session;
        data: string;
        signal: AbortSignal;
    }) => {
        const sessionsResult = await sessionsClient.getPathBySession({
            session,
        });

        if (!sessionsResult.success) {
            return sessionsResult;
        }
        const { path } = sessionsResult.payload;
        const protocol = getProtocol(url);

        const openResult = await api.openDevice(path, false, signal);
        if (!openResult.success) {
            return openResult;
        }

        if (protocol.name === 'v2') {
            const writeResult = await writeUtil({ path, data, signal, protocol });
            if (!writeResult.success) {
                return writeResult;
            }
            // Read ACK
            const readResult = await readUtil({ path, signal, protocol });
            if (!readResult.success) {
                return readResult;
            }

            return writeResult;
        }

        return writeUtil({ path, data, signal, protocol });
    };

    const receive = async ({
        url,
        session,
        signal,
    }: {
        url: string;
        session: Session;
        signal: AbortSignal;
    }) => {
        const sessionsResult = await sessionsClient.getPathBySession({
            session,
        });

        if (!sessionsResult.success) {
            return sessionsResult;
        }
        const { path } = sessionsResult.payload;
        const protocol = getProtocol(url);

        const openResult = await api.openDevice(path, false, signal);
        if (!openResult.success) {
            return openResult;
        }

        console.warn('receive readingUtil');

        const realResult = await readUtil({ path, signal, protocol });
        if (!realResult.success) {
            return realResult;
        }

        console.warn('receive Send ThpReadAck');
        const chunk = protocolThp.encodeAck(Buffer.from(realResult.payload, 'hex'));

        const ackResult = await writeUtil({
            path,
            data: chunk.toString('hex'),
            signal,
            protocol,
        });
        if (!ackResult.success) {
            return ackResult;
        }

        return realResult;
    };

    const dispose = () => {
        abortController.abort();
        api.dispose();
        sessionsClient.removeAllListeners('descriptors');
    };

    return {
        enumerate,
        acquire,
        release,
        call,
        send,
        receive,
        dispose,
        sessionsClient,
    };
};
