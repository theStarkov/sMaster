'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _db2.default.define('user', {
    uuid: {
        type: _sequelize2.default.UUID,
        defaultValue: _sequelize2.default.UUIDV4,
        primaryKey: true
    },
    email: _sequelize2.default.STRING,
    password: _sequelize2.default.STRING,
    name: _sequelize2.default.STRING,
    deviceId: _sequelize2.default.STRING,
    soundLevel: _sequelize2.default.STRING
});

// User.sync({force: true})
//     .then(() => console.log('User table created'))

exports.default = User;