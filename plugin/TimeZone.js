import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WorldClock() {
  const [timeData, setTimeData] = useState({
    'America/New_York': {
      city: 'New York',
      hour: '...',
      minute: '',
    },
    'Asia/Shanghai': {
      city: 'Shanghai',
      hour: '...',
      minute: '',
    },
    'America/Toronto': {
      city: 'Toronto',
      hour: '...',
      minute: '',
    },
    'Europe/London': {
      city: 'London',
      hour: '...',
      minute: '',
    },
  });

  useEffect(() => {
    function updateTime() {
      const now = new Date();
  
      for (const key in timeData) {
        const timeZone = key;
        const cityData = timeData[key];
        const cityTime = now.toLocaleTimeString('en-US', {
          timeZone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        });
  
        const [cityHour, cityMinute] = cityTime.split(':');
  
        const updatedCityData = {
          ...cityData,
          hour: cityHour,
          minute: cityMinute,
        };
  
        setTimeData((prevTimeData) => ({
          ...prevTimeData,
          [key]: updatedCityData,
        }));
      }
    }
  
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeData]);

  return (
    <View style={styles.container}>
      {timeData ? (
        Object.keys(timeData).map((key) => (
          <View key={key} style={styles.content}>
            <Text style={styles.cityName}>{timeData[key].city}</Text>
            <Text style={styles.time}>
              {timeData[key].hour}:{timeData[key].minute}
            </Text>
          </View>
        ))
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    height: '20%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cityName: {
    position: 'absolute',
    left: 0,
    flex: 1,
    fontSize: 18,
  },
  time: {
    position: 'absolute',
    right: 0,
    fontSize: 18,
  },
});
