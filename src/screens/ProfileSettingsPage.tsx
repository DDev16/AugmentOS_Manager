import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface ProfileSettingsPageProps {
  isDarkTheme: boolean;
}

const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ isDarkTheme }) => {
  // Local state for user information
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    // Simulate updating the profile
    setTimeout(() => {
      alert('Profile updated successfully');
      setLoading(false);
    }, 1000);
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      if (uri) {
        setProfilePicture(uri); // Set the new profile picture URI
      }
    }
  };

  // Choose styles based on the theme
  const themeStyles = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>Profile Settings</Text>

      <TouchableOpacity onPress={pickImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profilePlaceholder, themeStyles.profilePlaceholder]}>
            <Text style={[styles.profilePlaceholderText, themeStyles.text]}>Pick a Profile Picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Display Name"
        placeholderTextColor={isDarkTheme ? '#AAAAAA' : '#666666'}
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Email"
        placeholderTextColor={isDarkTheme ? '#AAAAAA' : '#666666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} disabled={loading} />
      {loading && <ActivityIndicator size="large" color={isDarkTheme ? '#ffffff' : '#0000ff'} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePlaceholderText: {
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  lightTheme: {
    container: {
      backgroundColor: '#ffffff',
    },
    text: {
      color: '#000000',
    },
    profilePlaceholder: {
      backgroundColor: '#cccccc',
    },
    input: {
      borderColor: '#cccccc',
    },
  },
  darkTheme: {
    container: {
      backgroundColor: '#000000',
    },
    text: {
      color: '#ffffff',
    },
    profilePlaceholder: {
      backgroundColor: '#444444',
    },
    input: {
      borderColor: '#777777',
    },
  },
});

export default ProfileSettingsPage;
