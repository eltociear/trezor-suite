import { spacingsPx } from '@trezor/theme';
import { CryptoId } from 'invity-api';
import { FormattedCryptoAmount } from 'src/components/suite';
import { useCoinmarketCoins } from 'src/hooks/wallet/coinmarket/useCoinmarketCoins';
import { CoinmarketAmountContainer, CoinmarketAmountWrapper } from 'src/views/wallet/coinmarket';
import styled from 'styled-components';
import { CoinmarketCoinLogo } from '../CoinmarketCoinLogo';

const StyledCoinmarketCoinLogo = styled(CoinmarketCoinLogo)`
    margin: 0 ${spacingsPx.md} 0 0;
`;

export interface CoinmarketCryptoAmountProps {
    amount: string | number;
    cryptoId: CryptoId;
}

const CoinmarketFormOfferCryptoAmount = ({ amount, cryptoId }: CoinmarketCryptoAmountProps) => {
    const { getNetworkSymbol } = useCoinmarketCoins();
    const networkSymbol = getNetworkSymbol(cryptoId);

    if (!networkSymbol) {
        return;
    }

    return (
        <CoinmarketAmountContainer>
            <CoinmarketAmountWrapper>
                <StyledCoinmarketCoinLogo cryptoId={cryptoId} quality="large"/>
                <FormattedCryptoAmount value={amount} symbol={networkSymbol} />
            </CoinmarketAmountWrapper>
        </CoinmarketAmountContainer>
    );
};

export default CoinmarketFormOfferCryptoAmount;
