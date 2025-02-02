import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pipe } from '@mobily/ts-belt';
import { memoizeWithArgs } from 'proxy-memoize';

import {
    DeviceRootState,
    filterUnavailableNetworks,
    selectDeviceSupportedNetworks,
} from '@suite-common/wallet-core';
import {
    filterBlacklistedNetworks,
    filterTestnetNetworks,
    sortNetworks,
} from '@suite-native/config';
import { NetworkSymbol } from '@suite-common/wallet-config';
import {
    FeatureFlag,
    FeatureFlagsRootState,
    selectIsFeatureFlagEnabled,
} from '@suite-native/feature-flags';

import { getNetworkSymbols } from './utils';

type DiscoveryInfo = {
    startTimestamp: number;
    networkSymbols: NetworkSymbol[];
};

type DiscoveryConfigState = {
    areTestnetsEnabled: boolean;
    discoveryInfo: DiscoveryInfo | null;
    enabledDiscoveryNetworkSymbols: NetworkSymbol[];
};

export type DiscoveryConfigSliceRootState = {
    discoveryConfig: DiscoveryConfigState;
};

const discoveryConfigInitialState: DiscoveryConfigState = {
    areTestnetsEnabled: false,
    discoveryInfo: null,
    enabledDiscoveryNetworkSymbols: [],
};

export const discoveryConfigPersistWhitelist: Array<keyof DiscoveryConfigState> = [
    'areTestnetsEnabled',
    'enabledDiscoveryNetworkSymbols',
];

export const discoveryConfigSlice = createSlice({
    name: 'discoveryConfig',
    initialState: discoveryConfigInitialState,
    reducers: {
        toggleAreTestnetsEnabled: state => {
            state.areTestnetsEnabled = !state.areTestnetsEnabled;
        },
        setDiscoveryInfo: (state, { payload }: PayloadAction<DiscoveryInfo | null>) => {
            state.discoveryInfo = payload;
        },
        toggleEnabledDiscoveryNetworkSymbol: (state, { payload }: PayloadAction<NetworkSymbol>) => {
            const networkSymbol = payload;
            const index = state.enabledDiscoveryNetworkSymbols.indexOf(networkSymbol);

            if (index !== -1) {
                // If the network is already in the list, remove it
                state.enabledDiscoveryNetworkSymbols.splice(index, 1);
            } else {
                // If the network is not in the list, add it
                state.enabledDiscoveryNetworkSymbols.push(networkSymbol);
            }
        },
    },
});

export const selectAreTestnetsEnabled = (state: DiscoveryConfigSliceRootState) =>
    state.discoveryConfig.areTestnetsEnabled;

export const selectDiscoveryInfo = (state: DiscoveryConfigSliceRootState) =>
    state.discoveryConfig.discoveryInfo;

export const selectDiscoverySupportedNetworks = memoizeWithArgs(
    (
        state: DeviceRootState & DiscoveryConfigSliceRootState,
        forcedAreTestnetsEnabled?: boolean,
    ) => {
        const areTestnetsEnabled = forcedAreTestnetsEnabled ?? selectAreTestnetsEnabled(state);

        return pipe(
            selectDeviceSupportedNetworks(state),
            networkSymbols => filterTestnetNetworks(networkSymbols, areTestnetsEnabled),
            filterUnavailableNetworks,
            filterBlacklistedNetworks,
            sortNetworks,
        );
    },
    // for all areTestnetsEnabled states
    { size: 2 },
);

export const selectDiscoveryNetworkSymbols = memoizeWithArgs(
    (
        state: DeviceRootState & DiscoveryConfigSliceRootState,
        forcedAreTestnetsEnabled?: boolean,
    ) => {
        const supportedNetworks = selectDiscoverySupportedNetworks(state, forcedAreTestnetsEnabled);

        return getNetworkSymbols(supportedNetworks);
    },
    { size: 2 },
);

export const selectEnabledDiscoveryNetworkSymbols = memoizeWithArgs(
    (
        state: DiscoveryConfigSliceRootState & DeviceRootState & FeatureFlagsRootState,
        forcedAreTestnetsEnabled?: boolean,
    ) => {
        const supportedNetworkSymbols = selectDiscoveryNetworkSymbols(
            state,
            forcedAreTestnetsEnabled,
        );
        const isCoinEnablingActive = selectIsFeatureFlagEnabled(
            state,
            FeatureFlag.IsCoinEnablingActive,
        );

        return supportedNetworkSymbols.filter(s =>
            isCoinEnablingActive
                ? state.discoveryConfig.enabledDiscoveryNetworkSymbols.includes(s)
                : true,
        );
    },
    { size: 2 },
);

export const { toggleAreTestnetsEnabled, setDiscoveryInfo, toggleEnabledDiscoveryNetworkSymbol } =
    discoveryConfigSlice.actions;
export const discoveryConfigReducer = discoveryConfigSlice.reducer;
