import { DefinitionType, TokenDefinitions } from '@suite-common/token-definitions';
import { Account } from '@suite-common/wallet-types';

export const accountBtc = {
    index: 1,
    accountType: 'segwit',
    networkType: 'bitcoin',
    symbol: 'btc',
    addresses: {
        unused: [
            {
                address: '177BUDVZqTTzK1Fogqcrfbb5ketHEUDGSJ',
                transfers: 0,
                path: "m/44'/0'/3'/0/0",
            },
        ],
    },
};

export const accountEth = {
    index: 1,
    accountType: 'normal',
    networkType: 'ethereum',
    symbol: 'eth',
    descriptor: '0x2e0DC981d301cdd443C3987cf19Eb9671CB99ddC',
    path: "m/44'/60'/0'/0/1",
    tokens: [
        {
            type: 'ERC20',
            contract: '0x1234123412341234123412341234123412341234',
            symbol: 'usdt',
            decimals: 18,
        },
        {
            type: 'ERC20',
            contract: '0x1234123412341234123412341234123412341235',
            symbol: 'usdc',
            decimals: 18,
        },
        {
            type: 'ERC20',
            contract: '0x1234123412341234123412341234123412341236',
            symbol: 'other',
            decimals: 18,
        },
    ],
};

export const coinDefinitions: TokenDefinitions[DefinitionType.COIN] = {
    error: false,
    data: [
        '0x1234123412341234123412341234123412341236',
        '0x1234123412341234123412341234123412341235',
    ],
    isLoading: false,
    hide: [],
    show: [],
};

export const FIXTURE_ACCOUNTS: Partial<Account>[] = [
    {
        deviceState: 'deviceState',
        formattedBalance: '0',
        tokens: [],
        descriptor: 'descriptor1',
        symbol: 'btc',
    },
    {
        deviceState: 'deviceState',
        formattedBalance: '0.101213',
        tokens: [],
        descriptor: 'descriptor2',
        symbol: 'ltc',
    },
    {
        deviceState: 'deviceState',
        formattedBalance: '0',
        descriptor: 'descriptor3',
        symbol: 'eth',
        tokens: [
            {
                balance: '2.76149',
                contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimals: 6,
                name: 'Tether USD',
                symbol: 'usdt',
                type: 'ERC20',
            },
        ],
    },
    {
        deviceState: 'no-deviceState',
        formattedBalance: '0.101213',
        tokens: [],
        descriptor: 'descriptor4',
        symbol: 'btc',
    },
    {
        deviceState: 'no-deviceState',
        formattedBalance: '0.101213',
        symbol: 'matic',
        tokens: [
            {
                balance: '2.76149',
                contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimals: 6,
                name: 'Tether USD',
                symbol: 'usdt',
                type: 'ERC20',
            },
        ],
        descriptor: 'descriptor5',
    },
];
