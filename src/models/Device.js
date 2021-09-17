import Sequelize from 'sequelize'
import db from '../utils/db'

const Device = db.define('device', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
    deviceId: Sequelize.STRING,
    activated: Sequelize.BOOLEAN,
   
})

// Device.sync({alter: true}) 
//     .then(() => console.log('Device table created....')) 

export default Device 