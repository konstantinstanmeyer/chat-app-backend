const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
io.on('connection', (socket) => {
    // socket.on('client-ready', () => {
    //     console.log('client-ready');
    // })
    socket.on('joinRoom', ({ username, room }) => {
        console.log(io.sockets.adapter.rooms.has(room));
        socket.join(room);
        io.to(room).emit('error', 'working!');
    });
    socket.on('outgoingMessage', (value) => {
        const user = socket.id;
        socket.join("room1");
        // io.to('room1').emit('error', 'pasiudhasd!');
        io.to("room1").emit('error', 'woah!');
        // socket.to("room1").emit('message', `${value.username}: ${value.message}`);
    });
});
server.listen(3001, () => {
    console.log('Listening on port 3001');
});
//# sourceMappingURL=index.js.map