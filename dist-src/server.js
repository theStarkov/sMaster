"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookieSession = require("cookie-session");

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _http = require("http");

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

require("dotenv/config");

var _db = require("./utils/db");

var _db2 = _interopRequireDefault(_db);

var _auth = require("./routes/auth");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// routes

var server = (0, _http.createServer)(app);
var port = process.env.PORT;

// test db connection
_db2.default.authenticate().then(function () {
    return console.log('DB connected successfully');
}).catch(function (err) {
    return console.log(err);
});

// middlewares
app.use(function (req, res, next) {
    req.io = io;
    next();
});
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
// app.use(cors());
app.use((0, _expressSession2.default)({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
app.use((0, _cookieParser2.default)(process.env.SECRET_KEY));

// routes
app.use('/', _auth2.default);

server.listen(port, function () {
    return console.log('server on ' + port);
});

// socket

var io = (0, _socket2.default)(server);

io.on('connection', function (socket) {
    console.log(socket.id + " connected successfully");
    // socket.on('send_data', () => {
    //     genRand()
    //     setInterval(() => {
    //         socket.emit('receive_data', n)
    //     }, 3000)
    // })
});