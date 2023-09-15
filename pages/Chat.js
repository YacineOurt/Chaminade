import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { socket_io } from "../api/socket"
import ChatList from '../components/ChatList';
import { createTable } from "../api/storage"
import Community from './Community';
import * as SecureStore from 'expo-secure-store';

const Chat = ({ userToken }) => {
  const [socket, setSocket] = useState(null);
  const [isChat, setIsChat] = useState(false);

  useEffect(() => {
    setSocket(socket_io);
    createTable();
    return () => socket_io.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect_error', (err) => {
        console.log(`Connection Error: ${err.message}`);
      });
      SecureStore.getItemAsync("pushtoken")
      .then(token => socket.emit("newUser", "Jean", token))
    }
  });

  function handleChatPress() {
    setIsChat(true);
  }
  function handlePostPress() {
    setIsChat(false);
  }

  const postBottomColor = isChat ? "#88a385" : "#ffb92f";
  const chatBottomColor = isChat ? "#ffb92f" : "#88a385";

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuContainer}>
        <View style={styles.menuSelector}>
          <View style={styles.postSelector}>
            <TouchableOpacity onPress={handlePostPress}>
              <View style={styles.postText(postBottomColor)}>
                <Text style={styles.menuText}>Community</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.chatSelector}>
            <TouchableOpacity onPress={handleChatPress}>
            <View style={styles.chatText(chatBottomColor)}>
              <Text style={styles.menuText}>Chat</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {(isChat) ? (<ChatList socket={socket}></ChatList>) : (<Community socket={socket}></Community>)}
    </View>
  );
};

const styles = StyleSheet.create({
  postText: (borderColor) => ({
    borderBottomStyle: "solid",
    borderBottomColor: borderColor,
    borderBottomWidth: 3,
    paddingBottom: 10,
  }),
  chatText: (borderColor) => ({
    borderBottomStyle: "solid",
    borderBottomColor: borderColor,
    borderBottomWidth: 3,
    paddingBottom: 10,
  }),
  menuContainer: {
    height: "16%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuSelector: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%"
  },
  postSelector: {
    height: "100%",
    width: "50%",
  },
  chatSelector: {
    height: "100%",
    width: "50%",
  },
  menuText: {
    textAlign: "center",
    fontFamily: "PassionOne",
    fontSize: 25,
    color: "white",
  }
});

export default Chat;
