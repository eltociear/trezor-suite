import { CoinLogo, Quality } from '@trezor/components';
import { CryptoId } from 'invity-api';
import { parseCryptoId } from 'src/utils/wallet/coinmarket/cryptoSymbolUtils';

interface CoinmarketCoinLogoProps {
    cryptoId: CryptoId;
    quality?: Quality;
}

export const CoinmarketCoinLogo = ({ cryptoId, quality }: CoinmarketCoinLogoProps) => {
    const { networkId, contractAddress } = parseCryptoId(cryptoId);

    return (
        <CoinLogo coingeckoId={networkId} contractAddress={contractAddress} quality={quality}/>
    )
}
