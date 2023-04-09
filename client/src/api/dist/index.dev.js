"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: "https://nasa-apod-apis.vercel.app"
});

API.interceptors.request.use(function (req) {
  if (localStorage.getItem("user_info")) {
    req.headers.Authorization = "Bearer ".concat(JSON.parse(localStorage.getItem("user_info").token));
  }

  return req;
});

var signIn = function signIn(data) {
  return API.post("/users/signin", data);
};

exports.signIn = signIn;

var signUp = function signUp(data) {
  return API.post("/users/signup", data);
};

exports.signUp = signUp;