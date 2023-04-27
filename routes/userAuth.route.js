const express = require("express")
const { register, login } = require("../controller/authcontroller")
const { RegistrationModel } = require("../models/user.model")
const { authenticate } = require("../middlewares/userauth.middleware")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.get("/profile", authenticate, async (req, res) => {
    const { email } = req.body
    const profile = await RegistrationModel.find({ email })
    // console.log(profile);
    res.send(profile[0])
})

userRouter.patch("/update/:id", async (req, res) => {
    const bID = req.params.id
    const email = req.body.email
    const newData = req.body
    console.log(newData);
    try {
        const user = await RegistrationModel.findOne({ email: bID })

        if (bID == user.email) {

            await RegistrationModel.findOneAndUpdate({ email: bID }, newData)
            res.json({ "msg": "Update done!" })
        } else {
            res.json({ "msg": "Not authorized" })
        }

    } catch (err) {
        console.log(err)
        res.json({ "msg": "Update failure" })
    }

})

module.exports = { userRouter }