"use strict";

var GoogleStrategy = require("passport-google-oauth20").Strategy;

var passport = require("passport");

passport.use(new GoogleStrategy({
  clientID: "273432669620-a626u4eecqsrpn6hgd203ldurak49pcp.apps.googleusercontent.com",
  clientSecret: "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",
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