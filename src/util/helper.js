import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const checkLocationPermission = async () => {
  try {
    const permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    return permissionStatus;
  } catch (error) {
    console.log('Error checking location permission:', error);
    return RESULTS.BLOCKED;
  }
};

export const requestLocationPermission = async () => {
  try {
    const permissionStatus = await checkLocationPermission();
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Location permission is already granted');
      return true;
    } else {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Location permission request result:', result);
      return result === RESULTS.GRANTED;
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
    return false;
  }
};

export const requestBluetoothPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    console.log('Bluetooth permission request result:', result);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.log('Error requesting Bluetooth permission:', error);
    return false;
  }
};

export const requestBluetoothScanPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    console.log('Bluetooth scan permission request result:', result);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.log('Error requesting Bluetooth scan permission:', error);
    return false;
  }
};
