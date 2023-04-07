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
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use("/auth", authRoute);
app.use("/users", userRoutes);
var MONGOOSE_URL = "mongodb+srv://sjaraebr:T1m3K1lz@apodcluster.gpflfzk.mongodb.net/apodApp?retryWrites=true&w=majority";
var port = process.env.PORT || 8080;
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true
}).then(function () {
  return app.listen(port, function () {
    console.log("Server is running at port ".concat(port));
  });
});