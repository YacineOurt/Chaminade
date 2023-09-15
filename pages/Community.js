import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Card from '../components/Card';

export default function Community({socket}) {
    const [post, setPost] = useState([]);
    const [userTitle, setUserTitle] = useState("");
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        if (!socket)
            return
        socket.on('receivePost', (receivedPost) => {
            setPost(prevPost => [...prevPost, receivedPost]);
        });
    
        return () => {
        socket.off('receivePost');
        };
  }, [socket]);

    function createPost() {
        socket.emit("sendPost", {title: userTitle, message: userMessage});
    }
    return(
        <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.createPostContainer}>
                <Card style={styles.inputCard}>
                    <View style={styles.cardContent}>
                        <View style={styles.titleInputContainer}>
                            <TextInput style={styles.titleInput} onChangeText={(a) => setUserTitle(a)} placeholder='Titre' />
                        </View>
                        <View style={styles.messageInputContainer}>
                            <TextInput style={styles.messageInput} onChangeText={(a) => setUserMessage(a)} placeholder='Contenue' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={createPost} style={{height: "100%", width: "15%"}}>
                                <View style={styles.buttonButton}>
                                    <Text style={styles.buttonText}>Créer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
            <View style={styles.showPostContainer}>
                {post ? (
                    post.map((_post, index) => (
                        <View key={index} style={styles.postContainer}>
                            <Card style={styles.cardContainer}>
                                <View style={styles.titleContentContainer}>
                                    <Text style={styles.titleContent}>{_post.title}</Text>
                                </View>
                                <View style={styles.messageContentContainer}>
                                    <Text style={styles.messageContent}>
                                        {_post.message}                                    
                                    </Text>
                                </View>
                            </Card>
                        </View>
                    ))
                ) : null}
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    createPostContainer: {
        height:"20%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    showPostContainer: {
        height:"80%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputCard: {
        flex: 1,
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContent: {
        flex: 1,
        margin: 5

    },
    postContainer: {
        height: "20%",
        width: "80%",
        margin: 5
    },
    cardContainer: {
        flex: 1,
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
    },
    titleInputContainer: {
        height: "20%",
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingLeft: 5
    },
    titleContentContainer: {
        height: "20%",
        width: "100%",
        paddingLeft: 5,
        paddingTop: 5

    },
    titleContent: {
        fontFamily: "PassionOneBig",
        fontSize: 18
    },
    titleInput: {
        flex: 1,
        fontSize: 20,
    },
    messageContentContainer: {
        height: "80%",
        width: "100%",
        paddingLeft: 5
    },
    messageInputContainer: {
        height: "65%",
        width: "100%",
        paddingLeft: 5
    },
    messageInput: {
        fontSize: 15,
    },
    messageContent: {
        fontFamily: "PassionOne",
        fontSize: 14,
    },
    buttonContainer: {
        height: "16%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    buttonButton: {
        height: "100%",
        width: "80%",        
        display: "flex",
        backgroundColor: "#114E09",
        borderRadius: 5,
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        fontSize: 17,
        color: "white",
        fontFamily: "PassionOne",
    }
})