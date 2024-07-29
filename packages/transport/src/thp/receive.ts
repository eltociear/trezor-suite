// receive with ThpAck

import type { Root } from 'protobufjs/light';
import { decode as decodeProtobuf, createMessageFromType } from '@trezor/protobuf';
import { TransportProtocolState, thp as protocolThp, v2 as v2Protocol } from '@trezor/protocol';

import { receive } from '../utils/receive';
import { AsyncResultWithTypedError } from '../types';

type SendThpMessageProps = {
    protocolState?: TransportProtocolState;
    chunks: Buffer[];
    apiWrite: (chunk: Buffer, signal?: AbortSignal) => AsyncResultWithTypedError<any, any>;
    apiRead: (signal?: AbortSignal) => AsyncResultWithTypedError<any, any>;
    signal?: AbortSignal;
};

type ReceiveThpMessageProps = Omit<SendThpMessageProps, 'chunks'> & {
    messages: Root;
};

// Filter transport Api.read results and ignore unexpected messages
// retry indefinitely until aborted
export const readWithExpectedState = async (
    apiRead: SendThpMessageProps['apiRead'],
    protocolState?: TransportProtocolState,
    signal?: AbortSignal,
): Promise<any> => {
    if (signal?.aborted) {
        throw new Error('Already aborted');
    }
    console.warn('readWithExpectedState start', signal?.aborted);
    const chunk = await apiRead(signal);

    if (signal?.aborted) {
        throw new Error('Already aborted');
    }

    console.warn('readWithExpectedState chunk', protocolState?.expectedResponses, chunk);
    // technically this done in send
    if (!chunk.success) {
        throw new Error(chunk.error);
    }

    const expected = protocolThp.isExpectedResponse(chunk.payload, protocolState);
    if (expected) {
        return chunk.payload;
    }

    console.warn(
        'readWithExpectedState chunk doesnt match',
        chunk.payload.subarray(0, 3),
        protocolState?.expectedResponses,
    );

    // TODO: setTimeout here?, check attempts and retry frequency?
    return readWithExpectedState(apiRead, protocolState, signal);
};

export const receiveThpMessage = async ({
    messages,
    protocolState,
    apiRead,
    apiWrite,
    signal,
}: ReceiveThpMessageProps): Promise<any> => {
    console.warn('receiveThpMessage start', apiRead);

    const decoded = await receive(
        () => readWithExpectedState(apiRead, protocolState, signal),
        v2Protocol,
    );

    const isAckExpected = protocolThp.isAckExpected(protocolState?.expectedResponses || []);
    if (isAckExpected) {
        const ack = protocolThp.encodeAck(decoded.header);
        console.warn('Writing Ack', ack);
        const ackResult = await apiWrite(ack, signal);

        if (!ackResult.success) {
            // what to do here?
        }
    }

    // make sure that THP protobuf messages are loaded
    protocolThp.loadProtobuf(messages);

    const protobufDecoder = (protobufMessageType: string | number, protobufPayload: Buffer) => {
        const { Message, messageName } = createMessageFromType(messages, protobufMessageType);
        const message = decodeProtobuf(Message, protobufPayload);

        return {
            messageName,
            message,
        };
    };

    const { messageName, message } = protocolThp.decode(decoded, protobufDecoder, protocolState);

    if (isAckExpected) {
        protocolState?.updateSyncBit('recv');
    }

    if (protocolState?.shouldUpdateNonce(messageName)) {
        protocolState?.updateNonce('send');
        protocolState?.updateNonce('recv');
    }

    return {
        message,
        type: messageName,
    };
};
