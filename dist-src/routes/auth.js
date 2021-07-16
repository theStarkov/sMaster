"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _jwToken = require("../jwtAuth/jwToken");

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _runtime = _interopRequireDefault(require("regenerator-runtime/runtime"));

var router = (0, _express.Router)(); // test api request

router.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_runtime["default"].mark(function _callee(req, res) {
    var users;
    return _runtime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findAll();

          case 3:
            users = _context.sent;
            res.status(200).json(users);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(500).send('An error occured'));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // login 

router.post('/login', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_runtime["default"].mark(function _callee2(req, res) {
    var q, token;
    return _runtime["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              where: {
                email: req.body.email
              }
            });

          case 3:
            q = _context2.sent;
            _context2.t0 = q;

            if (!_context2.t0) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return _bcrypt["default"].compare(req.body.password, q.password);

          case 8:
            _context2.t0 = _context2.sent;

          case 9:
            if (!_context2.t0) {
              _context2.next = 14;
              break;
            }

            // correct details, login
            token = (0, _jwToken.genToken)({
              user: q
            });
            return _context2.abrupt("return", res.status(200).json({
              resp_code: '200',
              resp_desc: "Login successful",
              token: token
            }));

          case 14:
            return _context2.abrupt("return", res.status(404).json({
              resp_code: '403',
              resp_desc: "Incorrect Email or Password"
            }));

          case 15:
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t1 = _context2["catch"](0);
            console.error(_context2.t1);
            res.status(500).send("An Error Occured");

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // register

router.post('/register', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_runtime["default"].mark(function _callee3(req, res) {
    var q, hashedPassword, user, token;
    return _runtime["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findOne({
              where: {
                email: req.body.email
              }
            });

          case 3:
            q = _context3.sent;

            if (!q) {
              _context3.next = 8;
              break;
            }

            res.status(404).json({
              resp_code: '403',
              resp_desc: "Account already exists"
            });
            _context3.next = 16;
            break;

          case 8:
            _context3.next = 10;
            return _bcrypt["default"].hash(req.body.password, 10);

          case 10:
            hashedPassword = _context3.sent;
            user = new _User["default"]({
              email: req.body.email,
              password: hashedPassword,
              name: req.body.name,
              deviceId: req.body.deviceId,
              soundLevel: '0'
            });
            user.save();
            console.log(user);
            token = (0, _jwToken.genToken)({
              user: q
            });
            res.status(200).json({
              resp_code: '200',
              resp_desc: "Account created successful",
              token: token
            });

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            res.status(500).send("An error occured");

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // update user soundLevel

router.put('/update-sound-level', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_runtime["default"].mark(function _callee4(req, res, next) {
    var _req$body, id, soundLevel, user;

    return _runtime["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, soundLevel = _req$body.soundLevel; // NB: id is device id

            console.log(soundLevel);
            _context4.prev = 2;
            _context4.next = 5;
            return _User["default"].findOne({
              where: {
                deviceId: id
              }
            });

          case 5:
            user = _context4.sent;

            if (!user) {
              _context4.next = 12;
              break;
            }

            user.soundLevel = soundLevel;
            _context4.next = 10;
            return user.save();

          case 10:
            // emit socket
            req.io.emit('receive_data', soundLevel);
            return _context4.abrupt("return", res.status(200).json(user));

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0);
            res.status(500).send("An error occured");

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 14]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;