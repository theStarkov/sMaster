import express from 'express'
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { createServer } from 'http';
import session from 'express-session'
import socketio from 'socket.io'

import 'dotenv/config'
import db from './utils/db';

// routes
import authRouter from './routes/auth'

const app = express()
const server = createServer(app)
const port = process.env.PORT

// test db connection
db.authenticate()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err))

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(cors());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser(process.env.SECRET_KEY))

// routes
app.use('/', authRouter)

// socket

const io = socketio(server)
var n = 0;

setInterval(() => {
    n = n + 1
    console.log(n)
}, 2000)

io.on('connection', (socket) => {
    console.log('Socket connected')

    socket.on('send_data', () => {
        socket.emit('receive_data', n)
    })
})

server.listen(port, () => console.log('server on ' + port))