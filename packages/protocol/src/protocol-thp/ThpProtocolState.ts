import { ThpDeviceProperties, ThpHandshakeCredentials, ThpMessageSyncBit } from './messages';

export interface ThpProtocolState0 {
    properties?: ThpDeviceProperties;
    handshakeCredentials?: ThpHandshakeCredentials;
    pairingCredentials?: Buffer; // to remove
    channel: Buffer;
    sendBit: ThpMessageSyncBit;
    sendNonce: number;
    recvBit: ThpMessageSyncBit;
    recvNonce: number;
    tag: Buffer; // remove
    sessionId: number; // Buffer?
    preEncode: () => Buffer;
    preDecode: (messages: any) => Buffer;
}

export class ThpProtocolState {
    // private _properties?: ThpDeviceProperties;
    private _handshakeCredentials?: ThpHandshakeCredentials;
    // private _pairingCredentials?: Buffer;
    private _channel = Buffer.from('ffff', 'hex');
    private _sendBit: ThpMessageSyncBit = 0;
    private _sendNonce = 0;
    private _recvBit: ThpMessageSyncBit = 0;
    private _recvNonce = 1;
    private _sessionId = 0; // TODO Buffer?
    private _expectedResponses: number[] = [];

    get sendBit() {
        return this._sendBit;
    }

    get sendNonce() {
        return this._sendNonce;
    }

    get recvBit() {
        return this._recvBit;
    }

    get recvNonce() {
        return this._recvNonce;
    }

    updateSyncBit(type: 'send' | 'recv', syncBit?: ThpMessageSyncBit) {
        if (type === 'send') {
            this._sendBit = syncBit ?? this._sendBit > 0 ? 0 : 1;
        } else {
            this._recvBit = syncBit ?? this._recvBit > 0 ? 0 : 1;
        }
    }

    updateNonce(type: 'send' | 'recv', nonce?: number) {
        if (type === 'send') {
            this._sendNonce = nonce ?? this._sendNonce + 1;
        } else {
            this._recvNonce = nonce ?? this._recvNonce + 1;
        }
    }

    get channel() {
        return this._channel;
    }

    setChannel(channel: Buffer) {
        this._channel = channel;
    }

    get sessionId() {
        return this._sessionId;
    }

    setSessionId(sessionId: number) {
        this._sessionId = sessionId;
    }

    get handshakeCredentials() {
        return this._handshakeCredentials;
    }

    updateHandshakeCredentials(cre: Partial<ThpHandshakeCredentials>) {
        if (!this._handshakeCredentials) {
            this._handshakeCredentials = {
                handshakeHash: Buffer.alloc(0),
                trezorEncryptedStaticPubkey: Buffer.alloc(0),
                hostEncryptedStaticPubkey: Buffer.alloc(0),
                trezorKey: Buffer.alloc(0),
                hostKey: Buffer.alloc(0),
            };
        }
        this._handshakeCredentials = {
            ...this._handshakeCredentials,
            ...cre,
        };
    }

    serialize() {
        return {
            sendBit: this.sendBit,
            recvBit: this.recvBit,
            sendNonce: this.sendNonce,
            recvNonce: this.recvNonce,
        };
    }

    deserialize(json: ReturnType<(typeof this)['serialize']>) {
        if (!json || typeof json !== 'object') {
            throw new Error('ThpProtocolState.deserialize empty state');
        }
        [json.sendBit, json.recvBit, json.sendNonce, json.recvNonce].forEach(nr => {
            if (typeof nr !== 'number') {
                throw new Error('ThpProtocolState.deserialize invalid state');
            }
        });

        this.updateSyncBit('send', json.sendBit);
        this.updateSyncBit('recv', json.recvBit);
        this.updateNonce('send', json.sendNonce);
        this.updateNonce('recv', json.recvNonce);
    }

    setExpectedResponse(ex: number[]) {
        this._expectedResponses = ex;
    }

    get expectedResponses() {
        return this._expectedResponses;
    }

    shouldUpdateNonce(messageName: string) {
        if (
            [
                'ThpCreateChannelRequest',
                'ThpCreateChannelResponse',
                'ThpHandshakeInitRequest',
                'ThpHandshakeInitResponse',
                'ThpHandshakeCompletionRequest',
                'ThpHandshakeCompletionResponse',
            ].includes(messageName)
        ) {
            // keep nonce at initial values for first three messages of the handshake workflow
            this._sendNonce = 0;
            this._recvNonce = 1;

            return false;
        }

        return true;
    }

    toString() {
        return JSON.stringify(this.serialize());
    }
}
