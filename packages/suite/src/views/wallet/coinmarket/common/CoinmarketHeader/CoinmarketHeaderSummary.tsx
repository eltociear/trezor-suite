import { H2, Icon, variables } from '@trezor/components';
import { SCREEN_QUERY } from '@trezor/components/src/config/variables';
import { spacingsPx } from '@trezor/theme';
import { CryptoId } from 'invity-api';
import {
    isCoinmarketExchangeOffers,
    isCoinmarketSellOffers,
    useCoinmarketOffersContext
} from 'src/hooks/wallet/coinmarket/offers/useCoinmarketCommonOffers';
import { CoinmarketCryptoAmountProps } from 'src/types/coinmarket/coinmarketOffers';
import styled from 'styled-components';
import { CoinmarketCryptoAmount, CoinmarketFiatAmount } from '..';

const SummaryWrap = styled.div`
    ${SCREEN_QUERY.BELOW_TABLET} {
        padding-left: 0;
        margin-top: 0;
    }
`;

const SummaryRow = styled.div`
    display: flex;
    align-items: center;
`;

const StyledIcon = styled(Icon)`
    padding: 0 ${spacingsPx.sm};
    margin: 0 ${spacingsPx.lg};
`;

const TextWrap = styled(H2)`
    ${SCREEN_QUERY.BELOW_TABLET} {
        font-size: ${variables.FONT_SIZE.H2};
    }
`;

const CoinmarketHeaderSummary = ({
    className,
    sendAmount,
    sendCurrency,
    receiveCurrency,
    receiveAmount,
}: CoinmarketCryptoAmountProps) => {
    const context = useCoinmarketOffersContext();

    return (
        <SummaryWrap className={className}>
            <SummaryRow>
                {isCoinmarketSellOffers(context) && (
                    <>
                        {receiveCurrency && (
                            <TextWrap>
                                <CoinmarketCryptoAmount
                                    amount={receiveAmount}
                                    cryptoId={receiveCurrency}
                                    displayLogo
                                />
                            </TextWrap>
                        )}
                        <StyledIcon icon="ARROW_RIGHT_LONG" />
                        <TextWrap>
                            <CoinmarketFiatAmount currency={sendCurrency} />
                        </TextWrap>
                    </>
                )}

                {isCoinmarketExchangeOffers(context) && (
                    <>
                        {sendCurrency && (
                            <TextWrap>
                                <CoinmarketCryptoAmount
                                    amount={sendAmount}
                                    cryptoId={sendCurrency as CryptoId}
                                    displayLogo
                                />
                            </TextWrap>
                        )}
                        <StyledIcon icon="ARROW_RIGHT_LONG" />
                        {receiveCurrency && (
                            <TextWrap>
                                <CoinmarketCryptoAmount
                                    cryptoId={receiveCurrency}
                                    displayLogo
                                />
                            </TextWrap>
                        )}
                    </>
                )}
            </SummaryRow>
        </SummaryWrap>
    );
};

export default CoinmarketHeaderSummary;
