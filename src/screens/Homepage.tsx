import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ConnectedDeviceInfo from '../components/ConnectedDeviceInfo';
import RunningAppsList from '../components/RunningAppsList';
import YourAppsList from '../components/YourAppsList';
import BluetoothManager from '../BluetoothManager';
import NavigationBar from '../components/NavigationBar';

interface HomepageProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ isDarkTheme, toggleTheme }) => {
  // State to manage the running apps
  const [runningApps, setRunningApps] = useState<string[]>([]);

  // Function to add an app to the running apps list
  const addAppToRunningApps = (appName: string) => {
    setRunningApps((prevApps) => [...prevApps, appName]); // Adds app only if it's not already running
  };

  const currentThemeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

  return (
    <View style={currentThemeStyles.container}>
      <Header isDarkTheme={isDarkTheme} />
      <ConnectedDeviceInfo isDarkTheme={isDarkTheme} />
      <RunningAppsList isDarkTheme={isDarkTheme} runningApps={runningApps} />
      <YourAppsList isDarkTheme={isDarkTheme} addAppToRunningApps={addAppToRunningApps} />
      <BluetoothManager isDarkTheme={isDarkTheme} />
      <NavigationBar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
    </View>
  );
};

// Light and dark theme styles
const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});

export default Homepage;
