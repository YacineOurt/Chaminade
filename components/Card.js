import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function Card({children, deleteItem}) {
  return (
    <View style={styles.card}>
        <View style={styles.cardBack}>
        </View>
        <View style={styles.cardFront}>
            {children}
        </View>
        {deleteItem != null ? <TouchableOpacity style={styles.remove_button} onPress={deleteItem}>
            <Text>x</Text>
        </TouchableOpacity> : null}
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        // zIndex: 2,
        height: '100%',
        width: '100%',
    },
    cardBack: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.25,
        borderRadius: 10,
        elevation: 2,
    },
    cardFront: {
        // zIndex : 1,
        position: 'absolute',
        backgroundColor: 'white',
        height: '98%',
        width: '100%',
        borderRadius: 10,
    },
    remove_button: {
        border: 1,
        borderCurve: 100,
        borderRadius: 100,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center'
        
    }

  });
