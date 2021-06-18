import { Router } from "express"
import { genToken } from "../jwtAuth/jwToken"
import User from "../models/User"
import bcrypt from 'bcrypt'

const router = Router()

// test api request
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).send('An error occured')
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
            res.status(200).json({ resp_code: '200', resp_desc: "Login successful", token })
        } else {
            res.status(404).json({ resp_code: '403', resp_desc: "Incorrect Email or Password" })
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
                password: hashedPassword
            })
            user.save()
            const token = genToken({ user: q })
            res.status(200).json({ resp_code: '200', resp_desc: "Account created successful", token })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send("An error occured")
    }

})

export default router