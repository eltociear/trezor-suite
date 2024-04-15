// const TrezorConnect = require('./lib');
import TrezorConnect from './src';

const run = async () => {
    TrezorConnect.on('DEVICE_EVENT', event => {
        console.warn('DEVICE_EVENT', event);
        if (event.type === 'device-connect_unacquired') {
            TrezorConnect.getAddress({
                device: { path: event.payload.path },
                path: "m/44'/0'/0'/0/0",
            }).then(r => {
                console.warn(r);
                process.exit(1);
            });
        }
    });

    TrezorConnect.on('UI_EVENT', async event => {
        console.warn('UI_EVENT', event);
        if (event.type === 'ui-request_passphrase') {
            TrezorConnect.uiResponse({
                type: 'ui-receive_passphrase',
                payload: {
                    passphraseOnDevice: false,
                    value: 'abcd',
                    // value: '',
                },
            });
        }

        if (event.type === 'ui-request_thp_pairing') {
            // TrezorConnect.cancel();
            await new Promise(resolve => setTimeout(resolve, 2000));
            TrezorConnect.uiResponse({
                type: 'ui-receive_thp_pairing_tag',
                payload: {
                    // source: 'qr-code',
                    // value: '87e2db0f783c1b30c585000f71b7ae28',
                    source: 'code-entry',
                    value: 723282, // emu first run only
                },
            });
        }

        if (event.type === 'ui-button') {
            console.log('follow device');
        }
    });

    await TrezorConnect.init({
        manifest: { appUrl: 'a', email: 'b' },
        transports: process.argv[2] === 'udp' ? ['UdpTransport'] : ['NodeUsbTransport'],
        pendingTransportEvent: false,
        // lazyLoad: true,
        thp: {
            knownDevices: [],
            pairingMethods: [],
        },
    });

    // TrezorConnect.getAddress({ path: "m/44'/0'/0'/0/0" }).then(console.warn);
};

run();
