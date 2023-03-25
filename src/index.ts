const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on('connection', (socket) =>  {
    socket.on('incoming-message', (value: string) => {
        socket.broadcast.emit('outgoing-message', value);
    })
})

server.listen(3001, () => {
    console.log('Listening on port 3001')
})