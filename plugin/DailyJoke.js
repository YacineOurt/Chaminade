import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Suppression des imports non utilisés
import axios from 'axios';

const apiUrl = 'https://www.blagues-api.fr/api/random?disallow=dark&disallow=limit&disallow=beauf&disallow=blondes';

export default function DailyJoke() {
  const [beginJoke, setBeginJoke] = useState('');
  const [nextJoke, setNextJoke] = useState('');
  const [isNextJokeVisible, setIsNextJokeVisible] = useState(false);

  useEffect(() => {
    newJoke();
  }, []);

  async function showNext() {
    setIsNextJokeVisible(true);
  }

  async function newJoke() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_JOKE_API_KEY}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      setBeginJoke(response.data.joke); // Correction : utilisez response.data pour accéder aux données de la réponse
      setNextJoke(response.data.answer); // Correction : utilisez response.data pour accéder aux données de la réponse
      setIsNextJokeVisible(false);
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message); // Affichez le message d'erreur
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.beginJokeContainer}>
        <Text style={styles.dailyJoke}>Daily joke</Text>
        <Text style={styles.beginJokeText}>{beginJoke}</Text>
      </View>
      <View style={styles.nextJokeContainer}>
        {!isNextJokeVisible ? (
          <TouchableOpacity onPress={showNext}>
            <Text>Cliquez ici pour voir la suite...</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.nextJokeText}>{nextJoke}</Text>
        )}
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={newJoke} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Suivante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beginJokeContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  dailyJoke: {
    textAlign: 'left',
    fontFamily: 'PassionOne',
  },
  beginJokeText: {
    fontSize: 23,
    fontFamily: 'PassionOneBig',
  },
  nextJokeContainer: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextJokeText: {
    fontSize: 20,
    fontFamily: 'PassionOne',
  },
  buttonSection: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
  },
  buttonTouchable: {
    flex: 1, 
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#114E09',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'PassionOne',
    color: 'white',
    textAlign: 'center',
  },
});
