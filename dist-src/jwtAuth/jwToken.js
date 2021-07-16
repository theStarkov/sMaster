'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyToken = exports.genToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genToken = exports.genToken = function genToken(payload) {
    return _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1800s' });
};

var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
    var authHeader = req.headers['authorization'];

    // get token from header
    var token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    // verify token
    _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, user) {
        console.error(err);
        if (err) return res.sendStatus(403); // wrong token
        // else fetch details from token
        req.user = user;

        // NB: to access currently logged in user, use req.user
        next();
    });
};