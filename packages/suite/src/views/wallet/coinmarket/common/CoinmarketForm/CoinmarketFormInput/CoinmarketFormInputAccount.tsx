import { useSelector } from 'src/hooks/suite';
import { useBitcoinAmountUnit } from 'src/hooks/wallet/useBitcoinAmountUnit';
import {
    cryptoToNetworkSymbol,
    isCryptoSymbolToken,
} from 'src/utils/wallet/coinmarket/cryptoSymbolUtils';
import { Controller } from 'react-hook-form';
import { Select, useElevation } from '@trezor/components';
import {
    CoinmarketCryptoListProps,
    CoinmarketOptionsGroupProps,
} from 'src/types/coinmarket/coinmarket';
import { Translation } from 'src/components/suite';
import styled from 'styled-components';
import { spacingsPx } from '@trezor/theme';
import { networks } from '@suite-common/wallet-config';
import { useMemo } from 'react';
import {
    coinmarketBuildCryptoOptions,
    coinmarketGetAccountLabel,
} from 'src/utils/wallet/coinmarket/coinmarketUtils';
import CryptoCategories from 'src/constants/wallet/coinmarket/cryptoCategories';
import CoinmarketCoinImage from 'src/views/wallet/coinmarket/common/CoinmarketCoinImage';
import {
    CoinmarketFormInput,
    CoinmarketFormOption,
    CoinmarketFormOptionLabel,
    CoinmarketFormOptionLabelLong,
    CoinmarketFormOptionNetwork,
} from 'src/views/wallet/coinmarket';
import CoinmarketFormInputLabel from 'src/views/wallet/coinmarket/common/CoinmarketForm/CoinmarketFormInput/CoinmarketFormInputLabel';
import {
    CoinmarketBuyFormProps,
    CoinmarketExchangeFormProps,
    CoinmarketFormInputAccountProps,
} from 'src/types/coinmarket/coinmarketForm';

const CoinmarketFormOptionTokenLogo = styled(CoinmarketCoinImage)`
    height: 18px;
`;

const CoinmarketFormOptionIcon = styled(CoinmarketFormOptionTokenLogo)`
    display: flex;
    align-items: center;
    margin-right: ${spacingsPx.xs};
`;

const CoinmarketFormInputAccount = <
    TFieldValues extends CoinmarketBuyFormProps | CoinmarketExchangeFormProps,
>({
    className,
    label,
    cryptoSelectName,
    supportedCryptoCurrencies,
    methods,
}: CoinmarketFormInputAccountProps<TFieldValues>) => {
    const { selectedAccount } = useSelector(state => state.wallet);
    const { shouldSendInSats } = useBitcoinAmountUnit(selectedAccount.account?.symbol);
    const { elevation } = useElevation();
    const { control } = methods;
    const { symbolsInfo } = useSelector(state => state.wallet.coinmarket.info);

    const options = useMemo(
        () =>
            coinmarketBuildCryptoOptions({
                symbolsInfo,
                cryptoCurrencies: supportedCryptoCurrencies ?? new Set(),
            }),
        [supportedCryptoCurrencies, symbolsInfo],
    );

    return (
        <CoinmarketFormInput className={className}>
            <CoinmarketFormInputLabel label={label} />
            <Controller
                name={cryptoSelectName}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        value={value}
                        options={options}
                        onChange={(selected: CoinmarketCryptoListProps) => {
                            onChange(selected);
                        }}
                        formatGroupLabel={group => {
                            const translationId =
                                CryptoCategories[(group as CoinmarketOptionsGroupProps).label]
                                    ?.translationId;

                            return translationId && <Translation id={translationId} />;
                        }}
                        formatOptionLabel={(option: CoinmarketCryptoListProps) => {
                            const networkSymbol = cryptoToNetworkSymbol(option.value);

                            return (
                                <CoinmarketFormOption>
                                    <CoinmarketFormOptionIcon symbol={option.label} />
                                    <CoinmarketFormOptionLabel>
                                        {coinmarketGetAccountLabel(option.label, shouldSendInSats)}
                                    </CoinmarketFormOptionLabel>
                                    <CoinmarketFormOptionLabelLong>
                                        {option.cryptoName}
                                    </CoinmarketFormOptionLabelLong>
                                    {option.value &&
                                        isCryptoSymbolToken(option.value) &&
                                        networkSymbol && (
                                            <CoinmarketFormOptionNetwork $elevation={elevation}>
                                                {networks[networkSymbol].name}
                                            </CoinmarketFormOptionNetwork>
                                        )}
                                </CoinmarketFormOption>
                            );
                        }}
                        data-test="@coinmarket/form/account-select"
                        isClearable={false}
                        isSearchable
                    />
                )}
            />
        </CoinmarketFormInput>
    );
};

export default CoinmarketFormInputAccount;
