import { Coins } from 'invity-api';
import { COINMARKET_INFO } from 'src/actions/wallet/constants';
import { CoinmarketPaymentMethodListProps } from 'src/types/coinmarket/coinmarket';

export type CoinmarketInfoAction =
    | {
          type: typeof COINMARKET_INFO.SAVE_COINS;
          coins: Coins;
      }
    | {
          type: typeof COINMARKET_INFO.SAVE_PAYMENT_METHODS;
          paymentMethods: CoinmarketPaymentMethodListProps[];
      };

export const saveCoins = (coins: Coins): CoinmarketInfoAction => ({
    type: COINMARKET_INFO.SAVE_COINS,
    coins,
});

export const savePaymentMethods = (
    paymentMethods: CoinmarketPaymentMethodListProps[],
): CoinmarketInfoAction => ({
    type: COINMARKET_INFO.SAVE_PAYMENT_METHODS,
    paymentMethods,
});
