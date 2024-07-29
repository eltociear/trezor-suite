import styled from 'styled-components';
import { spacingsPx } from '@trezor/theme';
import CoinmarketFormInputPaymentMethod from '../CoinmarketForm/CoinmarketFormInput/CoinmarketFormInputPaymentMethod';
import CoinmarketFormInputCountry from 'src/views/wallet/coinmarket/common/CoinmarketForm/CoinmarketFormInput/CoinmarketFormInputCountry';
import CoinmarketFormInputFiatCrypto from 'src/views/wallet/coinmarket/common/CoinmarketForm/CoinmarketFormInput/CoinmarketFormInputFiatCrypto/CoinmarketFormInputFiatCrypto';
import { CoinmarketTradeBuySellType } from 'src/types/coinmarket/coinmarket';
import {
    isCoinmarketBuyOffers,
    useCoinmarketOffersContext,
} from 'src/hooks/wallet/coinmarket/offers/useCoinmarketCommonOffers';
import {
    CoinmarketBuyFormProps,
    CoinmarketSellFormProps,
} from 'src/types/coinmarket/coinmarketForm';
import { FORM_CRYPTO_INPUT, FORM_FIAT_INPUT } from 'src/constants/wallet/coinmarket/form';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SelectWrapper = `
    width: 254px;
    max-width: 100%;
    padding: ${spacingsPx.xxs} ${spacingsPx.md} ${spacingsPx.xxs} 0;
`;

const CoinmarketFormInputPaymentMethodWrapper = styled(CoinmarketFormInputPaymentMethod)`
    ${SelectWrapper}
`;

const CoinmarketFormInputCountryWrapper = styled(CoinmarketFormInputCountry)`
    ${SelectWrapper}
`;

const CoinmarketHeaderFilter = () => {
    const context = useCoinmarketOffersContext<CoinmarketTradeBuySellType>();

    return (
        <Wrapper data-test="@coinmarket/filter">
            {isCoinmarketBuyOffers(context) ? (
                <CoinmarketFormInputFiatCrypto<CoinmarketBuyFormProps>
                    showLabel={false}
                    cryptoInputName={FORM_CRYPTO_INPUT}
                    fiatInputName={FORM_FIAT_INPUT}
                    methods={{ ...context }}
                />
            ) : (
                <CoinmarketFormInputFiatCrypto<CoinmarketSellFormProps>
                    showLabel={false}
                    cryptoInputName={FORM_CRYPTO_INPUT}
                    fiatInputName={FORM_FIAT_INPUT}
                    methods={{ ...context }}
                />
            )}
            <CoinmarketFormInputPaymentMethodWrapper />
            <CoinmarketFormInputCountryWrapper />
        </Wrapper>
    );
};

export default CoinmarketHeaderFilter;
