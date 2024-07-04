import styled from 'styled-components';

import { getInputState } from '@suite-common/wallet-utils';
import { useCoinmarketExchangeFormContext } from 'src/hooks/wallet/useCoinmarketExchangeForm';
import { NumberInput } from 'src/components/suite';
import FiatSelect from './FiatSelect';
import { formInputsMaxLength } from '@suite-common/validators';
import { CRYPTO_INPUT, FIAT_INPUT } from 'src/types/wallet/coinmarketExchangeForm';
import { useTranslation } from 'src/hooks/suite';
import { validateDecimals, validateMin } from 'src/utils/suite/validation';

const StyledInput = styled(NumberInput)`
    input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
` as typeof NumberInput; // Styled wrapper doesn't preserve type argument, see https://github.com/styled-components/styled-components/issues/1803#issuecomment-857092410

const FiatInput = () => {
    const {
        control,
        network,
        clearErrors,
        formState: { errors },
        updateSendCryptoValue,
        setValue,
    } = useCoinmarketExchangeFormContext();

    const { translationString } = useTranslation();

    const amountError = errors.outputs?.[0]?.amount;
    const fiatError = errors.outputs?.[0]?.fiat;

    const fiatInputRules = {
        validate: {
            min: validateMin(translationString),
            decimals: validateDecimals(translationString, { decimals: 2 }),
        },
    };

    return (
        <StyledInput
            control={control}
            onChange={value => {
                setValue('setMaxOutputId', undefined);

                if (fiatError) {
                    setValue(CRYPTO_INPUT, '');
                } else {
                    updateSendCryptoValue(value, network.decimals);
                    clearErrors(FIAT_INPUT);
                }
            }}
            inputState={getInputState(fiatError || amountError)}
            name={FIAT_INPUT}
            maxLength={formInputsMaxLength.amount}
            rules={fiatInputRules}
            bottomText={fiatError?.message || null}
            innerAddon={<FiatSelect />}
            data-test="@coinmarket/exchange/fiat-input"
        />
    );
};

export default FiatInput;
