import styled from 'styled-components';
import { EventType, analytics } from '@trezor/suite-analytics';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownMenuItemProps,
    IconButton,
    IconProps,
} from '@trezor/components';
import { spacingsPx } from '@trezor/theme';
import { hasNetworkFeatures } from '@suite-common/wallet-utils';
import { WalletParams } from 'src/types/wallet';
import { Translation } from 'src/components/suite/Translation';
import { useDevice, useDispatch, useSelector } from 'src/hooks/suite';
import { goto } from 'src/actions/suite/routerActions';
import { AppNavigationTooltip } from 'src/components/suite/AppNavigation/AppNavigationTooltip';
import { selectSelectedAccount } from 'src/reducers/wallet/selectedAccountReducer';

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: ${spacingsPx.xxs};
`;

type ActionItem = {
    id: string;
    icon?: IconProps['icon'];
    callback: () => void;
    title: JSX.Element;
    'data-test-id'?: string;
    isHidden?: boolean;
};

export const HeaderActions = () => {
    const account = useSelector(selectSelectedAccount);
    const routerParams = useSelector(state => state.router.params) as WalletParams;
    const selectedAccount = useSelector(state => state.wallet.selectedAccount);

    const dispatch = useDispatch();
    const { device } = useDevice();
    const layoutSize = useSelector(state => state.resize.size);
    const isMobileLayout = layoutSize === 'TINY';

    const accountType = account?.accountType || routerParams?.accountType || '';

    const goToWithAnalytics = (...[routeName, options]: Parameters<typeof goto>) => {
        if (account?.symbol) {
            analytics.report({
                type: EventType.AccountsActions,
                payload: { symbol: account.symbol, action: routeName },
            });
        }
        dispatch(goto(routeName, options));
    };

    const additionalActions: ActionItem[] = [
        {
            id: 'wallet-sign-verify',
            callback: () => {
                goToWithAnalytics('wallet-sign-verify', { preserveParams: true });
            },
            title: <Translation id="TR_NAV_SIGN_AND_VERIFY" />,
            icon: 'SIGNATURE',
            // show dots when acc missing as they are hidden only in case of XRP
            isHidden: account ? !hasNetworkFeatures(account, 'sign-verify') : false,
        },
    ];

    const visibleAdditionalActions = additionalActions?.filter(action => !action.isHidden);

    const isCoinmarketAvailable = !['coinjoin'].includes(accountType);
    const isAccountLoading = selectedAccount.status === 'loading';

    const ButtonComponent = isMobileLayout ? IconButton : Button;
    const isDeviceConnected = device?.connected && device?.available;

    return (
        <Container>
            {visibleAdditionalActions?.length > 0 && (
                <AppNavigationTooltip>
                    <Dropdown
                        alignMenu="bottom-right"
                        isDisabled={isAccountLoading}
                        data-test-id="@wallet/menu/extra-dropdown"
                        items={[
                            {
                                key: 'extra',
                                options: visibleAdditionalActions.map<DropdownMenuItemProps>(
                                    item => ({
                                        key: item.id,
                                        onClick: isAccountLoading ? undefined : item.callback,
                                        label: item.title,
                                        'data-test-id': `@wallet/menu/${item.id}`,
                                    }),
                                ),
                            },
                        ]}
                    />
                </AppNavigationTooltip>
            )}

            {isCoinmarketAvailable && (
                <AppNavigationTooltip>
                    <ButtonComponent
                        icon="REFRESH"
                        onClick={() => {
                            goToWithAnalytics('wallet-coinmarket-buy', { preserveParams: true });
                        }}
                        data-test-id="@wallet/menu/wallet-coinmarket-buy"
                        variant="tertiary"
                        size="small"
                        isDisabled={isAccountLoading}
                    >
                        <Translation id="TR_NAV_TRADE" />
                    </ButtonComponent>
                </AppNavigationTooltip>
            )}

            <AppNavigationTooltip>
                <ButtonGroup size="small" isDisabled={isAccountLoading}>
                    <ButtonComponent
                        key="wallet-send"
                        icon="SEND"
                        onClick={() => {
                            goToWithAnalytics('wallet-send', { preserveParams: true });
                        }}
                        data-test-id="@wallet/menu/wallet-send"
                        variant={isDeviceConnected ? 'primary' : 'tertiary'}
                    >
                        <Translation id="TR_NAV_SEND" />
                    </ButtonComponent>

                    <ButtonComponent
                        key="wallet-receive"
                        icon="RECEIVE"
                        onClick={() => {
                            goToWithAnalytics('wallet-receive', { preserveParams: true });
                        }}
                        data-test-id="@wallet/menu/wallet-receive"
                        variant={isDeviceConnected ? 'primary' : 'tertiary'}
                    >
                        <Translation id="TR_NAV_RECEIVE" />
                    </ButtonComponent>
                </ButtonGroup>
            </AppNavigationTooltip>
        </Container>
    );
};
