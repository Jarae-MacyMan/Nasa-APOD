"use strict";

var router = require("express").Router();

var passport = require("passport");

router.get("/login/success", function (req, res) {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized"
    });
  }
});
router.get("/login/failed", function (req, res) {
  // res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // // another common pattern
  // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // )
  res.status(401).json({
    error: true,
    message: "Log in failure"
  });
});
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "https://nasa-apod-rho.vercel.app",
  failureRedirect: "/login/failed"
}));
router.get("/logout", function (req, res) {
  //  res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // // another common pattern
  // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  // res.setHeader(
  // 	'Access-Control-Allow-Headers',
  // 	'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // )
  req.logout();
  res.redirect("https://nasa-apod-rho.vercel.app");
});
module.exports = router;