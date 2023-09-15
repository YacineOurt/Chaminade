import React, { useState } from 'react'
import { PassionOne_400Regular } from '@expo-google-fonts/passion-one';
import { Text, View, StyleSheet, Button, FlatList, TextInput } from 'react-native';

export default function SearchBar({ onSearchChange }) {

    const handleInputChange = (text) => {
        onSearchChange(text);
      };

      const handleSubmit = () => {
      };

  return (
    <View style={styles.searchBar}>
        <View style={styles.bar}>
            <TextInput placeholder="Recherchez..." style={styles.barInput} onChangeText={handleInputChange} onSubmitEditing={handleSubmit}></TextInput>
            <Button title="Soumettre" onPress={handleSubmit} > </Button>
        </View>
        <View style={styles.filterShort}>
            <Button title="Filter" style={styles.txt}/>
            <Button title="Short" style={styles.txt}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBar : {
        flexDirection: 'row',
        paddingLeft : 25,
        paddingRight : 25,
        paddingBottom : 30
        // padding : '10px 0px 10px 0px'
    },
    filterShort : {
        // backgroundColor : 'red',
        width : "30%",
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    txt : {
        color : 'white',
        fontFamily: 'PassionOne',
        backgroundColor : 'pink',
    },
    bar: {
        width: '70%',
        height: 40,
        borderRadius : 10,
        backgroundColor: '#F8F0F7',
    },
    barInput : {
        margin : 10
    },
    
});
