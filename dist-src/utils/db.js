'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var db = new _sequelize.Sequelize('postgres://postgres:root@localhost:5432/hdDB');

exports.default = db;