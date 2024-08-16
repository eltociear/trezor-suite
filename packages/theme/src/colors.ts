// If you want to add of modify colors, please read README.md to find out more.

import { Elevation } from './elevation';
import { palette } from './palette';
import { CSSColor } from './types';

type StyledComponentElevationProps = {
    theme: Colors; // this package does not depend on styled-components
    $elevation: Elevation;
};

export const mapElevationToBackgroundToken = ({ $elevation }: { $elevation: Elevation }): Color =>
    `backgroundSurfaceElevation${$elevation === -1 ? 'Negative' : $elevation}`;

export const mapElevationToBackground = ({
    theme,
    $elevation,
}: StyledComponentElevationProps): CSSColor => theme[mapElevationToBackgroundToken({ $elevation })];

export const mapElevationToBorder = ({
    theme,
    $elevation,
}: StyledComponentElevationProps): CSSColor =>
    theme[`borderElevation${$elevation === -1 ? 'Negative' : $elevation}`];

// ---------------------------

// @TODO create iconDefaultInverse (packages/suite/src/components/suite/banners/Banner.tsx)

const light = {
    transparent: '#00000000',

    // Deprecated
    gradientNeutralBottomFadeSurfaceElevation1Start: '#FFFFFF33', // Don't use it, use elevation colors
    gradientNeutralBottomFadeSurfaceElevation1End: '#FFFFFF', // Don't use it, use elevation colors
    backGroundOnboardingCard: '#FFFFFFBD',

    // Figma Colors
    backgroundAlertBlueBold: palette.lightAccentBlue600,
    backgroundAlertBlueBoldAlt: palette.lightAccentBlue700,
    backgroundAlertBlueSubtleOnElevation0: palette.lightAccentBlue300,
    backgroundAlertBlueSubtleOnElevation1: palette.lightAccentBlue200,
    backgroundAlertBlueSubtleOnElevation2: palette.lightAccentBlue100,
    backgroundAlertBlueSubtleOnElevation3: palette.lightAccentBlue50,
    backgroundAlertBlueSubtleOnElevationNegative: palette.lightAccentBlue400,
    backgroundAlertRedBold: palette.lightAccentRed600,
    backgroundAlertRedBoldAlt: palette.lightAccentRed700,
    backgroundAlertRedSubtleOnElevation0: palette.lightAccentRed300,
    backgroundAlertRedSubtleOnElevation1: palette.lightAccentRed200,
    backgroundAlertRedSubtleOnElevation2: palette.lightAccentRed100,
    backgroundAlertRedSubtleOnElevation3: palette.lightAccentRed50,
    backgroundAlertRedSubtleOnElevationNegative: palette.lightAccentRed400,
    backgroundAlertYellowBold: palette.lightAccentYellow600,
    backgroundAlertYellowBoldAlt: palette.lightAccentYellow700,
    backgroundAlertYellowSubtleOnElevation0: palette.lightAccentYellow300,
    backgroundAlertYellowSubtleOnElevation1: palette.lightAccentYellow200,
    backgroundAlertYellowSubtleOnElevation2: palette.lightAccentYellow100,
    backgroundAlertYellowSubtleOnElevation3: palette.lightAccentYellow50,
    backgroundAlertYellowSubtleOnElevationNegative: palette.lightAccentYellow400,
    backgroundNeutralBold: palette.lightGray1000,
    backgroundNeutralBoldInverted: palette.lightWhiteAlpha1000,
    backgroundNeutralDisabled: palette.lightGray200,
    backgroundNeutralSubdued: palette.lightGray400,
    backgroundNeutralSubtleOnElevation0: palette.lightGray200,
    backgroundNeutralSubtleOnElevation1: palette.lightGray100,
    backgroundNeutralSubtleOnElevationNegative: palette.lightGray300,
    backgroundPrimaryDefault: palette.lightPrimaryForest800,
    backgroundPrimaryPressed: palette.lightPrimaryForest900,
    backgroundPrimarySubtleOnElevation0: palette.lightPrimaryForest300,
    backgroundPrimarySubtleOnElevation1: palette.lightPrimaryForest200,
    backgroundPrimarySubtleOnElevationNegative: palette.lightPrimaryForest400,
    backgroundSecondaryDefault: palette.lightSecondaryEmerald800,
    backgroundSecondaryPressed: palette.lightSecondaryEmerald900,
    backgroundSurfaceElevation0: palette.lightGray100,
    backgroundSurfaceElevation1: palette.lightWhiteAlpha1000,
    backgroundSurfaceElevation2: palette.lightGray100,
    backgroundSurfaceElevation3: palette.lightWhiteAlpha1000,
    backgroundSurfaceElevationNegative: palette.lightGray200,
    backgroundTertiaryDefaultOnElevation0: palette.lightGray200,
    backgroundTertiaryDefaultOnElevation1: palette.lightGray100,
    backgroundTertiaryDefaultOnElevationNegative: palette.lightGray300,
    backgroundTertiaryPressedOnElevation0: palette.lightGray300,
    backgroundTertiaryPressedOnElevation1: palette.lightGray200,
    backgroundTertiaryPressedOnElevationNegative: palette.lightGray400,
    borderAlertRed: palette.lightAccentRed600,
    borderDashed: palette.lightGray400,
    borderFocus: palette.lightGray300,
    borderInverted: palette.lightWhiteAlpha1000,
    borderElevation0: palette.lightGray300,
    borderElevation1: palette.lightGray200,
    borderElevation2: palette.lightGray200,
    borderElevation3: palette.lightGray200,
    borderElevationNegative: palette.lightGray400,
    borderSecondary: palette.lightSecondaryEmerald800,
    borderSubtleInverted: palette.lightWhiteAlpha400,
    iconAlertBlue: palette.lightAccentBlue800,
    iconAlertRed: palette.lightAccentRed700,
    iconAlertYellow: palette.lightAccentYellow800,
    iconDefault: palette.lightGray1000,
    iconDefaultInverted: palette.lightWhiteAlpha1000,
    iconDisabled: palette.lightGray600,
    iconOnBlue: palette.lightWhiteAlpha1000,
    iconOnPrimary: palette.lightWhiteAlpha1000,
    iconOnRed: palette.lightWhiteAlpha1000,
    iconOnSecondary: palette.lightWhiteAlpha1000,
    iconOnTertiary: palette.lightGray800,
    iconOnYellow: palette.lightGray1000,
    iconPrimaryDefault: palette.lightPrimaryForest800,
    iconEverstake: palette.lightGray700,
    iconPrimaryPressed: palette.lightPrimaryForest900,
    iconSubdued: palette.lightGray700,
    interactionBackgroundDestructiveDefaultHoverOnElevation0: palette.lightAccentRed300,
    interactionBackgroundDestructiveDefaultHoverOnElevation1: palette.lightAccentRed200,
    interactionBackgroundDestructiveDefaultHoverOnElevation2: palette.lightAccentRed300,
    interactionBackgroundDestructiveDefaultHoverOnElevation3: palette.lightAccentRed200,
    interactionBackgroundDestructiveDefaultHoverOnElevationNegative: palette.lightAccentRed400,
    interactionBackgroundDestructiveDefaultNormalOnElevation0: palette.lightAccentRed200,
    interactionBackgroundDestructiveDefaultNormalOnElevation1: palette.lightAccentRed100,
    interactionBackgroundDestructiveDefaultNormalOnElevation2: palette.lightAccentRed200,
    interactionBackgroundDestructiveDefaultNormalOnElevation3: palette.lightAccentRed100,
    interactionBackgroundDestructiveDefaultNormalOnElevationNegative: palette.lightAccentRed300,
    interactionBackgroundInfoDefaultHoverOnElevation0: palette.lightAccentBlue300,
    interactionBackgroundInfoDefaultHoverOnElevation1: palette.lightAccentBlue200,
    interactionBackgroundInfoDefaultHoverOnElevation2: palette.lightAccentBlue300,
    interactionBackgroundInfoDefaultHoverOnElevation3: palette.lightAccentBlue200,
    interactionBackgroundInfoDefaultHoverOnElevationNegative: palette.lightAccentBlue400,
    interactionBackgroundInfoDefaultNormalOnElevation0: palette.lightAccentBlue200,
    interactionBackgroundInfoDefaultNormalOnElevation1: palette.lightAccentBlue100,
    interactionBackgroundInfoDefaultNormalOnElevation2: palette.lightAccentBlue200,
    interactionBackgroundInfoDefaultNormalOnElevation3: palette.lightAccentBlue100,
    interactionBackgroundInfoDefaultNormalOnElevationNegative: palette.lightAccentBlue300,
    interactionBackgroundTertiaryDefaultHoverOnElevation0: palette.lightGray300,
    interactionBackgroundTertiaryDefaultHoverOnElevation1: palette.lightGray200,
    interactionBackgroundTertiaryDefaultHoverOnElevation2: palette.lightGray300,
    interactionBackgroundTertiaryDefaultHoverOnElevation3: palette.lightGray200,
    interactionBackgroundTertiaryDefaultHoverOnElevationNegative: palette.lightGray400,
    interactionBackgroundTertiaryDefaultNormalOnElevation0: palette.lightGray200,
    interactionBackgroundTertiaryDefaultNormalOnElevation1: palette.lightGray100,
    interactionBackgroundTertiaryDefaultNormalOnElevation2: palette.lightGray200,
    interactionBackgroundTertiaryDefaultNormalOnElevation3: palette.lightGray100,
    interactionBackgroundTertiaryDefaultNormalOnElevationNegative: palette.lightGray300,
    interactionBackgroundWarningDefaultHoverOnElevation0: palette.lightAccentYellow300,
    interactionBackgroundWarningDefaultHoverOnElevation1: palette.lightAccentYellow200,
    interactionBackgroundWarningDefaultHoverOnElevation2: palette.lightAccentYellow300,
    interactionBackgroundWarningDefaultHoverOnElevation3: palette.lightAccentYellow200,
    interactionBackgroundWarningDefaultHoverOnElevationNegative: palette.lightAccentYellow400,
    interactionBackgroundWarningDefaultNormalOnElevation0: palette.lightAccentYellow200,
    interactionBackgroundWarningDefaultNormalOnElevation1: palette.lightAccentYellow100,
    interactionBackgroundWarningDefaultNormalOnElevation2: palette.lightAccentYellow200,
    interactionBackgroundWarningDefaultNormalOnElevation3: palette.lightAccentYellow100,
    interactionBackgroundWarningDefaultNormalOnElevationNegative: palette.lightAccentYellow300,
    textAlertBlue: palette.lightAccentBlue800,
    textAlertRed: palette.lightAccentRed700,
    textAlertYellow: palette.lightAccentYellow800,
    textDefault: palette.lightGray1000,
    textDefaultInverted: palette.lightWhiteAlpha1000,
    textDisabled: palette.lightGray600,
    textOnBlue: palette.lightWhiteAlpha1000,
    textOnPrimary: palette.lightWhiteAlpha1000,
    textOnRed: palette.lightWhiteAlpha1000,
    textOnSecondary: palette.lightWhiteAlpha1000,
    textOnTertiary: palette.lightGray800,
    textOnYellow: palette.lightGray1000,
    textPrimaryDefault: palette.lightPrimaryForest800,
    textPrimaryPressed: palette.lightPrimaryForest900,
    textSecondaryHighlight: palette.lightSecondaryEmerald800,
    textSubdued: palette.lightGray700,
};

