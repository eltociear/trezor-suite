import { Account } from '@suite-common/wallet-types';
import { amountToSatoshi, formatAmount } from '@suite-common/wallet-utils';
import { useDidUpdate } from '@trezor/react-utils';
import { FORM_CRYPTO_INPUT, FORM_FIAT_INPUT } from 'src/constants/wallet/coinmarket/form';
import { useBitcoinAmountUnit } from 'src/hooks/wallet/useBitcoinAmountUnit';
import { Network } from 'src/types/wallet';

interface UseCoinmarketSatsSwitcherProps {
    account: Account;
    methods: any;
    quoteCryptoAmount: string | undefined;
    quoteFiatAmount: string | undefined;
    network: Network;
    setIsSubmittingHelper: (value: boolean) => void;
}

/**
 * Hook for switching between crypto and fiat amount in coinmarket Sell and Buy form
 */
export const useCoinmarketSatsSwitcher = ({
    account,
    methods,
    quoteCryptoAmount,
    quoteFiatAmount,
    network,
    setIsSubmittingHelper,
}: UseCoinmarketSatsSwitcherProps) => {
    const { setValue, getValues } = methods;
    const { shouldSendInSats } = useBitcoinAmountUnit(account.symbol);// TODO: Revise.

    const toggleAmountInCrypto = () => {
        const { getValues, setValue } = methods;
        const { amountInCrypto } = getValues();

        if (!amountInCrypto) {
            const amount = shouldSendInSats ? amountToSatoshi(quoteCryptoAmount ?? '', network.decimals) : quoteCryptoAmount;
            setValue(FORM_CRYPTO_INPUT, amount);
        } else {
            setValue(FORM_FIAT_INPUT, quoteFiatAmount ?? '');
        }

        setValue('amountInCrypto', !amountInCrypto);
        setIsSubmittingHelper(true); // remove delay of sending request
    };

    useDidUpdate(() => {
        const cryptoInputValue = getValues(FORM_CRYPTO_INPUT);
        const conversion = shouldSendInSats ? amountToSatoshi : formatAmount;

        if (!cryptoInputValue) {
            return;
        }

        setValue(FORM_CRYPTO_INPUT, conversion(cryptoInputValue, network.decimals), {
            shouldValidate: true,
            shouldDirty: true,
        });
    }, [shouldSendInSats]);

    return {
        toggleAmountInCrypto,
    };
};
