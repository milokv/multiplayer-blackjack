import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupWebSocket } from './ws.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// only allow requests from localhost and my domain
app.use(cors({
    origin: ['http://localhost:5173', 'http://lozteca.com', 'https://lozteca.com'],
}));
app.use(express.json());
app.use('/api/users', usersRouter);

const wss = new WebSocketServer({ server });
setupWebSocket(wss);


app.get('/', (req, res) => res.send("API working"));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.error("Mongo error:", err));

server.listen(process.env.PORT || 3001, () => {
    console.log("Server running");
});
