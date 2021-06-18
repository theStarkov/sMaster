import express from 'express'
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import session from 'express-session'

import 'dotenv/config'
import db from './utils/db';

// routes
import authRouter from './routes/auth'

const app = express()
const port = process.env.PORT

// test db connection
db.authenticate()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err))

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser(process.env.SECRET_KEY))

// routes
app.use('/', authRouter)

app.listen(port, () => console.log(`App running on ${port}`))