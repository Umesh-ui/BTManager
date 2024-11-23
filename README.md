# Bluetooth Manager App

This is a React Native app that allows users to manage their Bluetooth connections. The app provides features to check the current Bluetooth status, enable or disable Bluetooth, and handle required permissions. It is designed to work with Android devices, including those running Android 13 (API level 33) or higher.

# Features

  # Bluetooth Management:
        Check the current Bluetooth status.
        Enable or disable Bluetooth directly from the app.

   # Permissions Handling:
        Requests location and Bluetooth permissions at runtime.
        Handles additional permissions like BLUETOOTH_SCAN for devices running Android 13+.

    # Simple UI:
        User-friendly interface to toggle Bluetooth and display its status.

 # Prerequisites

 React Native Environment: Ensure that your development environment is set up for React Native. You can follow the official guide (https://reactnative.dev/docs/environment-setup)       

 Android Device/Emulator: The app is tested on Android, including API levels 30 to 33.
 


 # Installation

 Clone the repository `git clone https://github.com/Umesh-ui/BTManager.git `
 cd BTManager

 # Install Dependencies && Run the app

 npm install
npx react-native run-android

# How to use

Grant Permissions:

    On first launch, the app will ask for location and Bluetooth permissions. Make sure to allow these permissions for the app to function correctly.

Bluetooth Status:

    The app shows whether Bluetooth is currently enabled or disabled.

Toggle Bluetooth:

    Use the button on the screen to enable or disable Bluetooth.
    For Android 13+, disabling Bluetooth will redirect you to the device settings.
    (In newer version i.e, API Level > 33 , disabling the bluetooth programatically is restricted so we have to manually redirect user to turn off the BT)
