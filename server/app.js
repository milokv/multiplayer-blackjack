import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js'; // 👈 path to the route you just made
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

wss.on('connection', socket => {
    console.log("A client connected!");
    socket.send("Hello from server!");


    socket.on('message', message => {
        // debugging: log when a message is received
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
