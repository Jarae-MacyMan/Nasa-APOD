"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var passport = require("passport");

var authRoute = require("./routes/auth");

var userRoutes = require("./routes/userRoutes");

var cookieSession = require("cookie-session");

var passportStrategy = require("./passport");

var mongoose = require('mongoose');

require("dotenv").config();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var app = express();
app.use(cookieSession({
  name: "session",
  keys: ["sjar"],
  maxAge: 24 * 60 * 60 * 100
}));
app.use(cors({
  origin: ["https://nasa-apod-rho.vercel.app", "http://localhost:3000", "http://127.0.0.1:3000", "https://nasa-apod-rho.vercel.app/signup", "https://nasa-apod-rho.vercel.app/login", "https://nasa-apod-rho.vercel.app/home"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/users", userRoutes);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
var MONGOOSE_URL = process.env.MONGOOSE_URL;
var port = process.env.PORT || 8080;
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true
}).then(function () {
  return app.listen(port, function () {
    console.log("Server is running at port ".concat(port));
  });
});
module.exports = app;