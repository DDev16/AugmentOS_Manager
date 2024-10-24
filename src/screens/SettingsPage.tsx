import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const SettingsPage: React.FC<{ isDarkTheme: boolean; toggleTheme: () => void }> = ({ isDarkTheme, toggleTheme }) => {
  const [isDoNotDisturbEnabled, setDoNotDisturbEnabled] = React.useState(false);
  const [isBrightnessAutoEnabled, setBrightnessAutoEnabled] = React.useState(false);

  const navigation = useNavigation(); // Use the navigation hook

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkBackground : styles.lightBackground]}>
      {/* Custom Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={isDarkTheme ? "white" : "black"} />
        <Text style={[styles.backButtonText, { color: isDarkTheme ? 'white' : 'black' }]}>Settings for Glasses</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Dark Mode</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>Toggle between light and dark mode</Text>
        </View>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme} // Call the toggleTheme function when toggled
        />
      </View>

      {/* Name of Glasses */}
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Name of Glasses</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>MYVU B0OC</Text>
        </View>
        <Icon name="angle-right" size={20} color={isDarkTheme ? '#666666' : '#333333'} />
      </TouchableOpacity>

      {/* App List */}
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>App List</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>Adjust the order of the Glasses app list</Text>
        </View>
        <Icon name="angle-right" size={20} color={isDarkTheme ? '#666666' : '#333333'} />
      </TouchableOpacity>

      {/* Standby Components */}
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Standby Components</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>Adjust the display position of standby components</Text>
        </View>
        <Icon name="angle-right" size={20} color={isDarkTheme ? '#666666' : '#333333'} />
      </TouchableOpacity>

      {/* Do Not Disturb Mode */}
      <View style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Don't Disturb mode</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>
            Glasses will not provide any notifications when enabled
          </Text>
        </View>
        <Switch
          value={isDoNotDisturbEnabled}
          onValueChange={() => setDoNotDisturbEnabled(!isDoNotDisturbEnabled)}
        />
      </View>

      {/* Automatically Adjust Brightness */}
      <View style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Automatically adjust brightness</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>
            Automatically adjust brightness of Glasses with time of sunrise and sunset
          </Text>
        </View>
        <Switch
          value={isBrightnessAutoEnabled}
          onValueChange={() => setBrightnessAutoEnabled(!isBrightnessAutoEnabled)}
        />
      </View>

      {/* Auto-Lock */}
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Auto-Lock</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>30 seconds</Text>
        </View>
        <Icon name="angle-right" size={20} color={isDarkTheme ? '#666666' : '#333333'} />
      </TouchableOpacity>

      {/* Control Audio During Screen Rest */}
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>Control audio during screen rest</Text>
          <Text style={[styles.value, { color: isDarkTheme ? '#999999' : '#666666' }]}>
            When enabled, it supports control audio during screen rest by the glasses touchpad, the phone touchpad
          </Text>
        </View>
        <Icon name="angle-right" size={20} color={isDarkTheme ? '#666666' : '#333333'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkBackground: {
    backgroundColor: '#1c1c1c',
  },
  lightBackground: {
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10, // Add padding to avoid text getting too close to the arrow
  },
  label: {
    fontSize: 16,
    flexWrap: 'wrap', // Allow the text to wrap
  },
  value: {
    fontSize: 12, // Smaller font size for descriptions
    marginTop: 5,
    flexWrap: 'wrap', // Allow text to wrap
    color: '#666666',
  },
});

export default SettingsPage;
