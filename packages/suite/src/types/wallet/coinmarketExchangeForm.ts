import type { FeeInfo, FormState, PrecomposedLevels, PrecomposedLevelsCardano } from '@suite-common/wallet-types';
import { Rate } from '@suite-common/wallet-types';
import type { FeeLevel } from '@trezor/connect';
import { CryptoSymbol, CryptoSymbolInfo } from 'invity-api';
import type { FormState as ReactHookFormState, UseFormReturn } from 'react-hook-form';
import type { ExchangeInfo } from 'src/actions/wallet/coinmarketExchangeActions';
import type { AppState } from 'src/types/suite';
import type { Account, Network } from 'src/types/wallet';
import { SendContextValues } from 'src/types/wallet/sendForm';
import type { AmountLimits, CryptoAmountLimits, Option } from './coinmarketCommonTypes';

export const CRYPTO_INPUT = 'outputs.0.amount';
export const CRYPTO_TOKEN = 'outputs.0.token';
export const FIAT_INPUT = 'outputs.0.fiat';
export const FIAT_CURRENCY = 'outputs.0.currency';

export type ExchangeFormState = FormState & {
    // NOTE: react-select value type cannot be undefined, but at least null works
    receiveCryptoSelect: (Option & { cryptoSymbol?: CryptoSymbol }) | null;
    sendCryptoSelect: Option & { cryptoSymbol?: CryptoSymbol };
};

export interface ExchangeFormContextValues extends UseFormReturn<ExchangeFormState> {
    onSubmit: () => void;
    account: Account;
    isComposing: boolean;
    changeFeeLevel: (level: FeeLevel['label']) => void;
    exchangeInfo?: ExchangeInfo;
    // TODO: Obsolete, remove!
    symbolsInfo?: CryptoSymbolInfo[];
    defaultCurrency: Option;
    composeRequest: SendContextValues['composeTransaction'];
    updateFiatCurrency: (selectedCurrency: { value: string; label: string }, rate: number) => void;
    updateSendCryptoValue: (fiatValue: string, decimals: number) => void;
    amountLimits?: AmountLimits;
    composedLevels?: PrecomposedLevels | PrecomposedLevelsCardano;
    fiatRate?: Rate;
    setAmountLimits: (limits?: CryptoAmountLimits) => void;
    quotesRequest: AppState['wallet']['coinmarket']['exchange']['quotesRequest'];
    isLoading: boolean;
    updateFiatValue: (amount: string) => void;
    noProviders: boolean;
    network: Network;
    feeInfo: FeeInfo;
    removeDraft: (key: string) => void;
    formState: ReactHookFormState<ExchangeFormState>;
    handleClearFormButtonClick: () => void;
    isDraft: boolean;
}
