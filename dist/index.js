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
    socket.on('createRoom', ({ username, room }) => {
        socket.join(room);
        console.log(socket.rooms.has("room1"));
    });
    socket.on('joinRoom', ({ username, room }) => {
        console.log(io.sockets.adapter.rooms.has(room));
        socket.join(room);
        io.to(room).emit('error', 'working!');
        console.log(io.sockets.adapter.rooms.has(room));
    });
    socket.on('outgoingMessage', (value) => {
        const user = socket.id;
        io.to(user.room).emit('incomingMessage', value);
    });
});
server.listen(3001, () => {
    console.log('Listening on port 3001');
});
//# sourceMappingURL=index.js.map