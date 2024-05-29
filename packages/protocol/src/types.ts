import type { ThpProtocolState } from './protocol-thp/ThpProtocolState';

export type { ThpProtocolState } from './protocol-thp/ThpProtocolState';

export type { ThpDeviceProperties } from './protocol-thp/messages';

export type TransportProtocolState = ThpProtocolState;

export type TransportProtocolDecode = (bytes: Buffer) => {
    header: Buffer;
    length: number;
    messageType: number | string;
    payload: Buffer;
};

export interface TransportProtocolEncodeOptions {
    messageType: number | string;
    header?: Buffer;
}

export type TransportProtocolEncode = (
    data: Buffer,
    options: TransportProtocolEncodeOptions,
) => Buffer;

export interface TransportProtocol {
    name: string;
    encode: TransportProtocolEncode;
    decode: TransportProtocolDecode;
    getChunkHeader: (data: Buffer) => Buffer;
}
