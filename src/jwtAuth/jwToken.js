import jwt from 'jsonwebtoken'

export const genToken = payload => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1800s' })
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    // get token from header
    const token = authHeader && authHeader.split(' ')[1] 

    if (token == null) return res.sendStatus(401)

    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        console.error(err)
        if (err) return res.sendStatus(403) // wrong token
        // else fetch details from token
        req.user = user

        // NB: to access currently logged in user, use req.user
        next()
    })
}