import React, { useRef, useEffect, forwardRef, useState, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

const HiddenInputToMeasurePlaceholderScrollableWidth = styled.input`
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;

    /* Never change any style here! It would affect the scrollWidth calculation of the placeholder. */
`;

type ApplyWidthParams = {
    ref: React.MutableRefObject<HTMLInputElement | null>;
    width: number;
    minWidth: number;
};

const applyWidth = ({ width, minWidth, ref }: ApplyWidthParams) => {
    if (ref?.current?.style) {
        const borderSize = ref.current.offsetWidth - ref.current.clientWidth;
        console.log('applyWidth')
        // First it needs to be set to minimum, this ensures that width of the input will be shrinking as text gets smaller
        ref.current.style.width = `${minWidth + borderSize}px`; // See: https://stackoverflow.com/a/75227086
        ref.current.style.width = `${width + borderSize}px`;
    }
};

type ApplyOnTargetOverEventParams = {
    onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
    calculatedMin: number;
};

const createHandleOnChangeAndApplyNewWidth =
    ({ onChange, calculatedMin }: ApplyOnTargetOverEventParams) =>
    (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        const borderSize = target.offsetWidth - target.clientWidth;
        console.log('onchange')
        // See: `applyWidth` function for explanation.
        // It cannot be used here as we work with `target` from event and not react Ref.
        target.style.width = `${calculatedMin + borderSize}px`; // See: https://stackoverflow.com/a/75227086
        target.style.width = `${target.scrollWidth + borderSize}px`;
        onChange?.(event);
    };

export interface Props
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    minWidth: number;
}

const StyledInput = styled.input`
    &:disabled {
        pointer-events: auto;
        cursor: not-allowed;
    }
`;

/**
 * TODO: This is Labeling Input and this maybe consolidated with `withEditable`
 */
export const AutoScalingInput = forwardRef<HTMLInputElement, Props>(
    ({ value, minWidth, ...props }, ref) => {
        const [calculatedMin, setCalculatedMin] = useState(minWidth);
        const inputRef = useRef<HTMLInputElement | null>(null);
        const placeholderMeasureRef = useRef<HTMLInputElement | null>(null);

       console.log('yay', inputRef?.current?.scrollWidth) 


        // Measure the size of the placeholder 
        useEffect(() => {
            if (placeholderMeasureRef?.current?.style) {
                setCalculatedMin(Math.max(minWidth, placeholderMeasureRef.current.scrollWidth ?? 0));
                console.log('fdfd', placeholderMeasureRef.current.scrollWidth)
            }
        });

        useEffect(() => {
            const isValueEmpty = value === '' || value === null || value === undefined;

            const width = isValueEmpty
                ? calculatedMin
                : inputRef?.current?.scrollWidth ?? calculatedMin;

            applyWidth({
                width: calculatedMin,
                minWidth: calculatedMin,
                ref: inputRef,
            });
        }, [inputRef, calculatedMin]);

        const innerRef = useCallback(
            (e: HTMLInputElement) => {
                if (ref && typeof ref === 'object') {
                    ref.current = e;
                }
                if (ref && typeof ref === 'function') {
                    ref(e);
                }

                inputRef.current = e;
            },
            [ref],
        );

        return (
            <>
                <HiddenInputToMeasurePlaceholderScrollableWidth
                    className={props.className} // It is important to keep styles so the width is properly calculated
                    style={props.style} // It is important to keep styles so the width is properly calculated
                    type="text"
                    ref={placeholderMeasureRef}
                    value={value} 
                    readOnly
                />
                <StyledInput
                    {...props}
                    ref={innerRef}
                    type="text"
                    value={value}
                    onChange={createHandleOnChangeAndApplyNewWidth({
                        calculatedMin,
                        onChange: props.onChange,
                    })}
                />
            </>
        );
    },
);
