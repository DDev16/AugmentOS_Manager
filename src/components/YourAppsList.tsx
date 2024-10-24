import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

interface YourAppsListProps {
  isDarkTheme: boolean;
  addAppToRunningApps: (appName: string) => void; // Pass down the function to add apps
}

const YourAppsList: React.FC<YourAppsListProps> = ({ isDarkTheme, addAppToRunningApps }) => {
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
      {/* Title with See all link */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Your Apps (12)</Text>
        <TouchableOpacity onPress={() => {/* Add your navigation logic here for the 'See all' action */}}>
          <Text style={[styles.seeAllText, { color: '#007AFF' }]}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.appIconsContainer}>
          <TouchableOpacity onPress={() => addAppToRunningApps('Convoscope')}>
            <View style={styles.appIconWrapper}>
              <Image source={require('../assets/convo-rectangle.png')} style={styles.appIcon} />
              <Text style={[styles.appLabel, { color: appLabelColor }]}>Convoscope</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => addAppToRunningApps('ADHD Assist')}>
            <View style={styles.appIconWrapper}>
              <Image source={require('../assets/adhd-rectangle.png')} style={styles.appIcon} />
              <Text style={[styles.appLabel, { color: appLabelColor }]}>ADHD Assist</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => addAppToRunningApps('Translator')}>
            <View style={styles.appIconWrapper}>
              <Image source={require('../assets/translator-rectangle.png')} style={styles.appIcon} />
              <Text style={[styles.appLabel, { color: appLabelColor }]}>Translator</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => addAppToRunningApps('Placeholder')}>
            <View style={styles.appIconWrapper}>
              <Image source={require('../assets/placeholder.png')} style={styles.appIcon} />
              <Text style={[styles.appLabel, { color: appLabelColor }]}>Placeholder</Text>
            </View>
          </TouchableOpacity>
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
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  appIconsContainer: {
    flexDirection: 'row',
    width: width, // Make sure the width is equal to screen width for pagination
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
