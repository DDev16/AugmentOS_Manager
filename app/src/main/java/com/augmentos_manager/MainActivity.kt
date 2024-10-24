package com.augmentos_manager;

import android.os.Bundle; // Import needed for onCreate method
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.WritableMap;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AugmentOS_Manager";
  }

  /**
   * Override the onCreate method and call super.onCreate with null.
   * This is necessary to enable react-native-screens for Android.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // Important to call super with null to support react-native-screens
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled].
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this, 
      getMainComponentName(),
      fabricEnabled
    );
  }
}
