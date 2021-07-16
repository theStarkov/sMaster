"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../utils/db"));

var User = _db["default"].define('user', {
  uuid: {
    type: _sequelize["default"].UUID,
    defaultValue: _sequelize["default"].UUIDV4,
    primaryKey: true
  },
  email: _sequelize["default"].STRING,
  password: _sequelize["default"].STRING,
  name: _sequelize["default"].STRING,
  deviceId: _sequelize["default"].STRING,
  soundLevel: _sequelize["default"].STRING
}); // User.sync({force: true})
//     .then(() => console.log('User table created'))


var _default = User;
exports["default"] = _default;