"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.genToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var genToken = function genToken(payload) {
  return _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1800s'
  });
};

exports.genToken = genToken;

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.headers['authorization']; // get token from header

  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // verify token

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, user) {
    console.error(err);
    if (err) return res.sendStatus(403); // wrong token
    // else fetch details from token

    req.user = user; // NB: to access currently logged in user, use req.user

    next();
  });
};

exports.verifyToken = verifyToken;