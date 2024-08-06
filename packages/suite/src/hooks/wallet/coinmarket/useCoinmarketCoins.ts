import { networks, NetworkSymbol } from '@suite-common/wallet-config';
import { CoinInfo, CryptoId } from 'invity-api';
import { useSelector } from 'src/hooks/suite/useSelector';
import {
    CoinmarketCoinsProps,
    CoinmarketCryptoListProps,
    CoinmarketOptionsGroupProps
} from 'src/types/coinmarket/coinmarket';
import { parseCryptoId } from 'src/utils/wallet/coinmarket/cryptoSymbolUtils';

function toCryptoOption(cryptoId: CryptoId, coinInfo: CoinInfo): CoinmarketCryptoListProps {
    return {
        value: cryptoId,
        label: coinInfo.symbol.toUpperCase(),
        cryptoName: coinInfo.name
    };
}

export const useCoinmarketCoins = (): CoinmarketCoinsProps => {
    const coins = useSelector(state => state.wallet.coinmarket.info.coins ?? {});

    const getNetworkName = (cryptoId: CryptoId): string | undefined => {
        return coins[cryptoId]?.name;
    }

    const getNetworkSymbol = (cryptoId: CryptoId): NetworkSymbol | undefined  => {
        return coins[cryptoId]?.symbol as NetworkSymbol;
    };

    const buildDefaultCryptoOption = (cryptoId: CryptoId): CoinmarketCryptoListProps => {
        const coinInfo = coins[cryptoId];
        if (coinInfo) {
            return toCryptoOption(cryptoId, coinInfo);
        }

        const { coingeckoId, name } = networks.btc;

        return {
            value: coingeckoId as CryptoId,
            label: 'BTC',
            cryptoName: name,
        }
    }

    const buildCryptoOptions = (cryptoIds: Set<CryptoId>): CoinmarketOptionsGroupProps[] => {
        const popularCurrencies: CoinmarketCryptoListProps[] = [];
        const otherCurrencies: CoinmarketCryptoListProps[] = [];
        const tokenGroups: CoinmarketOptionsGroupProps[] = [];

        cryptoIds.forEach(cryptoId => {
            const coinInfo = coins[cryptoId];
            if (!coinInfo) {
                return;
            }

            const { networkId, contractAddress } = parseCryptoId(cryptoId);
            const option = toCryptoOption(cryptoId, coinInfo);

            if (networks[coinInfo.symbol as NetworkSymbol]) {
                popularCurrencies.push(option);
            } else if (!contractAddress) {
                otherCurrencies.push(option);
            } else {
                // TODO: Base network might not be available, BE fix needed.
                const networkName = getNetworkName(networkId) || networkId;
                let tokenGroup = tokenGroups.find(g => g.networkName === networkName);
                if (!tokenGroup) {
                    tokenGroup = { label: 'TR_COINMARKET_NETWORK_TOKENS', networkName, options: [] };
                    tokenGroups.push(tokenGroup);
                }
                tokenGroup.options.push(option);
            }
        });

        return [
            { label: 'TR_COINMARKET_POPULAR_CURRENCIES', options: popularCurrencies },
            { label: 'TR_COINMARKET_OTHER_CURRENCIES', options: otherCurrencies },
            ...tokenGroups,
        ];
    }

    return {
        getNetworkName,
        getNetworkSymbol,
        buildCryptoOptions,
        buildDefaultCryptoOption,
    }
}
