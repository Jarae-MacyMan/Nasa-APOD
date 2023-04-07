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
  res.status(401).json({
    error: true,
    message: "Log in failure"
  });
});
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "https://nasa-apod-apis.vercel.app/",
  failureRedirect: "/login/failed"
}));
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("https://nasa-apod-apis.vercel.app/");
});
module.exports = router;