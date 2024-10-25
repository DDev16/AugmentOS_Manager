import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

interface ConnectedDeviceInfoProps {
  isDarkTheme: boolean;
}

const ConnectedDeviceInfo: React.FC<ConnectedDeviceInfoProps> = ({ isDarkTheme }) => {
  const [isConnected, setIsConnected] = useState(false); // Assume disconnected by default
  const [connectedGlasses, setConnectedGlasses] = useState(''); // No glasses connected by default
  const [batteryLevel, setBatteryLevel] = useState(50); // Example battery level
  const [isLoading, setIsLoading] = useState(false); // Loading state for connection

  // Simulate connecting to a device
  const handleConnect = () => {
    setIsLoading(true); // Set loading state
    setTimeout(() => {
      setIsConnected(true);
      setConnectedGlasses('inmo_air'); // Automatically set glasses type (e.g., Inmo Air)
      setIsLoading(false); // Remove loading state
    }, 2000); // Simulate delay for connecting
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectedGlasses(''); // Clear the glasses when disconnected
  };

  // Dynamic styles based on the theme
  const textColor = isDarkTheme ? '#FFFFFF' : '#333333';
  const backgroundColor = isDarkTheme ? '#333333' : '#f9f9f9';
  const statusBarBackgroundColor = isDarkTheme ? '#444444' : '#f0f0f5';
  const connectedDotColor = '#28a745';

  // Function to determine the image based on connected glasses
  const getGlassesImage = (glasses: string) => {
    switch (glasses) {
      case 'vuzix-z100':
        return require('../assets/glasses/vuzix-z100-glasses.png');
      case 'inmo_air':
        return require('../assets/glasses/inmo_air.png');
      case 'tcl_rayneo_x_two':
        return require('../assets/glasses/tcl_rayneo_x_two.png');
      case 'vuzix_shield':
        return require('../assets/glasses/vuzix_shield.png');
      default:
        return null; // No image if no glasses connected
    }
  };

  // Function to get the battery color based on the battery percentage
  const getBatteryColor = (batteryLevel: number) => {
    if (batteryLevel > 60) return '#28a745'; // Green for 61-100%
    if (batteryLevel > 20) return '#f1c40f'; // Darker yellow for 21-60%
    return '#e74c3c'; // Red for 0-20%
  };

  // Get the image and battery color
  const glassesImage = getGlassesImage(connectedGlasses);
  const batteryColor = getBatteryColor(batteryLevel);

  return (
    <View style={[styles.deviceInfoContainer, { backgroundColor }]}>
      {isConnected ? (
        <>
          {/* Render the image of the connected glasses */}
          {glassesImage && (
            <Image source={glassesImage} style={styles.glassesImage} />
          )}

          <View style={styles.connectedStatus}>
            <Text style={[styles.connectedDot, { color: connectedDotColor }]}>●</Text>
            <Text style={[styles.connectedText, { color: textColor }]}>
              Connected | {connectedGlasses.replace('_', ' ')} Glasses
            </Text>
          </View>

          <View style={[styles.statusBar, { backgroundColor: statusBarBackgroundColor }]}>
            {/* Battery Status */}
            <View style={styles.statusInfo}>
              <Text style={[styles.statusLabel, { color: textColor }]}>Battery</Text>
              <View style={styles.batteryContainer}>
                <Icon name="battery-full" size={20} color={batteryColor} style={styles.batteryIcon} />
                <Text style={[styles.batteryValue, { color: batteryColor }]}>{batteryLevel}%</Text>
              </View>
            </View>

            {/* Brightness Status */}
            <View style={styles.statusInfo}>
              <Text style={[styles.statusLabel, { color: textColor }]}>Brightness</Text>
              <Text style={[styles.statusValue, { color: textColor }]}>87%</Text>
            </View>

            {/* Disconnect Button */}
            <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
              <Icon name="power-off" size={18} color="white" style={styles.icon} />
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={[styles.connectText, { color: textColor }]}>
            {isLoading ? 'Connecting...' : 'No device connected'}
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#2196F3" />
          ) : (
            <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
              <Icon name="wifi" size={18} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deviceInfoContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  glassesImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  connectedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  connectedDot: {
    fontSize: 14,
    marginRight: 5,
  },
  connectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginTop: 10,
  },
  statusInfo: {
    alignItems: 'center',
    flex: 1,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryIcon: {
    marginRight: 5,
  },
  batteryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  connectText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '97%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  disconnectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConnectedDeviceInfo;
