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
		origin: ["https://nasa-apod-rho.vercel.app", "http://localhost:3000", "https://nasa-apod-rho.vercel.app/signup", "https://nasa-apod-rho.vercel.app/login", "https://nasa-apod-rho.vercel.app/home", "https://nasa-apod-apis.vercel.app/auth/login/success", "https://nasa-apod-rho.vercel.app/users/signup", "https://nasa-apod-rho.vercel.app/users/login", "https://nasa-apod-apis.vercel.app"],
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept", "x-client-key", "x-client-token", "x-client-secret", "Authorization"],
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