import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

interface RunningAppsListProps {
  isDarkTheme: boolean;
  runningApps: string[]; // List of running apps as a prop
}

const RunningAppsList: React.FC<RunningAppsListProps> = ({ isDarkTheme, runningApps }) => {
  const textColor = isDarkTheme ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkTheme ? '#333333' : '#f0f0f5';

  // Function to get the app image based on the app name
  const getAppImage = (appName: string) => {
    switch (appName) {
      case 'Convoscope':
        return require('../assets/convoscope.png');
      case 'ADHD Assist':
        return require('../assets/adhd-aid.png');
      case 'Translator':
        return require('../assets/translator.png');
      case 'Placeholder':
        return require('../assets/placeholder.png');
      default:
        return null;
    }
  };

  // Show 4 apps, and then show a +X counter for remaining apps
  const visibleApps = runningApps.slice(0, 4);
  const remainingAppCount = runningApps.length - visibleApps.length;

  return (
    <View style={[styles.appsContainer, { backgroundColor }]}>
      {/* Header with "See the casting" */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Running Apps</Text>
        <TouchableOpacity onPress={() => {/* Add your navigation logic here for "See the casting" */}}>
          <Text style={[styles.seeAllText, { color: '#007AFF' }]}>See the casting</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../assets/gradient-background.png')}
        style={styles.gradientBackground}
        imageStyle={styles.gradientImage}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.appIconsContainer}>
            {/* Show 4 apps with consistent sizes */}
            {visibleApps.map((app, index) => (
              <View key={index} style={styles.appIconWrapper}>
                <Image source={getAppImage(app)} style={styles.appIcon} />
              </View>
            ))}

            {/* Counter for remaining apps */}
            {remainingAppCount > 0 && (
              <View style={styles.remainingAppWrapper}>
                <Text style={styles.remainingAppText}>+{remainingAppCount}</Text>
              </View>
            )}
          </View>

          {/* Arrow at the end */}
          <View style={styles.arrowWrapper}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  appsContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gradientBackground: {
    padding: 15,
    borderRadius: 25,
  },
  gradientImage: {
    borderRadius: 25,
  },
  appIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 40,
    height: 40,
  },
  appIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  remainingAppWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  remainingAppText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  arrowWrapper: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#007AFF',
  },
});

export default RunningAppsList;
