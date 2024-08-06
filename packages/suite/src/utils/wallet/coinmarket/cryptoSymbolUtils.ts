import { networks, NetworkSymbol } from '@suite-common/wallet-config';
import { CryptoId, CryptoSymbol } from 'invity-api';

const networkToCryptoSymbols: Partial<Record<NetworkSymbol, CryptoSymbol>> = {
    btc: 'BTC',
    ltc: 'LTC',
    eth: 'ETH',
    etc: 'ETC',
    xrp: 'XRP',
    bch: 'BCH',
    btg: 'BTG',
    dash: 'DASH',
    dgb: 'DGB',
    doge: 'DOGE',
    zec: 'ZEC',
    test: 'TEST',
    ada: 'ADA',
    sol: 'SOL',
    matic: 'MATIC',
};

const cryptoToNetworkSymbols: Partial<Record<CryptoSymbol, NetworkSymbol>> = {};
Object.keys(networkToCryptoSymbols).forEach(
    key =>
        (cryptoToNetworkSymbols[networkToCryptoSymbols[key as NetworkSymbol] as CryptoSymbol] =
            key as NetworkSymbol),
);

interface ParsedCryptoId {
    networkId: CryptoId;
    contractAddress: string | undefined;
}

export function parseCryptoId(cryptoId: CryptoId): ParsedCryptoId {
    const parts = cryptoId.split('@');

    return { networkId: parts[0] as CryptoId, contractAddress: parts[1] };
}

export function toTokenCryptoId(networkId: string, contractAddress: string): CryptoId {
    return `${networkId}@${contractAddress}` as CryptoId;
}

export function isCryptoSymbolToken(cryptoSymbol: CryptoSymbol): boolean {
    return cryptoSymbol.indexOf('@') >= 0;
}

export function cryptoToCoinSymbol(cryptoSymbol: CryptoSymbol): string {
    return cryptoSymbol.split('@')[0];
}

export function networkToCryptoSymbol(networkSymbol: NetworkSymbol): CryptoSymbol | undefined {
    return networkToCryptoSymbols[networkSymbol];
}

export function cryptoToNetworkSymbol(cryptoSymbol: CryptoSymbol): NetworkSymbol | undefined {
    const network = isCryptoSymbolToken(cryptoSymbol) ? cryptoSymbol.split('@')[1] : cryptoSymbol;

    return cryptoToNetworkSymbols[network as CryptoSymbol];
}

export function tokenToCryptoSymbol(
    tokenSymbol: string,
    networkSymbol: NetworkSymbol,
): CryptoSymbol | undefined {
    const networkCryptoSymbol = networkToCryptoSymbol(networkSymbol);

    return networkCryptoSymbol
        ? (`${tokenSymbol.toUpperCase()}@${networkCryptoSymbol}` as CryptoSymbol)
        : undefined;
}

export const getNetworkName = (networkSymbol: NetworkSymbol) => {
    return networks[networkSymbol].name;
};
