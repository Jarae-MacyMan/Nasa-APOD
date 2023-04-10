const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//const config = require("config")
require("dotenv").config()


const User = require("../models/user")


class userContoller {


    static async signinController (req, res) {

        res.header("Access-Control-Allow-Headers:  Authorization, Origin, Content-Type, Accept")

    
            // normal-auth
            const {email, password} = req.body;

            if (email === "" || password === "") 
                return res.status(400).json({message: "Invalid field!"});
            // try { 
                const existingUser = await User.findOne({email})
        
                if (!existingUser) 
                    return res.status(404).json({message: "User does not exist!"})
        
                const isPasswordOk = await bcrypt.compare(password, existingUser.password);
        
                if (!isPasswordOk) 
                    return res.status(400).json({message: "Invalid credintials!"})
        
                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, process.env.JWT_SECRET, {expiresIn: "1h"})
        
                res
                    .status(200)
                    .json({result: existingUser, token}) 
            // } catch (err) {
            //     res
            //         .status(500)
            //         .json({message: "Something went wrong!"})
            // }
        
    
    }

    static async signupController (req, res) {

        res.header("Access-Control-Allow-Headers:  Authorization, Origin, Content-Type, Accept")

        
            // normal form signup

            const { username, email, password } = req.body;  


            //try {
                if (email === "" || password === "" || username === "" && password.length >= 4) 
                    return res.status(400).json({message: "Invalid field!"})

                const existingUser = await User.findOne({email}) 

                if (existingUser) 
                    return res.status(400).json({message: "User already exist!"})

                const hashedPassword = await bcrypt.hash(password, 12)

                const result = await User.create({email, password: hashedPassword, username})

                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, process.env.JWT_SECRET, {expiresIn: "1h"})

                res
                    .status(200)
                    .json({result, token})
            // } catch (err) {
            //     res
            //         .status(500)
            //         .json({message: "Something went wrong!"})
            // }

        
    }

    static async getVerified (req, res) {
        try {
            return res.json(true);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Server Error");
        }
    }
}

module.exports = userContoller