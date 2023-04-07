"use strict";

var express = require("express");

var userContoller = require("../controllers/userController");

var router = express.Router();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json(); // var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/signin", jsonParser, userContoller.signinController);
router.post("/signup", jsonParser, userContoller.signupController);
router.get("/is-verified", jsonParser, userContoller.getVerified);
module.exports = router;