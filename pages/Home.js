import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import { get_employees, get_employees_image } from "../api/index";
import DraggableGridComp from '../components/DraggableGrid';
import UserCircleBar from "../components/UserCircleBar"
import Weather from "../plugin/Weather"
import TimeZone from "../plugin/TimeZone"
import { SearchBar } from '../plugin/SearchBar';
import DraggableGridSort from '../components/DraggableGridSort';
import { TodoListWidget } from '../plugin/TodoListWidget';
import DailyJoke from '../plugin/DailyJoke';
import AddPlugin from '../components/AddPlugin';

export default function Home({ navigation, userToken }) {
  
  const [items, setItems] = useState([]);

  return (
    <View style={styles.container}>
    <UserCircleBar userToken={userToken}></UserCircleBar>
      <View style={styles.content}>
          <DraggableGridSort items={items} setItems={setItems} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  big: {
    width: "25%",
    height: "25%"
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    height: "70%",
    width: "100%",
    marginTop: 20
  },
});
