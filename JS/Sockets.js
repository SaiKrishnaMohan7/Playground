const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // emit to THAT instance so socket level emission
    socket.emit('newMessage', {
        message: 'KhullaLullaKhadaLulla',
        to: 'Client Sharma'
    });
    
    // Welcome message to new user
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome Sai Chat',
        createdAt: new Date()
    });

    // Inform other users that a new user has joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'A new User has joined up',
        createdAt: new Date()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessgae emitted from client!', message);
        // Emit message to all the sockets (users) connected
        io.emit('newMessage', {
            form: message.from,
            text: message.text,
            createdAt: new Date()
        });

        // Broadcasting - send to everyone but the one emitting the event
        socket.broadcast.emit('newMessage', {
            from: message.from,
            to: message.text,
            createdAt: new Date()
        });
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`App Listening on ${PORT}`);
});