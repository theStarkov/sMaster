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
app.use((req, res, next) => {
    req.io = io 
    next()
})
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

server.listen(port, () => console.log('server on ' + port))

// socket

const io = socketio(server)


io.on('connection', (socket) => {
    console.log(`${socket.id} connected successfully`)
    // socket.on('send_data', () => {
    //     genRand()
    //     setInterval(() => {
    //         socket.emit('receive_data', n)
    //     }, 3000)
    // })
})