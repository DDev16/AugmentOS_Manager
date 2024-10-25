import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavigationBar from '../components/NavigationBar';

interface Card {
  id: number;
  name: string;
  title: string;
  content: string;
}

interface GlassesMirrorProps {
  isDarkTheme: boolean;
}

const GlassesMirror: React.FC<GlassesMirrorProps> = ({ isDarkTheme }) => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: 'Convoscope', title: 'Conversation Log', content: 'Last 10 minutes of conversation displayed.' },
    { id: 2, name: 'ADHD Assist', title: 'Daily Reminder', content: 'Don’t forget to take a 10-minute break.' },
    { id: 3, name: 'Translator', title: 'Translation', content: 'Translating from English to French...' },
  ]);

  const [liveCard, setLiveCard] = useState<Card | null>(cards[cards.length - 1]);

  useEffect(() => {
    // Simulate adding new cards over time, as if they were mirrored live from the glasses
    const interval = setInterval(() => {
      const newCard = {
        id: cards.length + 1,
        name: 'New App',
        title: 'New Live Data',
        content: `Live data content at ${new Date().toLocaleTimeString()}`,
      };
      console.log('Adding new card:', newCard);

      setCards((prevCards) => {
        const updatedCards = [...prevCards, newCard];
        setLiveCard(newCard); // Update the live card to the latest one
        return updatedCards;
      });
    }, 5000); // Add a new card every 5 seconds to simulate live updates

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [cards]);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>AugmentOS Glasses Mirror</Text>

      {/* Mirrored Screen Area */}
      <View style={[styles.mirrorArea, isDarkTheme ? styles.darkMirrorArea : styles.lightMirrorArea]}>
        <Image
          source={{ uri: 'https://g.foolcdn.com/editorial/images/471114/ar-glasses-first-person.jpg' }}
          style={styles.mirrorImage}
        />
      </View>

      {/* Historical Timeline Below */}
      <ScrollView style={styles.scrollView}>
        {cards.map((card) => (
          <TouchableOpacity key={card.id} style={[styles.card, isDarkTheme ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardName, isDarkTheme ? styles.darkText : styles.lightText]}>{card.name}</Text>
            <Text style={[styles.cardTitle, isDarkTheme ? styles.darkText : styles.lightText]}>{card.title}</Text>
            <Text style={[styles.cardContent, isDarkTheme ? styles.darkText : styles.lightText]}>{card.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <NavigationBar isDarkTheme={isDarkTheme} />

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightContainer: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  mirrorArea: {
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkMirrorArea: {
    backgroundColor: '#1c1c1e',
  },
  lightMirrorArea: {
    backgroundColor: '#4a90e2',
  },
  mirrorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1c1c1e',
  },
  lightCard: {
    backgroundColor: '#ffffff',
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
  },
});

export default GlassesMirror;
