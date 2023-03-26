const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

interface Message {
    username: string;
    message: string;
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
        console.log(io.sockets.adapter.rooms.has(room))
        socket.join(room);

        io.to(room).emit('error', 'working!');
    })

    socket.on('outgoingMessage', (value: Message) => {
        const user = socket.id
 
        io.to(user.room).emit('error', 'woah!');
        // socket.to("room1").emit('message', `${value.username}: ${value.message}`);
    })
})

server.listen(3001, () => {
    console.log('Listening on port 3001')
})