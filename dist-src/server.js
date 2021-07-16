"use strict";

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cookieSession = _interopRequireDefault(require("cookie-session"));

var _cors = _interopRequireDefault(require("cors"));

var _http = require("http");

var _expressSession = _interopRequireDefault(require("express-session"));

var _socket = _interopRequireDefault(require("socket.io"));

require("dotenv/config");

var _db = _interopRequireDefault(require("./utils/db"));

var _auth = _interopRequireDefault(require("./routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes
var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
var port = process.env.PORT; // test db connection

_db["default"].authenticate().then(function () {
  return console.log("DB connected successfully on $Date()");
})["catch"](function (err) {
  return console.log(err);
}); // middlewares


app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // app.use(cors());

app.use((0, _expressSession["default"])({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use((0, _cookieParser["default"])(process.env.SECRET_KEY)); // routes

app.use('/', _auth["default"]);
server.listen(port, function () {
  return console.log('server on ' + port);
}); // socket

var io = (0, _socket["default"])(server);
io.on('connection', function (socket) {
  console.log("".concat(socket.id, " connected successfully")); // socket.on('send_data', () => {
  //     genRand()
  //     setInterval(() => {
  //         socket.emit('receive_data', n)
  //     }, 3000)
  // })
});