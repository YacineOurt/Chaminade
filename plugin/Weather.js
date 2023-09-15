import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=50.62&longitude=03.05&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';

const WeatherComponent = () => {
    const [temperature, setTemperature] = useState(null);
    const [message, setMessage] = useState({});
    const [wind, setWind] = useState(null);


    function getMessage(code) {
        if (code <= 19)
            return {text: "Il fait beau aujourd'hui !",
                    emoji: "☀️"}
        if (code > 19 && code <= 29)
            return {text: "L'eau sa mouille",
                    emoji: "🌧️"}
        if (code > 29 && code <= 49)
            return {text: "La tête dans les nuages",
                    emoji: "🌁"}
        if (code > 49 && code <= 69)
            return {text: "Grosse tempête !",
                   emoji: "🌧️"}
        if (code > 69 && code <= 79)
            return {text: "C'est beau !",
                    emoji: "🌨️"}
        if (code > 79 && code <= 99)
            return {text: "Quelques goutelettes",
                    emoji: "🌦️"}
    }
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_URL);
        const currentWeather = response.data.current_weather;
        setTemperature(currentWeather.temperature);
        setWind(currentWeather.windspeed);
        setMessage(getMessage(currentWeather.weathercode));
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo :', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.townContainer}>
            <Text style={styles.townText}>Lille</Text>
        </View>
        <View style={styles.imageContainer}>
            <Text>{message != null ? 
                <Text style={styles.emoji}>{message.emoji}</Text> : 
                <Text>Chargement...</Text>}</Text>
        </View>
        <View style={styles.temperatureContainer}>
            {temperature != null ? 
            <Text style={styles.temperatureText}>{temperature}°C</Text> : 
            <Text>Chargement...</Text>}
        </View>
        <View style={styles.messageContainer}>
            {message != null ? 
            <Text style={styles.messageText}>{message.text}</Text> : 
            <Text>Chargement...</Text>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  townContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    },
  townText: {
    textAlign: "center",
    fontSize: 20
  },
  infoContainer: {
    height: "80%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    textAlign: "center",
    fontSize: 50
  },
  temperatureContainer: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureText: {
    marginTop: 5,
    fontSize: 25,
    textAlign: "center"
  },
  messageContainer: {
    height: "15%",
    width: "100%",
  },
  messageText: {
    fontSize: 10,
    textAlign: "center"
  }

});

export default WeatherComponent;
