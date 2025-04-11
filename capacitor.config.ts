import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'btn_panic',
    webDir: 'www',
    plugins: {
        SplashScreen: {
            launchShowDuration: 0,
            launchAutoHide: true,
            backgroundColor: '#9ae600',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
            androidSpinnerStyle: 'large',
            iosSpinnerStyle: 'small',
            spinnerColor: '#999999',
            splashFullScreen: false,
            splashImmersive: false,
            layoutName: 'launch_screen',
            useDialog: false,
        },
        Keyboard: {
            resize: 'ionic' as any, // o 'ionic'
            resizeOnFullScreen: true,
        },
    },
}

export default config
