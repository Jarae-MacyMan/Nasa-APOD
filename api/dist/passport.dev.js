"use strict";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

var passport = require("passport");

require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"]
}, function (accessToken, refreshToken, profile, callback) {
  callback(null, profile);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});