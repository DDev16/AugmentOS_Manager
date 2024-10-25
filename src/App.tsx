import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusProvider } from './AugmentOSStatusProvider';
import Homepage from './screens/Homepage';
import SettingsPage from './screens/SettingsPage';
import IntroScreen from './screens/IntroScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileSettingsPage from './screens/ProfileSettingsPage';
import GlassesMirror from './screens/GlassesMirror'; // Import GlassesMirror

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <StatusProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <Homepage isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} navigation={navigation} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsPage"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <SettingsPage isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} navigation={navigation} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileSettings"
            options={{
              headerShown: true,
              title: 'Profile Settings',
              headerStyle: {
                backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
              },
              headerTintColor: isDarkTheme ? '#ffffff' : '#000000',
            }}
          >
            {({ navigation }) => (
              <ProfileSettingsPage isDarkTheme={isDarkTheme} navigation={navigation} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="GlassesMirror"
            options={{
              headerShown: false,
              title: 'Glasses Mirror',
              headerStyle: {
                backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
              },
              headerTintColor: isDarkTheme ? '#ffffff' : '#000000',
            }}
          >
            {({ navigation }) => (
              <GlassesMirror isDarkTheme={isDarkTheme} navigation={navigation} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StatusProvider>
  );
};

export default App;
