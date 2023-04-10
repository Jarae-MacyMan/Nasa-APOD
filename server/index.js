require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/userRoutes")
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const mongoose = require('mongoose')
require("dotenv").config()

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

app.use(
	cors({
		origin: ["https://nasa-apod-rho.vercel.app", "http://localhost:3000", "http://127.0.0.1:3000"],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(cors(corsOptions))


app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRoute);
app.use("/users", userRoutes)

app.get('/', (req, res) => {
	res.send('Hello World!')
  })


const MONGOOSE_URL = process.env.MONGOOSE_URL


const port = process.env.PORT || 8080;


mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
  .then(()=> app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
}))

module.exports = app;