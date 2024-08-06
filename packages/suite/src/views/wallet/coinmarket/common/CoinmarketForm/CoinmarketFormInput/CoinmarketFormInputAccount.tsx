import { Select, useElevation } from '@trezor/components';
import { spacingsPx } from '@trezor/theme';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { GroupBase } from 'react-select';
import { Translation } from 'src/components/suite';
import { useCoinmarketFormContext } from 'src/hooks/wallet/coinmarket/form/useCoinmarketCommonForm';
import {
    CoinmarketCryptoListProps,
    CoinmarketOptionsGroupProps,
    CoinmarketTradeBuyType
} from 'src/types/coinmarket/coinmarket';
import { CoinmarketFormInputProps } from 'src/types/coinmarket/coinmarketForm';
import { parseCryptoId } from 'src/utils/wallet/coinmarket/cryptoSymbolUtils';
import {
    CoinmarketFormInput,
    CoinmarketFormOption,
    CoinmarketFormOptionLabel,
    CoinmarketFormOptionLabelLong,
    CoinmarketFormOptionNetwork
} from 'src/views/wallet/coinmarket';
import CoinmarketFormInputLabel
    from 'src/views/wallet/coinmarket/common/CoinmarketForm/CoinmarketFormInput/CoinmarketFormInputLabel';
import styled from 'styled-components';
import { FORM_CRYPTO_CURRENCY_SELECT } from 'src/constants/wallet/coinmarket/form';
import { useCoinmarketCoins } from 'src/hooks/wallet/coinmarket/useCoinmarketCoins';
import { CoinmarketCoinLogo } from '../../CoinmarketCoinLogo';

const CoinmarketFormOptionIcon = styled(CoinmarketCoinLogo)`
    display: flex;
    align-items: center;
    margin-right: ${spacingsPx.xs};
`;

const CoinmarketFormInputAccount = ({ className, label }: CoinmarketFormInputProps) => {
    const { elevation } = useElevation();

    const { getNetworkName, buildCryptoOptions } = useCoinmarketCoins();
    const { control, buyInfo } = useCoinmarketFormContext<CoinmarketTradeBuyType>();

    const options = useMemo(
        () => buildCryptoOptions(buyInfo?.supportedCryptoCurrencies ?? new Set()),
        [buildCryptoOptions, buyInfo?.supportedCryptoCurrencies],
    );

    return (
        <CoinmarketFormInput className={className}>
            <CoinmarketFormInputLabel label={label} />
            <Controller
                name={FORM_CRYPTO_CURRENCY_SELECT}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        value={value}
                        options={options}
                        onChange={(selected: CoinmarketCryptoListProps) => {
                            onChange(selected);
                        }}
                        formatGroupLabel={(group: GroupBase<any>) => {
                            const { label, networkName } = group as CoinmarketOptionsGroupProps;

                            return <Translation id={label} values={{ networkName }} />;
                        }}
                        formatOptionLabel={(
                            option: CoinmarketOptionsGroupProps['options'][number],
                        ) => {
                            const { networkId, contractAddress } = parseCryptoId(option.value);

                            return (
                                <CoinmarketFormOption>
                                    <CoinmarketFormOptionIcon cryptoId={option.value} />
                                    <CoinmarketFormOptionLabel>
                                        {option.label}
                                    </CoinmarketFormOptionLabel>
                                    <CoinmarketFormOptionLabelLong>
                                        {option.cryptoName}
                                    </CoinmarketFormOptionLabelLong>
                                    {contractAddress && (
                                        <CoinmarketFormOptionNetwork $elevation={elevation}>
                                            {getNetworkName(networkId)}
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
