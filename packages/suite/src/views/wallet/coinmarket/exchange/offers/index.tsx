import { withSelectedAccountLoaded } from 'src/components/wallet';
import { useCoinmarketExchangeOffers } from 'src/hooks/wallet/coinmarket/offers/useCoinmarketExchangeOffers';
import Offers from './Offers';
import { UseCoinmarketProps } from 'src/types/coinmarket/coinmarket';
import { CoinmarketOffersContext } from 'src/hooks/wallet/coinmarket/offers/useCoinmarketCommonOffers';
import { CoinmarketExchangeFormContextProps } from 'src/types/coinmarket/coinmarketForm';

const OffersIndex = (props: UseCoinmarketProps) => {
    const coinmarketExchangeOffers = useCoinmarketExchangeOffers(
        props,
    ) as unknown as CoinmarketExchangeFormContextProps; // FIXME: exchange;

    return (
        <CoinmarketOffersContext.Provider value={coinmarketExchangeOffers}>
            <Offers />
        </CoinmarketOffersContext.Provider>
    );
};

export default withSelectedAccountLoaded(OffersIndex, {
    title: 'TR_NAV_EXCHANGE',
});
