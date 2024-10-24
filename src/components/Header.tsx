import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  isDarkTheme: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkTheme }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownVisible(false);
  };

  const textColor = isDarkTheme ? '#FFFFFF' : '#000000'; // Adjust text color based on theme
  const dropdownBackgroundColor = isDarkTheme ? '#333333' : '#FFFFFF'; // Background color for dropdown
  const shadowColor = isDarkTheme ? '#FFFFFF' : '#000000'; // Shadow color for better visibility in dark mode

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: textColor }]}>AugmentOS</Text>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          source={require('../assets/profile-pic.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={[styles.dropdown, { backgroundColor: dropdownBackgroundColor, shadowColor }]}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={{ color: textColor }}>Settings</Text>
          </TouchableOpacity>
          {!isLoggedIn ? (
            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogin}>
              <Text style={{ color: textColor }}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
              <Text style={{ color: textColor }}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:25,
    padding: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 20,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Header;
