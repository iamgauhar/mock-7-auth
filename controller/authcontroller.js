const { RegistrationModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        bcrypt.hash(password, 7, async (err, hashed) => {

            try {
                const submitData = new RegistrationModel({ email, password: hashed })
                await submitData.save()
                res.status(200).json({ msg: "Signup successful" })
            } catch (error) {
                if (error.code == 11000) {
                    res.status(400).json({ result: false, error: error.keyValue, msg: "User Allready exists" })
                }
            }
        })
    } catch (err) {
        res.send({ result: false, msg: "Signup failed" })
        console.log(err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await RegistrationModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, valid) => {
                if (err) {
                    return res.status(500).json({ result: false, msg: "Wrong Password" })
                }
                const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_KEY)
                // res.cookie("token", `${jwtToken}`, { maxAge: 900000000, secure: true })
                res.status(200).json({ result: true, msg: "Login successful", token: `Bearer ${jwtToken}` })
                if (user.name) {
                    res.status(200).json({ result: true, msg: "Login successful", username: user.name })
                }
            })
        } else {
            res.status(500).json({ result: false, msg: "User not found" })
        }

    } catch (err) {
        res.status(400).json({ result: false, msg: "Somthing went wrong" })
        console.log(err);
    }
}

module.exports = { register, login }