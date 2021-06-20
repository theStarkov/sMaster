import Sequelize from 'sequelize'
import db from '../utils/db'

const User = db.define('user', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    deviceId: Sequelize.STRING,
    soundLevel: Sequelize.STRING, 
})

// User.sync({force: true})
//     .then(() => console.log('User table created'))

export default User