const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
    console.log("A client connected!");
    socket.send("Hello from server!");


    socket.on('message', message => {
        console.log("Received message:", message.toString());
        socket.send("Message received");
    });
});


app.get('/', (req, res) => res.send("API working"));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.error("Mongo error:", err));

server.listen(process.env.PORT || 3001, () => {
    console.log("Server running");
});
