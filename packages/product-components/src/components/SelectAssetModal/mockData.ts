import type { SelectAssetOptionProps, SelectAssetNetworkProps } from '../../index';

export const selectAssetModalOptions: SelectAssetOptionProps[] = [
    {
        type: 'group',
        label: 'TR_COINMARKET_POPULAR_CURRENCIES',
    },
    {
        type: 'currency',
        value: 'bitcoin',
        label: 'BTC',
        cryptoName: 'Bitcoin',
        coingeckoId: 'bitcoin',
    },
    {
        type: 'currency',
        value: 'ethereum',
        label: 'ETH',
        cryptoName: 'Ethereum',
        coingeckoId: 'ethereum',
    },
    {
        type: 'currency',
        value: 'litecoin',
        label: 'LTC',
        cryptoName: 'Litecoin',
        coingeckoId: 'litecoin',
    },
    {
        type: 'currency',
        value: 'solana',
        label: 'SOL',
        cryptoName: 'Solana',
        coingeckoId: 'solana',
    },
    {
        type: 'currency',
        value: 'cardano',
        label: 'ADA',
        cryptoName: 'Cardano',
        coingeckoId: 'cardano',
    },
    {
        type: 'currency',
        value: 'bitcoin-cash',
        label: 'BCH',
        cryptoName: 'Bitcoin Cash',
        coingeckoId: 'bitcoin-cash',
    },
    {
        type: 'currency',
        value: 'binancecoin',
        label: 'BNB',
        cryptoName: 'BNB',
        coingeckoId: 'binancecoin',
    },
    {
        type: 'currency',
        value: 'dogecoin',
        label: 'DOGE',
        cryptoName: 'Dogecoin',
        coingeckoId: 'dogecoin',
    },
    {
        type: 'currency',
        value: 'ripple',
        label: 'XRP',
        cryptoName: 'XRP',
        coingeckoId: 'ripple',
    },
    {
        type: 'currency',
        value: 'digibyte',
        label: 'DGB',
        cryptoName: 'DigiByte',
        coingeckoId: 'digibyte',
    },
    {
        type: 'currency',
        value: 'matic-network',
        label: 'MATIC',
        cryptoName: 'Polygon',
        coingeckoId: 'matic-network',
    },
    {
        type: 'currency',
        value: 'ethereum-classic',
        label: 'ETC',
        cryptoName: 'Ethereum Classic',
        coingeckoId: 'ethereum-classic',
    },
    {
        type: 'currency',
        value: 'bitcoin-gold',
        label: 'BTG',
        cryptoName: 'Bitcoin Gold',
        coingeckoId: 'bitcoin-gold',
    },
    {
        type: 'currency',
        value: 'dash',
        label: 'DASH',
        cryptoName: 'Dash',
        coingeckoId: 'dash',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_OTHER_CURRENCIES',
    },
    {
        type: 'currency',
        value: 'bitcoin-cash-sv',
        label: 'BSV',
        cryptoName: 'Bitcoin SV',
        coingeckoId: 'bitcoin-cash-sv',
    },
    {
        type: 'currency',
        value: 'eos',
        label: 'EOS',
        cryptoName: 'EOS',
        coingeckoId: 'eos',
    },
    {
        type: 'currency',
        value: 'neo',
        label: 'NEO',
        cryptoName: 'NEO',
        coingeckoId: 'neo',
    },
    {
        type: 'currency',
        value: 'tron',
        label: 'TRX',
        cryptoName: 'TRON',
        coingeckoId: 'tron',
    },
    {
        type: 'currency',
        value: 'stellar',
        label: 'XLM',
        cryptoName: 'Stellar',
        coingeckoId: 'stellar',
    },
    {
        type: 'currency',
        value: 'tezos',
        label: 'XTZ',
        cryptoName: 'Tezos',
        coingeckoId: 'tezos',
    },
    {
        type: 'currency',
        value: 'vechain',
        label: 'VET',
        cryptoName: 'VeChain',
        coingeckoId: 'vechain',
    },
    {
        type: 'currency',
        value: 'ravencoin',
        label: 'RVN',
        cryptoName: 'Ravencoin',
        coingeckoId: 'ravencoin',
    },
    {
        type: 'currency',
        value: 'zilliqa',
        label: 'ZIL',
        cryptoName: 'Zilliqa',
        coingeckoId: 'zilliqa',
    },
    {
        type: 'currency',
        value: 'cosmos',
        label: 'ATOM',
        cryptoName: 'Cosmos Hub',
        coingeckoId: 'cosmos',
    },
    {
        type: 'currency',
        value: 'harmony',
        label: 'ONE',
        cryptoName: 'Harmony',
        coingeckoId: 'harmony',
    },
    {
        type: 'currency',
        value: 'nanomatic',
        label: 'NANO',
        cryptoName: 'Nanomatic',
        coingeckoId: 'nanomatic',
    },
    {
        type: 'currency',
        value: 'qtum',
        label: 'QTUM',
        cryptoName: 'Qtum',
        coingeckoId: 'qtum',
    },
    {
        type: 'currency',
        value: 'syscoin',
        label: 'SYS',
        cryptoName: 'Syscoin',
        coingeckoId: 'syscoin',
    },
    {
        type: 'currency',
        value: 'fantom',
        label: 'FTM',
        cryptoName: 'Fantom',
        coingeckoId: 'fantom',
    },
    {
        type: 'currency',
        value: 'icon',
        label: 'ICX',
        cryptoName: 'ICON',
        coingeckoId: 'icon',
    },
    {
        type: 'currency',
        value: 'siacoin',
        label: 'SC',
        cryptoName: 'Siacoin',
        coingeckoId: 'siacoin',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x111111111117dc0aa78b770fa6a738034120c302',
        label: '1INCH',
        cryptoName: '1inch',
        coingeckoId: 'ethereum',
        contractAddress: '0x111111111117dc0aa78b770fa6a738034120c302',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
        label: 'AAVE',
        cryptoName: 'Aave',
        coingeckoId: 'ethereum',
        contractAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
        label: 'CRO',
        cryptoName: 'Cronos',
        coingeckoId: 'ethereum',
        contractAddress: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3',
        label: 'ELON',
        cryptoName: 'Dogelon Mars',
        coingeckoId: 'ethereum',
        contractAddress: '0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x728f30fa2f100742c7949d1961804fa8e0b1387d',
        label: 'GHX',
        cryptoName: 'GamerCoin',
        coingeckoId: 'ethereum',
        contractAddress: '0x728f30fa2f100742c7949d1961804fa8e0b1387d',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
        label: 'MANA',
        cryptoName: 'Decentraland',
        coingeckoId: 'ethereum',
        contractAddress: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x4a220e6096b25eadb88358cb44068a3248254675',
        label: 'QNT',
        cryptoName: 'Quant',
        coingeckoId: 'ethereum',
        contractAddress: '0x4a220e6096b25eadb88358cb44068a3248254675',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x3845badade8e6dff049820680d1f14bd3903a5d0',
        label: 'SAND',
        cryptoName: 'The Sandbox',
        coingeckoId: 'ethereum',
        contractAddress: '0x3845badade8e6dff049820680d1f14bd3903a5d0',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        label: 'SHIB',
        cryptoName: 'Shiba Inu',
        coingeckoId: 'ethereum',
        contractAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x7825e833d495f3d1c28872415a4aee339d26ac88',
        label: 'WTLOS',
        cryptoName: 'Wrapped Telos',
        coingeckoId: 'ethereum',
        contractAddress: '0x7825e833d495f3d1c28872415a4aee339d26ac88',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x0000000000085d4780b73119b644ae5ecd22b376',
        label: 'TUSD',
        cryptoName: 'TrueUSD',
        coingeckoId: 'ethereum',
        contractAddress: '0x0000000000085d4780b73119b644ae5ecd22b376',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        label: 'UNI',
        cryptoName: 'Uniswap',
        coingeckoId: 'ethereum',
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x55296f69f40ea6d20e478533c15a6b08b654e758',
        label: 'XYO',
        cryptoName: 'XYO Network',
        coingeckoId: 'ethereum',
        contractAddress: '0x55296f69f40ea6d20e478533c15a6b08b654e758',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xdac17f958d2ee523a2206206994597c13d831ec7',
        label: 'USDT',
        cryptoName: 'Tether',
        coingeckoId: 'ethereum',
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xbd3de9a069648c84d27d74d701c9fa3253098b15',
        label: 'EQX',
        cryptoName: 'EQIFi',
        coingeckoId: 'ethereum',
        contractAddress: '0xbd3de9a069648c84d27d74d701c9fa3253098b15',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xc944e90c64b2c07662a292be6244bdf05cda44a7',
        label: 'GRT',
        cryptoName: 'The Graph',
        coingeckoId: 'ethereum',
        contractAddress: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x4d224452801aced8b2f0aebe155379bb5d594381',
        label: 'APE',
        cryptoName: 'ApeCoin',
        coingeckoId: 'ethereum',
        contractAddress: '0x4d224452801aced8b2f0aebe155379bb5d594381',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xc00e94cb662c3520282e6f5717214004a7f26888',
        label: 'COMP',
        cryptoName: 'Compound',
        coingeckoId: 'ethereum',
        contractAddress: '0xc00e94cb662c3520282e6f5717214004a7f26888',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xddb3422497e61e13543bea06989c0789117555c5',
        label: 'COTI',
        cryptoName: 'COTI',
        coingeckoId: 'ethereum',
        contractAddress: '0xddb3422497e61e13543bea06989c0789117555c5',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x6b175474e89094c44da98b954eedeac495271d0f',
        label: 'DAI',
        cryptoName: 'Dai',
        coingeckoId: 'ethereum',
        contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x4c19596f5aaff459fa38b0f7ed92f11ae6543784',
        label: 'TRU',
        cryptoName: 'TrueFi',
        coingeckoId: 'ethereum',
        contractAddress: '0x4c19596f5aaff459fa38b0f7ed92f11ae6543784',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
        label: 'UOS',
        cryptoName: 'Ultra',
        coingeckoId: 'ethereum',
        contractAddress: '0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x6982508145454ce325ddbe47a25d4ec3d2311933',
        label: 'PEPE',
        cryptoName: 'Pepe',
        coingeckoId: 'ethereum',
        contractAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
        label: 'AXS',
        cryptoName: 'Axie Infinity',
        coingeckoId: 'ethereum',
        contractAddress: '0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x514910771af9ca656af840dff83e8264ecf986ca',
        label: 'LINK',
        cryptoName: 'Chainlink',
        coingeckoId: 'ethereum',
        contractAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x0d8775f648430679a709e98d2b0cb6250d2887ef',
        label: 'BAT',
        cryptoName: 'Basic Attention',
        coingeckoId: 'ethereum',
        contractAddress: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x3506424f91fd33084466f402d5d97f05f8e3b4af',
        label: 'CHZ',
        cryptoName: 'Chiliz',
        coingeckoId: 'ethereum',
        contractAddress: '0x3506424f91fd33084466f402d5d97f05f8e3b4af',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        label: 'MKR',
        cryptoName: 'Maker',
        coingeckoId: 'ethereum',
        contractAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        label: 'SUSHI',
        cryptoName: 'Sushi',
        coingeckoId: 'ethereum',
        contractAddress: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        label: 'USDC',
        cryptoName: 'USDC',
        coingeckoId: 'ethereum',
        contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        label: 'WBTC',
        cryptoName: 'Wrapped Bitcoin',
        coingeckoId: 'ethereum',
        contractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x41e5560054824ea6b0732e656e3ad64e20e94e45',
        label: 'CVC',
        cryptoName: 'Civic',
        coingeckoId: 'ethereum',
        contractAddress: '0x41e5560054824ea6b0732e656e3ad64e20e94e45',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
        label: 'OMG',
        cryptoName: 'OMG Network',
        coingeckoId: 'ethereum',
        contractAddress: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
        label: 'SNX',
        cryptoName: 'Synthetix Network',
        coingeckoId: 'ethereum',
        contractAddress: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
        label: 'YFI',
        cryptoName: 'yearn.finance',
        coingeckoId: 'ethereum',
        contractAddress: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xf57e7e7c23978c3caec3c3548e3d615c346e79ff',
        label: 'IMX',
        cryptoName: 'Immutable',
        coingeckoId: 'ethereum',
        contractAddress: '0xf57e7e7c23978c3caec3c3548e3d615c346e79ff',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x8e870d67f660d95d5be530380d0ec0bd388289e1',
        label: 'USDP',
        cryptoName: 'Pax Dollar',
        coingeckoId: 'ethereum',
        contractAddress: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x455e53cbb86018ac2b8092fdcd39d8444affc3f6',
        label: 'POL',
        cryptoName: 'POL (ex-MATIC)',
        coingeckoId: 'ethereum',
        contractAddress: '0x455e53cbb86018ac2b8092fdcd39d8444affc3f6',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
        label: 'ANKR',
        cryptoName: 'Ankr Network',
        coingeckoId: 'ethereum',
        contractAddress: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xd533a949740bb3306d119cc777fa900ba034cd52',
        label: 'CRV',
        cryptoName: 'Curve DAO',
        coingeckoId: 'ethereum',
        contractAddress: '0xd533a949740bb3306d119cc777fa900ba034cd52',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x92d6c1e31e14520e676a687f0a93788b716beff5',
        label: 'ETHDYDX',
        cryptoName: 'dYdX',
        coingeckoId: 'ethereum',
        contractAddress: '0x92d6c1e31e14520e676a687f0a93788b716beff5',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x75231f58b43240c9718dd58b4967c5114342a86c',
        label: 'OKB',
        cryptoName: 'OKB',
        coingeckoId: 'ethereum',
        contractAddress: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x4cc19356f2d37338b9802aa8e8fc58b0373296e7',
        label: 'KEY',
        cryptoName: 'SelfKey',
        coingeckoId: 'ethereum',
        contractAddress: '0x4cc19356f2d37338b9802aa8e8fc58b0373296e7',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x3593d125a4f7849a1b059e64f4517a86dd60c95d',
        label: 'OM',
        cryptoName: 'MANTRA',
        coingeckoId: 'ethereum',
        contractAddress: '0x3593d125a4f7849a1b059e64f4517a86dd60c95d',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xa62cc35625b0c8dc1faea39d33625bb4c15bd71c',
        label: 'STMX',
        cryptoName: 'StormX',
        coingeckoId: 'ethereum',
        contractAddress: '0xa62cc35625b0c8dc1faea39d33625bb4c15bd71c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xdc9ac3c20d1ed0b540df9b1fedc10039df13f99c',
        label: 'UTK',
        cryptoName: 'xMoney',
        coingeckoId: 'ethereum',
        contractAddress: '0xdc9ac3c20d1ed0b540df9b1fedc10039df13f99c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        label: 'WETH',
        cryptoName: 'WETH',
        coingeckoId: 'ethereum',
        contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xe41d2489571d322189246dafa5ebde1f4699f498',
        label: 'ZRX',
        cryptoName: '0x Protocol',
        coingeckoId: 'ethereum',
        contractAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
        label: 'BAND',
        cryptoName: 'Band Protocol',
        coingeckoId: 'ethereum',
        contractAddress: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
        label: 'BNT',
        cryptoName: 'Bancor Network',
        coingeckoId: 'ethereum',
        contractAddress: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
        label: 'LRC',
        cryptoName: 'Loopring',
        coingeckoId: 'ethereum',
        contractAddress: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
        label: 'ENJ',
        cryptoName: 'Enjin Coin',
        coingeckoId: 'ethereum',
        contractAddress: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x6810e776880c02933d47db1b9fc05908e5386b96',
        label: 'GNO',
        cryptoName: 'Gnosis',
        coingeckoId: 'ethereum',
        contractAddress: '0x6810e776880c02933d47db1b9fc05908e5386b96',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202',
        label: 'KNC',
        cryptoName: 'Kyber Network Crystal',
        coingeckoId: 'ethereum',
        contractAddress: '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        label: 'MATIC',
        cryptoName: 'Polygon',
        coingeckoId: 'ethereum',
        contractAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xec67005c4e498ec7f55e092bd1d35cbc47c91892',
        label: 'MLN',
        cryptoName: 'Enzyme',
        coingeckoId: 'ethereum',
        contractAddress: '0xec67005c4e498ec7f55e092bd1d35cbc47c91892',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x408e41876cccdc0f92210600ef50372656052a38',
        label: 'REN',
        cryptoName: 'Ren',
        coingeckoId: 'ethereum',
        contractAddress: '0x408e41876cccdc0f92210600ef50372656052a38',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x221657776846890989a759ba2973e427dff5c9bb',
        label: 'REP',
        cryptoName: 'Augur',
        coingeckoId: 'ethereum',
        contractAddress: '0x221657776846890989a759ba2973e427dff5c9bb',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
        label: 'STORJ',
        cryptoName: 'Storj',
        coingeckoId: 'ethereum',
        contractAddress: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x595832f8fc6bf59c85c527fec3740a1b7a361269',
        label: 'POWR',
        cryptoName: 'Powerledger',
        coingeckoId: 'ethereum',
        contractAddress: '0x595832f8fc6bf59c85c527fec3740a1b7a361269',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xade00c28244d5ce17d72e40330b1c318cd12b7c3',
        label: 'ADX',
        cryptoName: 'AdEx',
        coingeckoId: 'ethereum',
        contractAddress: '0xade00c28244d5ce17d72e40330b1c318cd12b7c3',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x5732046a883704404f284ce41ffadd5b007fd668',
        label: 'BLZ',
        cryptoName: 'Bluzelle',
        coingeckoId: 'ethereum',
        contractAddress: '0x5732046a883704404f284ce41ffadd5b007fd668',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x4f9254c83eb525f9fcf346490bbb3ed28a81c667',
        label: 'CELR',
        cryptoName: 'Celer Network',
        coingeckoId: 'ethereum',
        contractAddress: '0x4f9254c83eb525f9fcf346490bbb3ed28a81c667',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x3597bfd533a99c9aa083587b074434e61eb0a258',
        label: 'DENT',
        cryptoName: 'Dent',
        coingeckoId: 'ethereum',
        contractAddress: '0x3597bfd533a99c9aa083587b074434e61eb0a258',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
        label: 'NMR',
        cryptoName: 'Numeraire',
        coingeckoId: 'ethereum',
        contractAddress: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x8f8221afbb33998d8584a2b05749ba73c37a938a',
        label: 'REQ',
        cryptoName: 'Request',
        coingeckoId: 'ethereum',
        contractAddress: '0x8f8221afbb33998d8584a2b05749ba73c37a938a',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x607f4c5bb672230e8672085532f7e901544a7375',
        label: 'RLC',
        cryptoName: 'iExec RLC',
        coingeckoId: 'ethereum',
        contractAddress: '0x607f4c5bb672230e8672085532f7e901544a7375',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x6c6ee5e31d828de241282b9606c8e98ea48526e2',
        label: 'HOT',
        cryptoName: 'Holo',
        coingeckoId: 'ethereum',
        contractAddress: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
        label: 'SXP',
        cryptoName: 'Solar',
        coingeckoId: 'ethereum',
        contractAddress: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xbc396689893d065f41bc2c6ecbee5e0085233447',
        label: 'PERP',
        cryptoName: 'Perpetual Protocol',
        coingeckoId: 'ethereum',
        contractAddress: '0xbc396689893d065f41bc2c6ecbee5e0085233447',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0xbf2179859fc6d5bee9bf9158632dc51678a4100e',
        label: 'ELF',
        cryptoName: 'aelf',
        coingeckoId: 'ethereum',
        contractAddress: '0xbf2179859fc6d5bee9bf9158632dc51678a4100e',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
        label: 'GUSD',
        cryptoName: 'Gemini Dollar',
        coingeckoId: 'ethereum',
        contractAddress: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x42476f744292107e34519f9c357927074ea3f75d',
        label: 'LOOM',
        cryptoName: 'Loom Network (NEW)',
        coingeckoId: 'ethereum',
        contractAddress: '0x42476f744292107e34519f9c357927074ea3f75d',
        networkName: 'Ethereum',
    },
    {
        type: 'currency',
        value: 'ethereum--0x814e0908b12a99fecf5bc101bb5d0b8b5cdf7d26',
        label: 'MDT',
        cryptoName: 'Measurable Data',
        coingeckoId: 'ethereum',
        contractAddress: '0x814e0908b12a99fecf5bc101bb5d0b8b5cdf7d26',
        networkName: 'Ethereum',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Solana',
    },
    {
        type: 'currency',
        value: 'solana--kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        label: 'KIN',
        cryptoName: 'Kin',
        coingeckoId: 'solana',
        contractAddress: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        networkName: 'Solana',
    },
    {
        type: 'currency',
        value: 'solana--EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        label: 'USDC',
        cryptoName: 'USDC',
        coingeckoId: 'solana',
        contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        networkName: 'Solana',
    },
    {
        type: 'currency',
        value: 'solana--Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        label: 'USDT',
        cryptoName: 'Tether',
        coingeckoId: 'solana',
        contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        networkName: 'Solana',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'BNB Smart Chain',
    },
    {
        type: 'currency',
        value: 'binance-smart-chain--0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        label: 'CAKE',
        cryptoName: 'PancakeSwap',
        coingeckoId: 'binance-smart-chain',
        contractAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        networkName: 'BNB Smart Chain',
    },
    {
        type: 'currency',
        value: 'binance-smart-chain--0x55d398326f99059ff775485246999027b3197955',
        label: 'BSC-USD',
        cryptoName: 'Binance Bridged USDT (BNB Smart Chain)',
        coingeckoId: 'binance-smart-chain',
        contractAddress: '0x55d398326f99059ff775485246999027b3197955',
        networkName: 'BNB Smart Chain',
    },
    {
        type: 'currency',
        value: 'binance-smart-chain--0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        label: 'USDC',
        cryptoName: 'Binance Bridged USDC (BNB Smart Chain)',
        coingeckoId: 'binance-smart-chain',
        contractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        networkName: 'BNB Smart Chain',
    },
    {
        type: 'currency',
        value: 'binance-smart-chain--0x111111111117dc0aa78b770fa6a738034120c302',
        label: '1INCH',
        cryptoName: '1inch',
        coingeckoId: 'binance-smart-chain',
        contractAddress: '0x111111111117dc0aa78b770fa6a738034120c302',
        networkName: 'BNB Smart Chain',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Fantom',
    },
    {
        type: 'currency',
        value: 'fantom--0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        label: 'WFTM',
        cryptoName: 'Wrapped Fantom',
        coingeckoId: 'fantom',
        contractAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        networkName: 'Fantom',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'TRON',
    },
    {
        type: 'currency',
        value: 'tron--TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        label: 'USDT',
        cryptoName: 'Tether',
        coingeckoId: 'tron',
        contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        networkName: 'TRON',
    },
    {
        type: 'currency',
        value: 'tron--TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4',
        label: 'BTT',
        cryptoName: 'BitTorrent',
        coingeckoId: 'tron',
        contractAddress: 'TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4',
        networkName: 'TRON',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Polygon POS',
    },
    {
        type: 'currency',
        value: 'polygon-pos--0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        label: 'USDT',
        cryptoName: 'Polygon Bridged USDT (Polygon)',
        coingeckoId: 'polygon-pos',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        networkName: 'Polygon POS',
    },
    {
        type: 'currency',
        value: 'polygon-pos--0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        label: 'USDC',
        cryptoName: 'USDC',
        coingeckoId: 'polygon-pos',
        contractAddress: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        networkName: 'Polygon POS',
    },
    {
        type: 'currency',
        value: 'polygon-pos--0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        label: 'WETH',
        cryptoName: 'Polygon PoS Bridged WETH (Polygon POS)',
        coingeckoId: 'polygon-pos',
        contractAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        networkName: 'Polygon POS',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Arbitrum One',
    },
    {
        type: 'currency',
        value: 'arbitrum-one--0xaf88d065e77c8cc2239327c5edb3a432268e5831',
        label: 'USDC',
        cryptoName: 'USDC',
        coingeckoId: 'arbitrum-one',
        contractAddress: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
        networkName: 'Arbitrum One',
    },
    {
        type: 'currency',
        value: 'arbitrum-one--0x912ce59144191c1204e64559fe8253a0e49e6548',
        label: 'ARB',
        cryptoName: 'Arbitrum',
        coingeckoId: 'arbitrum-one',
        contractAddress: '0x912ce59144191c1204e64559fe8253a0e49e6548',
        networkName: 'Arbitrum One',
    },
    {
        type: 'group',
        label: 'TR_COINMARKET_NETWORK_TOKENS',
        networkName: 'Base',
    },
    {
        type: 'currency',
        value: 'base--0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        label: 'USDC',
        cryptoName: 'USDC',
        coingeckoId: 'base',
        contractAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        networkName: 'Base',
    },
];

export const selectAssetModalNetworks: SelectAssetNetworkProps[] = [
    {
        name: 'Ethereum',
        symbol: 'eth',
        coingeckoId: 'ethereum',
        coingeckoNativeId: 'ethereum',
    },
    {
        name: 'Polygon PoS',
        symbol: 'matic',
        coingeckoId: 'polygon-pos',
        coingeckoNativeId: 'matic-network',
    },
    {
        name: 'Solana',
        symbol: 'sol',
        coingeckoId: 'solana',
        coingeckoNativeId: 'solana',
    },
    {
        name: 'BNB Smart Chain',
        symbol: 'bnb',
        coingeckoId: 'binance-smart-chain',
        coingeckoNativeId: 'binancecoin',
    },
];
