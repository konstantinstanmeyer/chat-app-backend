const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

interface Message {
    username: string;
    message: string;
    room: string;
}

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on('connection', (socket) =>  {
    // socket.on('client-ready', () => {
    //     console.log('client-ready');
    // })

    socket.on('joinRoom', ({ username, room }) => {
        // console.log(io.sockets.adapter.rooms.has(room))
        socket.join(room);

        console.log(`${username} has join room: ${room}`)

        io.to(room).emit('error', 'working!');
    })

    socket.on('sendMessage', (message: Message) => {
        socket.to(message.room).emit('receiveMessage', { username: message.username, message: message.message });
        // socket.to("room1").emit('message', `${value.username}: ${value.message}`);
    })
})

server.listen(3001, () => {
    console.log('Listening on port 3001')
})