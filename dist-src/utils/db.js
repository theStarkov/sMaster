"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var db = new _sequelize.Sequelize('postgres://postgres:root@localhost:5432/hdDB');
var _default = db;
exports["default"] = _default;