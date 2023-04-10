"use strict";

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
}); // export const signIn = (data) => API.post("/users/signin", data)
// export const signUp = (data) => API.post("/users/signup", data)