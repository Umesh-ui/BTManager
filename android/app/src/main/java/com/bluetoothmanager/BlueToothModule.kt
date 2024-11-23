package com.bluetoothmanager

import android.bluetooth.BluetoothAdapter
import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BlueToothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    override fun getName(): String {
        return "BlueToothModule"
    }

    @ReactMethod
    fun disableBluetooth(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("Bluetooth not supported on this device")
            return
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) { // Below API 33
            if (bluetoothAdapter.isEnabled) {
                val success = bluetoothAdapter.disable()
                if (success) {
                    promise.resolve("Bluetooth disabled successfully")
                } else {
                    promise.reject("Failed to disable Bluetooth")
                }
            } else {
                promise.resolve("Bluetooth is already disabled")
            }
        } else { // API 33 and above
            try {
                val context: Context = reactApplicationContext
                val intent = Intent(android.provider.Settings.ACTION_BLUETOOTH_SETTINGS)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
                promise.resolve("Redirected to Bluetooth settings")
            } catch (e: Exception) {
                promise.reject("Error opening settings: ${e.message}")
            }
        }
    }
}
