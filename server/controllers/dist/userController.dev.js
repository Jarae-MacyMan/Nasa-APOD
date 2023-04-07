"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var config = require("config");

var User = require("../models/user");

var userContoller =
/*#__PURE__*/
function () {
  function userContoller() {
    _classCallCheck(this, userContoller);
  }

  _createClass(userContoller, null, [{
    key: "signinController",
    value: function signinController(req, res) {
      var _req$body, email, password, existingUser, isPasswordOk, token;

      return regeneratorRuntime.async(function signinController$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // normal-auth
              _req$body = req.body, email = _req$body.email, password = _req$body.password;

              if (!(email === "" || password === "")) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "Invalid field!"
              }));

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(User.findOne({
                email: email
              }));

            case 5:
              existingUser = _context.sent;

              if (existingUser) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                message: "User does not exist!"
              }));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(bcrypt.compare(password, existingUser.password));

            case 10:
              isPasswordOk = _context.sent;

              if (isPasswordOk) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "Invalid credintials!"
              }));

            case 13:
              token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
              }, config.get("JWT_SECRET"), {
                expiresIn: "1h"
              });
              res.status(200).json({
                result: existingUser,
                token: token
              }); // } catch (err) {
              //     res
              //         .status(500)
              //         .json({message: "Something went wrong!"})
              // }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "signupController",
    value: function signupController(req, res) {
      var _req$body2, username, email, password, existingUser, hashedPassword, result, token;

      return regeneratorRuntime.async(function signupController$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // normal form signup
              _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password; //try {

              if (!(email === "" || password === "" || username === "" && password.length >= 4)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: "Invalid field!"
              }));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(User.findOne({
                email: email
              }));

            case 5:
              existingUser = _context2.sent;

              if (!existingUser) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: "User already exist!"
              }));

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

            case 10:
              hashedPassword = _context2.sent;
              _context2.next = 13;
              return regeneratorRuntime.awrap(User.create({
                email: email,
                password: hashedPassword,
                username: username
              }));

            case 13:
              result = _context2.sent;
              token = jwt.sign({
                email: result.email,
                id: result._id
              }, config.get("JWT_SECRET"), {
                expiresIn: "1h"
              });
              res.status(200).json({
                result: result,
                token: token
              }); // } catch (err) {
              //     res
              //         .status(500)
              //         .json({message: "Something went wrong!"})
              // }

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return userContoller;
}();

module.exports = userContoller;