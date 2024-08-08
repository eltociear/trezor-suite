# Master Deeplink Example

## Dev tips

-   Use `uri-scheme` to trigger deeplinks in the app form terminal

```bash
npx uri-scheme open exp://192.168.87.157:8081/--/settings?somedata=blablameow\&test=ahoj --android
```

Or use `adb`:

```bash
adb shell am start -a android.intent.action.VIEW -d "exp://192.168.87.157:8081/--/settings?userId=123\&token=abc123\&redirectUrl=https://example.com"
```

## Findings

1. I have not found limits in the data that can be passed as query param.
2. In order to receive the client app should be also able to receive DeepLinks so callback deeplink can be passed in the initial call.
    - 3rd party integrator deeplink like trezor-suite://trezor-connect?method=signTx&amount=3000
