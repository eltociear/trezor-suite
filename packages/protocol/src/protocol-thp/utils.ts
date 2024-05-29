import { ThpMessageSyncBit } from './messages';

export const addAckBit = (magic: number, ackBit: number) => {
    const result = Buffer.alloc(1);
    result.writeInt8(magic | (ackBit << 3));

    return result;
};

export const addSequenceBit = (magic: number, seqBit: number) => {
    const result = Buffer.alloc(1);
    result.writeInt8(magic | (seqBit << 4));

    return result;
};

export const clearControlBit = (magic: number) => {
    // clear 4th (ack) and 5th (sequence) bit
    return magic & ~(1 << 3) & ~(1 << 4);
};

export const getControlBit = (magic: number): ThpMessageSyncBit => {
    const ackBit = (magic & (1 << 3)) === 0 ? 0 : 1;
    const sequenceBit = (magic & (1 << 4)) === 0 ? 0 : 1;

    return ackBit || sequenceBit;
};
