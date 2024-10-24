import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusProvider } from './AugmentOSStatusProvider'; // Import the StatusProvider
import Homepage from './screens/Homepage';
import SettingsPage from './screens/SettingsPage';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <StatusProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }} // Hide the header for Home
          >
            {() => <Homepage isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />}
          </Stack.Screen>
          <Stack.Screen
            name="SettingsPage"
            options={{ headerShown: false }} // Hide the header for SettingsPage
          >
            {() => <SettingsPage isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StatusProvider>
  );
};

export default App;
