const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, removeUser, getUsers, getUser } = require('./Users');
var name;

io.on('connection', function(socket){

  name = "User" + Math.floor(1000 + Math.random() * 9000);
  const { user } = addUser({ id: socket.id, name: name});
  console.log(user);

  io.emit('activeUsers', { users : getUsers()});


  var name = user.name;
  var adminMessage =  {message: name + " has joined the chat."};
  io.emit('messages', { user: 'admin', text: adminMessage });

  socket.on('sendMessage', (message) => {
    var user = getUser(socket.id);

    io.emit('messages', { user: user.name, text: message });
  
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);  
    console.log("DIsconnect");
    console.log(user);
    console.log(getUsers());
  });

});

server.listen(PORT, function(){
  console.log("Listening on 5000");
});
