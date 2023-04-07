require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/userRoutes")
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const mongoose = require('mongoose')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();



app.use(
	cookieSession({
		name: "session",
		keys: ["sjar"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use("/auth", authRoute);
app.use("/users", userRoutes)


const MONGOOSE_URL = "mongodb+srv://sjaraebr:T1m3K1lz@apodcluster.gpflfzk.mongodb.net/apodApp?retryWrites=true&w=majority"


const port = process.env.PORT || 8080;


mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
  .then(()=> app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
}))