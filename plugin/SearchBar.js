import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

export const SearchBar = () => {
    const [text, setText] = useState("")

    return (
        <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} onChangeText={setText} placeholder='Search'></TextInput>
            <TouchableOpacity onPress={() => { Linking.openURL("https://google.com/search?q=" + encodeURI(text)) }}>
                <Image source={{uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"}} style={styles.googleImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      padding: '5%',
      display: 'flex',
      justifyContent: 'center',
    },
    googleImage: {
        paddingLeft: '5%',
        width: 40,
        height: 40,
    },
    searchBar: {
        height: '100%',
        width: '85%',
        paddingLeft: '5%',
        marginRight: 'auto',
    },
    searchBarContainer: {
        flexDirection:'row',
        border:1,
        width: '90%',
        height: '43%',
        borderWidth: 2,
        borderStartColor: 'grey',
        borderBottomColor: 'grey',
        borderTopColor: 'grey',
        borderRightColor: 'grey',
        borderRadius: 200,
        borderColor: '#0000',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 'auto',
        alignContent: 'center',
        position: 'relative',
    }
  });