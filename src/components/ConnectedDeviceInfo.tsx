import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

interface ConnectedDeviceInfoProps {
  isDarkTheme: boolean;
}

const ConnectedDeviceInfo: React.FC<ConnectedDeviceInfoProps> = ({ isDarkTheme }) => {
  const [isConnected, setIsConnected] = useState(false); // Assume disconnected by default
  const [connectedGlasses, setConnectedGlasses] = useState(''); // No glasses connected by default
  const [batteryLevel, setBatteryLevel] = useState(50); // Example battery level
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility

  const handleConnect = (glasses: string) => {
    setIsConnected(true);
    setConnectedGlasses(glasses); // Set the glasses type when connected
    setModalVisible(false); // Close the modal
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
              <View style={styles.batteryContainer}>
                <Icon name="battery-full" size={20} color={batteryColor} style={styles.batteryIcon} />
                <Text style={[styles.batteryValue, { color: batteryColor }]}>{batteryLevel}%</Text>
              </View>
              <Text style={[styles.statusLabel, { color: textColor }]}>Battery</Text>
            </View>

            {/* Brightness Status */}
            <View style={styles.statusInfo}>
              <Text style={[styles.statusValue, { color: textColor }]}>87%</Text>
              <Text style={[styles.statusLabel, { color: textColor }]}>Brightness</Text>
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
          <Text style={[styles.connectText, { color: textColor }]}>No device connected</Text>

          {/* Connect Button (opens the modal) */}
          <TouchableOpacity style={styles.connectButton} onPress={() => setModalVisible(true)}>
            <Icon name="wifi" size={18} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>

          {/* Modal for selecting glasses */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Glasses to Connect</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleConnect('vuzix-z100')}>
                  <Text style={styles.modalButtonText}>Vuzix Z100</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleConnect('inmo_air')}>
                  <Text style={styles.modalButtonText}>Inmo Air</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleConnect('tcl_rayneo_x_two')}>
                  <Text style={styles.modalButtonText}>TCL RayNeo X2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleConnect('vuzix_shield')}>
                  <Text style={styles.modalButtonText}>Vuzix Shield</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ConnectedDeviceInfo;
