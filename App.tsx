import {StatusBar, Alert, Platform} from 'react-native';
import React, {useEffect} from 'react';
import Home from './src/screens/Home';
import {
  requestLocationPermission,
  requestBluetoothPermission,
  requestBluetoothScanPermission,
} from './src/util/helper';

const App = () => {
  const AppPermissions = async () => {
    try {
      const locationGranted = await requestLocationPermission();
      if (!locationGranted) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required for Bluetooth operations.',
        );
        return;
      }

      const bluetoothPermissionGranted = await requestBluetoothPermission();
      if (!bluetoothPermissionGranted) {
        Alert.alert('Permission Denied', 'Bluetooth permission is required.');
        return;
      }

      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const bluetoothScanPermissionGranted =
          await requestBluetoothScanPermission();
        if (!bluetoothScanPermissionGranted) {
          Alert.alert(
            'Permission Denied',
            'Bluetooth scan permission is required for scanning devices.',
          );
          return;
        }
      }

      console.log('All required permissions granted');
    } catch (error) {
      console.log('Error requesting permissions:', error);
    }
  };

  useEffect(() => {
    AppPermissions();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#17a8c5" />
      <Home />
    </>
  );
};

export default App;
