import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types'; // Import your types

// Define the type for navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SettingsPage'>;

interface NavigationBarProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isDarkTheme }) => {
  const navigation = useNavigation<NavigationProp>(); // Use typed navigation object
  const iconColor = isDarkTheme ? '#FFFFFF' : '#000000';

  const handleSettingsPress = () => {
    navigation.navigate('SettingsPage'); // Navigate to the Settings screen
  };

  return (
    <View style={styles.navBarContainer}>
      <Icon name="home" size={30} color={iconColor} />
      <Icon name="tv" size={30} color={iconColor} />
      <TouchableOpacity onPress={handleSettingsPress} style={styles.iconWrapper}>
        <Icon name="cog" size={30} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginBottom: 50,
  },
  iconWrapper: {
    alignItems: 'center',
  },
});

export default NavigationBar;
