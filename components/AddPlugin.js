import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Weather from "../plugin/Weather"
import TimeZone from "../plugin/TimeZone"
import { SearchBar } from '../plugin/SearchBar';
import DraggableGridSort from '../components/DraggableGridSort';
import { TodoListWidget } from '../plugin/TodoListWidget';
import DailyJoke from '../plugin/DailyJoke';

export default function AddPlugin({items, setItems, setData})
{
    const allPlugins = [
        {component: null, name:"Ajouter un plugin", width: 0, height: 0}, 
        {component: Weather, name: "Météo", width: 45, height: 45}, 
        {component: TimeZone, name:"Horloge mondiale", width: 45, height: 45}, 
        {component: SearchBar, name: "Google", width: 90, height: 25}, 
        {component: TodoListWidget, name: "Liste des tâches", width: 90, height: 50}, 
        {component: DailyJoke, name: "Blague du jour", width: 90, height: 50}];
    const [pluginNumber, setPluginNumber] = useState(0);
    const [id, setId] = useState(0);
    function nextPlugin() {
        if (pluginNumber <= allPlugins.length - 1)
            setPluginNumber(pluginNumber + 1);
        if (pluginNumber == allPlugins.length - 1)
            setPluginNumber(1);        
    }

    function prevPlugin() {
        if (pluginNumber > 1)
            setPluginNumber(pluginNumber - 1);
        if (pluginNumber == 1)
            setPluginNumber(allPlugins.length - 1);        
    }

    function addPluginToHome() {
        if (pluginNumber == 0)
            return;
        const Component = allPlugins[pluginNumber].component;
        setItems((prevItems) => {
          const newItem = {
            id: prevItems.length + 1,
            label: 'Item ' + (prevItems.length + 1),
            component: <Component />,
            width_percent: allPlugins[pluginNumber].width,
            height_percent: allPlugins[pluginNumber].height,
          };
          const updatedItems = [...prevItems, newItem];
          setData(updatedItems);
          return updatedItems;
        });
      }
      

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonContent} onPress={prevPlugin}>
                        <Text style={styles.buttonText}>Prec.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={addPluginToHome}>
                        <Text style={styles.textText}>{allPlugins[pluginNumber].name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonContent} onPress={nextPlugin}>
                        <Text style={styles.buttonText}>Suiv.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        height: "100%",
        width: "15%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContent: {
        height: "50%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#114E09",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontFamily: "PassionOne",
        fontSize: 15
    },
    textContainer: {
        width: "70%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    textText: {
        textAlign: "center",
        fontFamily: "PassionOne",
        fontSize: 27
    }


})