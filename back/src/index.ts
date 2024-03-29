import express from 'express'
import cors from 'cors'
import { userModel } from './model/User'
import { connectDataBase } from './utils/database'
import dotenv from 'dotenv'
import { user } from './router/user'
import { task } from './router/task'
dotenv.config()
const start = () => {
    const app = express()
    app.use(cors())
    app.use(express.json());
    app.use('/', user)
    app.use('/',task)
    const PORT = process.env.PORT || 8000
    connectDataBase()
    app.get('/', (req, res) => {
        res.status(200).send({ succes: true, msg: "HI" })
    })
    app.listen(PORT, () => {
        console.log(`SERVER ON , ${PORT}`);
    })
}

start()