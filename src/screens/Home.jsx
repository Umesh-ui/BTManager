import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  AppState,
  Platform,
  StyleSheet,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {NativeModules} from 'react-native';

const Home = () => {
  const {BlueToothModule} = NativeModules;
  const [enableBluetooth, setEnableBluetooth] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const checkBlueToothStatus = async () => {
    try {
      const isEnabled = await BleManager.checkState();
      setEnableBluetooth(isEnabled === 'on');
      console.log('Current Bluetooth State:', isEnabled);
    } catch (error) {
      console.log('Error checking the Bluetooth state:', error);
    }
  };

  useEffect(() => {
    checkBlueToothStatus();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground');
        checkBlueToothStatus(); // Re-check Bluetooth status
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const turnBtOn = async () => {
    try {
      const btStatus = await BleManager.enableBluetooth();
      console.log('Bluetooth Enabled:', btStatus);
      setEnableBluetooth(true);
    } catch (error) {
      console.log('Error Enabling Bluetooth:', error);
    }
  };

  const turnBtOff = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        Alert.alert(
          'Redirecting to Settings',
          'Due to system restrictions, please disable Bluetooth manually in settings.',
          [{text: 'OK', onPress: () => BlueToothModule.disableBluetooth()}],
        );
      } else {
        const status = await BlueToothModule.disableBluetooth();
        setEnableBluetooth(false);
        console.log('bt status', status);

        Alert.alert('Success', 'Bluetooth disabled successfully');
      }
    } catch (error) {
      console.log('Error Disabling Bluetooth:', error);
    }
  };

  const toggleBluetooth = () => {
    if (enableBluetooth) {
      turnBtOff();
    } else {
      turnBtOn();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 30, fontSize: 30}}>
        Bluetooth is {enableBluetooth ? 'Enabled' : 'Disabled'}
      </Text>
      <TouchableOpacity onPress={toggleBluetooth} style={styles.toggleBtn}>
        <Text style={styles.textStyle}>
          {enableBluetooth ? 'Disable' : 'Enable'} Bluetooth
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  toggleBtn: {
    paddingHorizontal: 10,
    backgroundColor: '#17a8c5',
    padding: 10,
    borderRadius: 20,
  },
  textStyle: {fontSize: 20, color: '#fff', fontWeight: '600'},
});
