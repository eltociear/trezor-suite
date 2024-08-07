import { components, ControlProps, OptionProps, GroupHeadingProps } from 'react-select';
import type { Option as OptionType } from './Select';

export interface ControlComponentProps extends ControlProps<OptionType, boolean> {
    'data-test-id'?: string;
}

export const Control = ({ 'data-test-id': dataTest, ...controlProps }: ControlComponentProps) => (
    <components.Control
        {...controlProps}
        innerProps={
            dataTest
                ? ({
                      ...controlProps.innerProps,
                      'data-test-id': `${dataTest}/input`,
                  } as ControlProps<OptionType>['innerProps'])
                : controlProps.innerProps
        }
    />
);

export interface OptionComponentProps extends OptionProps<OptionType, boolean> {
    'data-test-id'?: string;
}

export const Option = ({ 'data-test-id': dataTest, ...optionProps }: OptionComponentProps) => (
    <components.Option
        {...optionProps}
        innerProps={
            {
                ...optionProps.innerProps,
                'data-test-id': `${dataTest}/option/${
                    typeof optionProps.data.value === 'string'
                        ? optionProps.data.value
                        : optionProps.label
                }`,
            } as OptionProps<OptionType, boolean>['innerProps']
        }
    />
);

export const GroupHeading = (groupHeadingProps: GroupHeadingProps<OptionType>) => (
    <components.GroupHeading {...groupHeadingProps} />
);
