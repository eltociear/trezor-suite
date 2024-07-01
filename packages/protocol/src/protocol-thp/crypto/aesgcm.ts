import * as crypto from 'crypto';

export class AESGCM {
    private key: Buffer;
    private cipher: crypto.CipherGCM;
    private decipher: crypto.DecipherGCM;

    constructor(key: Buffer, iv: Buffer) {
        this.key = key;
        this.cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        this.decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    }

    auth(authData: Buffer) {
        this.cipher.setAAD(authData);
        this.decipher.setAAD(authData);
    }

    encrypt(plaintext: Buffer) {
        const encrypted = this.cipher.update(plaintext);
        const finalBuffer = this.cipher.final();
        const result = Buffer.concat([encrypted, finalBuffer]);

        return result;
    }

    decrypt(ciphertext: Buffer, authTag: Buffer) {
        try {
            this.decipher.setAuthTag(authTag);

            const decrypted = this.decipher.update(ciphertext);
            // this.decipher
            const finalBuffer = this.decipher.final();
            const result = Buffer.concat([decrypted, finalBuffer]);

            return result;
        } catch (err) {
            console.error('Decryption error:', err);
            throw err;
        }
    }

    finish() {
        try {
            const tag = this.cipher.getAuthTag();

            return tag;
        } catch (err) {
            throw err;
        }
    }

    reset(iv: Buffer) {
        this.cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
        this.decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
    }
}
