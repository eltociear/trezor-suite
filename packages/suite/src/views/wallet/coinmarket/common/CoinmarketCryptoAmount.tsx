import { spacingsPx } from '@trezor/theme';
import { CryptoId } from 'invity-api';
import { FormattedCryptoAmount } from 'src/components/suite';
import styled from 'styled-components';
import { useCoinmarketCoins } from '../../../../hooks/wallet/coinmarket/useCoinmarketCoins';
import { CoinmarketCoinLogo } from './CoinmarketCoinLogo';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledCoinmarketCoinLogo = styled(CoinmarketCoinLogo)`
    margin-right: ${spacingsPx.sm};
`;

export interface CoinmarketCryptoAmountProps {
    amount?: string | number;
    cryptoId: CryptoId;
    displayLogo?: boolean;
}

export const CoinmarketCryptoAmount = ({
    amount,
    cryptoId,
    displayLogo,
}: CoinmarketCryptoAmountProps) => {
    const { getNetworkSymbol } = useCoinmarketCoins();
    const symbol = getNetworkSymbol(cryptoId);

    return (
        <Wrapper>
            {displayLogo && <StyledCoinmarketCoinLogo cryptoId={cryptoId} />}
            {amount ? <FormattedCryptoAmount value={amount} symbol={symbol} disableHiddenPlaceholder /> : symbol?.toUpperCase()}
        </Wrapper>
    );
};
