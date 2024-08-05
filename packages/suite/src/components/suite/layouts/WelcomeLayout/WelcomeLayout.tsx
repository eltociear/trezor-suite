import { ReactNode } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import {
    variables,
    SVG_IMAGES,
    useElevation,
    ElevationUp,
    ElevationDown,
    ElevationContext,
    Column,
    IconButton,
} from '@trezor/components';
import { useOnce } from '@trezor/react-utils';
// importing directly, otherwise unit tests fail, seems to be a styled-components issue
import { useDispatch, useSelector } from 'src/hooks/suite';
import { selectBannerMessage } from '@suite-common/message-system';
import { MessageSystemBanner } from 'src/components/suite/banners';

import { resolveStaticPath } from '@suite-common/suite-utils';
import { GuideButton, GuideRouter } from 'src/components/guide';
import { useGuide } from 'src/hooks/guide';
import { MAX_ONBOARDING_WIDTH } from 'src/constants/suite/layout';
import { Elevation, mapElevationToBackground, spacingsPx } from '@trezor/theme';
import { TrafficLightOffset } from '../../TrafficLightOffset';
import { goto } from 'src/actions/suite/routerActions';
import { Translation } from '../../Translation';

const LEFT_WRAPPER_WIDTH = '84px';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Body = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const WelcomeWrapper = styled.div<{ $elevation: Elevation }>`
    background-color: ${mapElevationToBackground};

    @media (max-width: ${variables.SCREEN_SIZE.MD}) {
        display: none;
    }
`;

// TODO asi tie 3 spodne veci prec
const MotionWelcome = styled(motion.div)`
    height: 100%;
`;

const Content = styled.div<{ $elevation: Elevation }>`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 3;
    padding: ${spacingsPx.lg};
    background-color: ${mapElevationToBackground};
    background-image: url(${resolveStaticPath(`images/svg/${SVG_IMAGES.ONBOARDING_WELCOME_BG}`)});
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: local;
    background-size: 570px 570px;
    align-items: center;
    overflow-y: auto;

    @media (max-width: ${variables.SCREEN_SIZE.SM}) {
        padding: ${spacingsPx.sm};
    }
`;

const ChildrenWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${MAX_ONBOARDING_WIDTH}px;
`;

const TopLeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${spacingsPx.xs};
    gap: ${spacingsPx.xs};
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

interface WelcomeLayoutProps {
    children: ReactNode;
}

const Left = () => {
    const { elevation } = useElevation();

    const { isGuideOpen, isGuideOnTop } = useGuide();

    // do not animate welcome bar on initial load
    const isFirstRender = useOnce(true, false);

    const dispatch = useDispatch();

    const handleClickSettings = () => {
        dispatch(goto('settings-index'));
    };

    const handleClickTrezor = () => {
        dispatch(goto('suite-index')); // TODO check the correct path, maybe suite-start or more paths?
    };

    // const settingsSubpages = useMemo<Array<NavigationItem>>(
    //     () => [
    //         {
    //             id: 'suite-index',
    //             title: <Translation id="TR_GENERAL" />,
    //             position: 'primary',
    //             callback: () => dispatch(goto('settings-index')),
    //         },
    //         {
    //             id: 'settings-device',
    //             title: <Translation id="TR_DEVICE" />,
    //             position: 'primary',

    //             callback: () => dispatch(goto('suite-index')),
    //         },
    //     ],
    //     [dispatch],
    // );

    return (
        <WelcomeWrapper $elevation={elevation}>
            <AnimatePresence>
                {(!isGuideOpen || isGuideOnTop) && (
                    <MotionWelcome
                        initial={{
                            width: isFirstRender ? '40vw' : 0,
                            minWidth: isFirstRender ? '380px' : 0,
                        }}
                        animate={{
                            width: `${LEFT_WRAPPER_WIDTH}`,
                            minWidth: `${LEFT_WRAPPER_WIDTH}`,
                            transition: { duration: 0.3, bounce: 0 },
                        }}
                        exit={{
                            width: 0,
                            minWidth: 0,
                            transition: { duration: 0.3, bounce: 0 },
                        }}
                    >
                        <TrafficLightOffset>
                            <Column justifyContent="center" alignItems="center" height="100%">
                                <LeftContainer>
                                    <TopLeftWrapper>
                                        <IconButton
                                            label={<Translation id="TR_CONNECT" />}
                                            icon="TREZOR_LOGO"
                                            variant="welcome"
                                            onClick={handleClickTrezor}
                                        />
                                        <IconButton
                                            label={<Translation id="TR_SETTINGS" />}
                                            icon="SETTINGS"
                                            variant="welcome"
                                            onClick={handleClickSettings}
                                            data-test="@suite/menu/settings"
                                        />
                                    </TopLeftWrapper>
                                </LeftContainer>
                            </Column>
                        </TrafficLightOffset>
                    </MotionWelcome>
                )}
            </AnimatePresence>
        </WelcomeWrapper>
    );
};

const Right = ({ children }: { children: ReactNode }) => {
    const { elevation } = useElevation();

    return (
        <Content $elevation={elevation}>
            <ChildrenWrapper>
                <ElevationUp>{children}</ElevationUp>
            </ChildrenWrapper>
        </Content>
    );
};

// WelcomeLayout is a top-level wrapper similar to @suite-components/SuiteLayout
// used in Preloader and Onboarding
export const WelcomeLayout = ({ children }: WelcomeLayoutProps) => {
    const bannerMessage = useSelector(selectBannerMessage);

    return (
        <ElevationContext baseElevation={-1}>
            <Wrapper>
                {bannerMessage && <MessageSystemBanner message={bannerMessage} />}

                <Body data-test="@welcome-layout/body">
                    <ElevationDown>
                        <Left />
                    </ElevationDown>

                    <Right>{children}</Right>

                    <GuideButton />
                    <GuideRouter />
                </Body>
            </Wrapper>
        </ElevationContext>
    );
};
