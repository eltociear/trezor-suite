import { getCoingeckoId } from '@suite-common/wallet-config';
import { CryptoId, FiatCurrencyCode } from 'invity-api';
import { useMemo } from 'react';
import { BuyInfo } from 'src/actions/wallet/coinmarketBuyActions';
import { formDefaultCurrency } from 'src/constants/wallet/coinmarket/formDefaults';
import { CoinmarketPaymentMethodListProps } from 'src/types/coinmarket/coinmarket';
import { CoinmarketBuyFormDefaultValuesProps } from 'src/types/coinmarket/coinmarketForm';
import { Account } from 'src/types/wallet';
import { buildFiatOption, getDefaultCountry } from 'src/utils/wallet/coinmarket/coinmarketUtils';
import { useCoinmarketCoins } from '../useCoinmarketCoins';

export const useCoinmarketBuyFormDefaultValues = (
    accountSymbol: Account['symbol'],
    buyInfo: BuyInfo | undefined,
    paymentMethods: CoinmarketPaymentMethodListProps[],
): CoinmarketBuyFormDefaultValuesProps => {
    const { buildDefaultCryptoOption } = useCoinmarketCoins();
    const cryptoId = getCoingeckoId(accountSymbol) as CryptoId;

    const country = buyInfo?.buyInfo?.country;
    const defaultCountry = useMemo(() => getDefaultCountry(country), [country]);
    const defaultCrypto = useMemo(
        () => buildDefaultCryptoOption(cryptoId),
        [buildDefaultCryptoOption, cryptoId],
    );
    const defaultPaymentMethod: CoinmarketPaymentMethodListProps = useMemo(
        () =>
            paymentMethods.find(paymentMethod => paymentMethod.value === 'creditCard') ?? {
                value: '',
                label: '',
            },
        [paymentMethods],
    );
    const suggestedFiatCurrency = (buyInfo?.buyInfo?.suggestedFiatCurrency?.toLowerCase() ??
        formDefaultCurrency) as FiatCurrencyCode;
    const defaultCurrency = useMemo(
        () => buildFiatOption(suggestedFiatCurrency),
        [suggestedFiatCurrency],
    );
    const defaultValues = useMemo(
        () => ({
            fiatInput: buyInfo?.buyInfo.defaultAmountsOfFiatCurrencies.get(suggestedFiatCurrency),
            cryptoInput: undefined,
            currencySelect: defaultCurrency,
            cryptoSelect: defaultCrypto,
            countrySelect: defaultCountry,
            paymentMethod: defaultPaymentMethod,
            amountInCrypto: false,
        }),
        [
            buyInfo?.buyInfo.defaultAmountsOfFiatCurrencies,
            defaultCountry,
            defaultCrypto,
            defaultCurrency,
            defaultPaymentMethod,
            suggestedFiatCurrency,
        ],
    );

    return {
        defaultValues,
        defaultCountry,
        defaultCurrency,
        defaultPaymentMethod,
        suggestedFiatCurrency,
    };
};
