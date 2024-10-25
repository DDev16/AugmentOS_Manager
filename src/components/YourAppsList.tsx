import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

interface YourAppsListProps {
  isDarkTheme: boolean;
  addAppToRunningApps: (appName: string) => void; // Pass down the function to add apps
  installedApps: { name: string; icon: any }[]; // List of installed apps with name and icon
}

const YourAppsList: React.FC<YourAppsListProps> = ({ isDarkTheme, addAppToRunningApps, installedApps }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const activePageIndex = Math.round(scrollPosition / width);
    setActiveIndex(activePageIndex);
  };

  // Dynamic text color and pagination dot color based on the theme
  const textColor = isDarkTheme ? '#FFFFFF' : '#000000';
  const dotColor = isDarkTheme ? '#FFFFFF' : '#000000';
  const appLabelColor = isDarkTheme ? '#C0C0C0' : '#6c757d'; // Slight grey difference for light/dark

  return (
    <View style={styles.appsContainer}>
      {/* Title with dynamic number of installed apps */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Your Apps ({installedApps.length})
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.appIconsContainer, { width: installedApps.length * 80 }]}>
          {installedApps.map((app, index) => (
            <TouchableOpacity key={index} onPress={() => addAppToRunningApps(app.name)}>
              <View style={styles.appIconWrapper}>
                <Image source={app.icon} style={styles.appIcon} />
                <Text style={[styles.appLabel, { color: appLabelColor }]}>{app.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === 0 && styles.elongatedDot, // Apply elongated style for the first dot
              activeIndex === index && styles.activeDot, // Apply active style conditionally
              { backgroundColor: dotColor }, // Apply dynamic dot color
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appsContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appIconsContainer: {
    flexDirection: 'row',
    // The width will now be dynamically calculated based on the number of apps
  },
  appIconWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 12, // Slightly rounded edges for a more square-like look
  },
  appLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    opacity: 0.3, // Default opacity for inactive dots
  },
  activeDot: {
    opacity: 1, // Active dot has full opacity
  },
  elongatedDot: {
    width: 18, // Make the first dot elongated
    borderRadius: 10, // Slightly more rounded
  },
});

export default YourAppsList;
