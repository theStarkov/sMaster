import { Router } from "express"
import { genToken } from "../jwtAuth/jwToken"
import User from "../models/User"
import bcrypt from 'bcrypt'
import regeneratorRuntime from 'regenerator-runtime/runtime'

const router = Router()

// test api request
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        return res.status(500).send('An error occured')
    }
})

// login 
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const q = await User.findOne({ where: { email: req.body.email } })

        // check if account exists, then validate password
        if (q && await bcrypt.compare(req.body.password, q.password)) {
            // correct details, login
            const token = genToken({ user: q })
            return res.status(200).json({ resp_code: '200', resp_desc: "Login successful", token, user: {name: q.name, email: q.email, deviceId: q.deviceId, soundLevel: q.soundLevel} })
        } else {
            return res.status(404).json({ resp_code: '403', resp_desc: "Incorrect Email or Password" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).send("An Error Occured")
    }
})

// register
router.post('/register', async (req, res) => {
    try {
        // check if user exists
        const q = await User.findOne({ where: { email: req.body.email } })

        // check if user already exists
        if (q) { res.status(404).json({ resp_code: '403', resp_desc: "Account already exists" }) }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                deviceId: req.body.deviceId,
                soundLevel: '0'
            })
            user.save()
            console.log(user)
            const token = genToken({ user: q })
            res.status(200).json({ resp_code: '200', resp_desc: "Account created successful", token })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send("An error occured")
    }

})

// update user soundLevel
router.put('/update-sound-level', async(req, res, next) => {
    const { id, soundLevel } = req.body // NB: id is device id
    console.log(soundLevel)

    try {
        // find user who's device id is equal to id
        const user = await User.findOne({ where: { deviceId: id } })

        if (user) {
            user.soundLevel = soundLevel
            await user.save()
            
            const data = {soundLevel}
            // emit socket
            req.io.emit('receive_data', data)
            return res.status(200).json(user)
        }

    } catch (err) {
        console.error(err)
        res.status(500).send("An error occured")
    }
})

export default router