export type ThemeColorVariant = 'debug' | 'standard' | 'dark';

export type Color = keyof typeof light;
export type Colors = Record<Color, CSSColor>;

export const colorVariants: Record<ThemeColorVariant, Colors> = {
    debug: {
        ...light,
        backgroundSurfaceElevationNegative: '#F09EA7',
        backgroundSurfaceElevation0: '#F6CA94',
        backgroundSurfaceElevation1: '#C1EBC0',
        backgroundSurfaceElevation2: '#C7E5F7',
        backgroundSurfaceElevation3: '#C9B0FF',

        borderElevationNegative: '#FF0000',
        borderElevation0: '#FEB144',
        borderElevation1: '#74DF74',
        borderElevation2: '#0000FF',
        borderElevation3: '#AF4AAF',
    } as Colors,

    standard: light as Colors,

    dark: {
        transparent: '#00000000',

        // Deprecated
        gradientNeutralBottomFadeSurfaceElevation1Start: '#00000033', // Don't use it, use elevation colors
        gradientNeutralBottomFadeSurfaceElevation1End: '#000000', // Don't use it, use elevation colors
        backGroundOnboardingCard: '#000000BD',

        // Figma Colors
        backgroundAlertBlueBold: palette.darkAccentBlue600,
        backgroundAlertBlueBoldAlt: palette.darkAccentBlue700,
        backgroundAlertBlueSubtleOnElevation0: palette.darkAccentBlue50,
        backgroundAlertBlueSubtleOnElevation1: palette.darkAccentBlue100,
        backgroundAlertBlueSubtleOnElevation2: palette.darkAccentBlue200,
        backgroundAlertBlueSubtleOnElevation3: palette.darkAccentBlue300,
        backgroundAlertBlueSubtleOnElevationNegative: '#FFFFFF',
        backgroundAlertRedBold: palette.darkAccentRed600,
        backgroundAlertRedBoldAlt: palette.darkAccentRed700,
        backgroundAlertRedSubtleOnElevation0: palette.darkAccentRed50,
        backgroundAlertRedSubtleOnElevation1: palette.darkAccentRed100,
        backgroundAlertRedSubtleOnElevation2: palette.darkAccentRed200,
        backgroundAlertRedSubtleOnElevation3: palette.darkAccentRed300,
        backgroundAlertRedSubtleOnElevationNegative: '#FFFFFF',
        backgroundAlertYellowBold: palette.darkAccentYellow600,
        backgroundAlertYellowBoldAlt: palette.darkAccentYellow700,
        backgroundAlertYellowSubtleOnElevation0: palette.darkAccentYellow50,
        backgroundAlertYellowSubtleOnElevation1: palette.darkAccentYellow100,
        backgroundAlertYellowSubtleOnElevation2: palette.darkAccentYellow200,
        backgroundAlertYellowSubtleOnElevation3: palette.darkAccentYellow300,
        backgroundAlertYellowSubtleOnElevationNegative: '#FFFFFF',
        backgroundNeutralBold: palette.darkGray1000,
        backgroundNeutralBoldInverted: palette.darkGray000,
        backgroundNeutralDisabled: palette.darkGray200,
        backgroundNeutralSubdued: palette.darkGray300,
        backgroundNeutralSubtleOnElevation0: palette.darkGray100,
        backgroundNeutralSubtleOnElevation1: palette.darkGray200,
        backgroundNeutralSubtleOnElevationNegative: palette.darkGray50,
        backgroundPrimaryDefault: palette.darkPrimaryForest800,
        backgroundPrimaryPressed: palette.darkPrimaryForest900,
        backgroundPrimarySubtleOnElevation0: palette.darkPrimaryForest100,
        backgroundPrimarySubtleOnElevation1: palette.darkPrimaryForest200,
        backgroundPrimarySubtleOnElevationNegative: palette.darkPrimaryForest100,
        backgroundSecondaryDefault: palette.darkSecondaryGreen800,
        backgroundSecondaryPressed: palette.darkSecondaryGreen900,
        backgroundSurfaceElevation0: palette.darkGray50,
        backgroundSurfaceElevation1: palette.darkGray100,
        backgroundSurfaceElevation2: palette.darkGray200,
        backgroundSurfaceElevation3: palette.darkGray300,
        backgroundSurfaceElevationNegative: palette.darkGray000,
        backgroundTertiaryDefaultOnElevation0: palette.darkGray100,
        backgroundTertiaryDefaultOnElevation1: palette.darkGray200,
        backgroundTertiaryDefaultOnElevationNegative: palette.darkGray50,
        backgroundTertiaryPressedOnElevation0: palette.darkGray200,
        backgroundTertiaryPressedOnElevation1: palette.darkGray300,
        backgroundTertiaryPressedOnElevationNegative: palette.darkGray100,
        borderAlertRed: palette.darkAccentRed600,
        borderDashed: palette.darkGray200,
        borderElevation0: palette.darkGray100,
        borderElevation1: palette.darkGray200,
        borderElevation2: palette.darkGray300,
        borderElevation3: palette.darkGray400,
        borderElevationNegative: palette.darkGray50,
        borderFocus: palette.darkGray200,
        borderInverted: palette.darkGray000,
        borderSecondary: palette.darkSecondaryGreen800,
        borderSubtleInverted: palette.lightWhiteAlpha400,
        iconAlertBlue: palette.darkAccentBlue700,
        iconAlertRed: palette.darkAccentRed700,
        iconAlertYellow: palette.darkAccentYellow600,
        iconDefault: palette.darkGray1000,
        iconDefaultInverted: palette.darkGray000,
        iconDisabled: palette.darkGray600,
        iconOnBlue: palette.darkGray1000,
        iconOnPrimary: palette.darkGray000,
        iconOnRed: palette.darkGray1000,
        iconOnSecondary: palette.darkGray000,
        iconOnTertiary: palette.darkGray800,
        iconOnYellow: palette.darkGray000,
        iconPrimaryDefault: palette.darkPrimaryForest800,
        iconEverstake: palette.lightWhiteAlpha1000,
        iconPrimaryPressed: palette.darkPrimaryForest900,
        iconSubdued: palette.darkGray700,
        interactionBackgroundDestructiveDefaultHoverOnElevation0: palette.darkAccentRed200,
        interactionBackgroundDestructiveDefaultHoverOnElevation1: palette.darkAccentRed300,
        interactionBackgroundDestructiveDefaultHoverOnElevation2: palette.darkAccentRed400,
        interactionBackgroundDestructiveDefaultHoverOnElevation3: palette.darkAccentRed500,
        interactionBackgroundDestructiveDefaultHoverOnElevationNegative: palette.darkAccentRed100,
        interactionBackgroundDestructiveDefaultNormalOnElevation0: palette.darkAccentRed100,
        interactionBackgroundDestructiveDefaultNormalOnElevation1: palette.darkAccentRed200,
        interactionBackgroundDestructiveDefaultNormalOnElevation2: palette.darkAccentRed300,
        interactionBackgroundDestructiveDefaultNormalOnElevation3: palette.darkAccentRed400,
        interactionBackgroundDestructiveDefaultNormalOnElevationNegative: palette.darkAccentRed50,
        interactionBackgroundInfoDefaultHoverOnElevation0: palette.darkAccentBlue200,
        interactionBackgroundInfoDefaultHoverOnElevation1: palette.darkAccentBlue300,
        interactionBackgroundInfoDefaultHoverOnElevation2: palette.darkAccentBlue400,
        interactionBackgroundInfoDefaultHoverOnElevation3: palette.darkAccentBlue500,
        interactionBackgroundInfoDefaultHoverOnElevationNegative: palette.darkAccentBlue100,
        interactionBackgroundInfoDefaultNormalOnElevation0: palette.darkAccentBlue100,
        interactionBackgroundInfoDefaultNormalOnElevation1: palette.darkAccentBlue200,
        interactionBackgroundInfoDefaultNormalOnElevation2: palette.darkAccentBlue300,
        interactionBackgroundInfoDefaultNormalOnElevation3: palette.darkAccentBlue400,
        interactionBackgroundInfoDefaultNormalOnElevationNegative: palette.darkAccentBlue50,
        interactionBackgroundTertiaryDefaultHoverOnElevation0: palette.darkGray200,
        interactionBackgroundTertiaryDefaultHoverOnElevation1: palette.darkGray300,
        interactionBackgroundTertiaryDefaultHoverOnElevation2: palette.darkGray400,
        interactionBackgroundTertiaryDefaultHoverOnElevation3: palette.darkGray500,
        interactionBackgroundTertiaryDefaultHoverOnElevationNegative: palette.darkGray100,
        interactionBackgroundTertiaryDefaultNormalOnElevation0: palette.darkGray100,
        interactionBackgroundTertiaryDefaultNormalOnElevation1: palette.darkGray200,
        interactionBackgroundTertiaryDefaultNormalOnElevation2: palette.darkGray300,
        interactionBackgroundTertiaryDefaultNormalOnElevation3: palette.darkGray400,
        interactionBackgroundTertiaryDefaultNormalOnElevationNegative: palette.darkGray50,
        interactionBackgroundWarningDefaultHoverOnElevation0: palette.darkAccentYellow200,
        interactionBackgroundWarningDefaultHoverOnElevation1: palette.darkAccentYellow300,
        interactionBackgroundWarningDefaultHoverOnElevation2: palette.darkAccentYellow400,
        interactionBackgroundWarningDefaultHoverOnElevation3: palette.darkAccentYellow500,
        interactionBackgroundWarningDefaultHoverOnElevationNegative: palette.darkAccentYellow100,
        interactionBackgroundWarningDefaultNormalOnElevation0: palette.darkAccentYellow100,
        interactionBackgroundWarningDefaultNormalOnElevation1: palette.darkAccentYellow200,
        interactionBackgroundWarningDefaultNormalOnElevation2: palette.darkAccentYellow300,
        interactionBackgroundWarningDefaultNormalOnElevation3: palette.darkAccentYellow400,
        interactionBackgroundWarningDefaultNormalOnElevationNegative: palette.darkAccentYellow50,
        textAlertBlue: palette.darkAccentBlue800,
        textAlertRed: palette.darkAccentRed800,
        textAlertYellow: palette.darkAccentYellow700,
        textDefault: palette.darkGray1000,
        textDefaultInverted: palette.darkGray000,
        textDisabled: palette.darkGray600,
        textOnBlue: palette.darkGray1000,
        textOnPrimary: palette.darkGray000,
        textOnRed: palette.darkGray1000,
        textOnSecondary: palette.darkGray000,
        textOnTertiary: palette.darkGray800,
        textOnYellow: palette.darkGray000,
        textPrimaryDefault: palette.darkPrimaryForest800,
        textPrimaryPressed: palette.darkPrimaryForest900,
        textSecondaryHighlight: palette.darkSecondaryGreen800,
        textSubdued: palette.darkGray700,
    },
} as const;
