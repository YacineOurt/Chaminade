import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function Discussion({current, socket}) {
    const [userMessage, setUserMessage] = useState('');
    //TODO: Remettre ce useState à null
    const [allMessage, setAllMessage] = useState([{
        message: "Bonjour, tu vas bien ?",
        sender: "John",
        },
        {
            message: "Bonjour, oui et toi ?",
            sender: "Jean",
        },
        {
            message: "Super !",
            sender: "John",
        },
        {
            message: "J'ai discuté avec le client et il est d'accord pour la ralonge de temps",
            sender: "John",
        },
        {
            message: "Parfait alors, sinon nous etions cuit",
            sender: "Jean",
        },
        {
            message: "C'est sûr ahah",
            sender: "John",
        }
]);
    
    useEffect(() => {
        
        socket.on('receiveMessage', (receivedMessage) => {
            setAllMessage(prevMessages => [...prevMessages, receivedMessage]);
        });
    
        return () => {
        socket.off('receiveMessage');
        };
  }, [socket]);
  
    
    function sendMessage() {
        socket.emit('sendMessage', { receiverName: current, message: userMessage });
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{current}</Text>
            </View>
            <ScrollView style={styles.conversation}>
                {allMessage && allMessage.map((_message, index) => (
                _message.sender == "Jean" ? (
                    <View key={index} style={styles.myMessageContainer}>
                        <View  style={styles.myMessage}>
                            <Text style={styles.myText}>{_message.message}</Text>
                        </View>
                    </View>
                ) : (
                    <View key={index} style={styles.otherMessageContainer}>
                        <View key={index} style={styles.otherMessage}>
                                <Text style={styles.otherText}>{_message.message}</Text>
                        </View>
                    </View>

                )
                ))}
            </ScrollView>
            <View style={styles.bottomPage}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputText} onChangeText={(a) => setUserMessage(a)} placeholder='Ecrivez ici...' />
                    <View style={styles.sendContainer}>
                        <TouchableOpacity onPress={sendMessage}>
                            <Text style={styles.sendText}>
                                Env.
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </View>
      );     
}

const styles = StyleSheet.create({
    sendContainer: {
        height: "80%",
        width: "20%",
        justifyContent: "center",
    },
    sendText: {
        fontSize: 15,

    },
    inputText: {
        height: "90%",
        width: "80%",
        marginLeft: 15,
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "40%",
        width: "90%",
        borderRadius: 55,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:"grey",
        backgroundColor: "white"
    }, 
    bottomPage:{
        height: "20%",
        width: "100%",
        alignItems: "center",
    },
    container: {
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: "column",
    },
    titleContainer: {
        width: "100%",
        height: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    conversation: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
    },
    
    title :{
        textAlign: "center",
        fontSize: 25,
        fontFamily: "PassionOne"
    },
    myMessageContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    myMessage :{
        width: "auto",
        maxWidth: "75%",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 17,
        borderBottomRightRadius: 4,
        marginRight: 10,
        marginBottom: 6
    },
    otherMessageContainer: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    otherMessage :{
        width: "auto",
        maxWidth: "75%",
        backgroundColor: "#D9D9D9",
        padding: 10,
        borderRadius: 17,
        borderBottomLeftRadius: 4,
        marginLeft: 10,
        marginBottom: 6
    },
    otherText: {
        fontSize: 19,
        color: "#232323",
    },
    myText: {
        fontSize: 19,
        color: "white",
    }
})