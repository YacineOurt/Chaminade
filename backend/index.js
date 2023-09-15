const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { Expo } = require('expo-server-sdk')

const app = express();
const server = http.createServer(app);

let expo = new Expo();

const io = new Server(server, {
  cors: {
    origin: "*"
  } 
});

const users = [];

io.on('connection', (socket) => {

  socket.on('newUser', (name, token) => {
    console.log("new user")
    users.push({ name: name, id: socket.id, push_token: token });
    console.log('New user:', name, socket.id, token);
  });

  socket.on('sendMessage', ({ receiverName, message }) => {
    console.log("message")
    const sender = users.find((user) => user.id === socket.id);
    if (!sender) {
      console.log("sender doesnt exist")
      return; 
    }
    const messageData = { sender: sender.name, message: message };
    io.to(socket.id).emit('receiveMessage', messageData);

    const receiver = users.find((user) => user.name === receiverName);
    if (!receiver) {
      console.log("receiver doesnt exist" + receiverName)
      return; 
    }
    console.log('Receiver:', receiverName, message);
    io.to(receiver.id).emit('receiveMessage', messageData);
    console.log(`Message from ${sender.name} to ${receiver.name}: ${message}`);
  });


  socket.on('sendPost', ({ title, message }) => {
    let messages = []

    if (!title || !message)
      return;
    const messageData = {title: title, message: message};
    users.forEach(user => {
      console.log("send Post", messageData);
      io.to(user.id).emit('receivePost', messageData);
      console.log(`send post ${title} to ${user.name}`);
      if (!Expo.isExpoPushToken(user.push_token)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return;
      }
    
      messages.push({
        to: user.push_token,
        sound: 'default',
        body: message,
        data: { withSome: 'data' },
      })
      console.log("sending notifications")
      expo.sendPushNotificationsAsync(messages);
    })
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const disconnectedUser = users[index];
      console.log(`User ${disconnectedUser.name} disconnected`);
      users.splice(index, 1);
    }
  });
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
