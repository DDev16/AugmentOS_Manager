import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

interface IntroScreenProps {
  navigation: any; // Add typing for navigation if needed
}

const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('Register'); // Navigate to the Register page
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/AOS.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to AugmentOS</Text>
      <Text style={styles.subtitle}>The future of smart glasses starts here</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login / Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#40e0d0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#40e0d0', // Turquoise shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IntroScreen;
