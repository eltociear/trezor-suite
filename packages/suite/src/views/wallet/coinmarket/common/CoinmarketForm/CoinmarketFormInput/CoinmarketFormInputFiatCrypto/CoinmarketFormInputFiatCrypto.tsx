import { useCoinmarketFormContext } from 'src/hooks/wallet/coinmarket/form/useCoinmarketCommonForm';
import { useCoinmarketCoins } from 'src/hooks/wallet/coinmarket/useCoinmarketCoins';
import { CoinmarketFormInputFiatCryptoProps } from 'src/types/coinmarket/coinmarketForm';
import { coinmarketGetAmountLabels } from 'src/utils/wallet/coinmarket/coinmarketUtils';
import { CoinmarketFormInput } from 'src/views/wallet/coinmarket';
import CoinmarketFormInputLabel from '../CoinmarketFormInputLabel';
import CoinmarketFormSwitcherCryptoFiat from '../CoinmarketFormSwitcherCryptoFiat';
import CoinmarketFormInputCrypto from './CoinmarketFormInputCrypto';
import CoinmarketFormInputFiat from './CoinmarketFormInputFiat';

const CoinmarketFormInputFiatCrypto = ({
    className,
    showLabel = true,
}: CoinmarketFormInputFiatCryptoProps) => {
    const { getNetworkSymbol } = useCoinmarketCoins();
    const {
        type,
        form: {
            state: { isFormLoading, toggleAmountInCrypto },
        },
        getValues,
    } = useCoinmarketFormContext();
    const { amountInCrypto, cryptoSelect, currencySelect } = getValues();
    const amountLabels = coinmarketGetAmountLabels({ type, amountInCrypto });

    return (
        <CoinmarketFormInput className={className}>
            {showLabel ? (
                <CoinmarketFormInputLabel label={amountLabels.label1}>
                    <CoinmarketFormSwitcherCryptoFiat
                        symbol={
                            !amountInCrypto
                                ? getNetworkSymbol(cryptoSelect.value)
                                : currencySelect.value
                        }
                        isDisabled={isFormLoading}
                        toggleAmountInCrypto={toggleAmountInCrypto}
                    />
                </CoinmarketFormInputLabel>
            ) : null}
            {amountInCrypto ? <CoinmarketFormInputCrypto /> : <CoinmarketFormInputFiat />}
        </CoinmarketFormInput>
    );
};

export default CoinmarketFormInputFiatCrypto;
