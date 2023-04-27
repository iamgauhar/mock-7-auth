const express = require("express")
const cors = require("cors")
const { connectDB } = require("./config/db")
const { userRouter } = require("./routes/userAuth.route")
const { RegistrationModel } = require("./models/user.model")


const app = express()
app.use(express.json())

app.use(cors({
    origin: "*",
    credentials: true

}))

app.use("/user", userRouter)



app.get("/", (req, res) => {
    res.send("Hello")
})
app.get("/all", async (req, res) => {
    const allUsers = await RegistrationModel.find()
    // const res = await allUsers.json()
    res.send(allUsers)
})


app.listen(5000, async () => {
    try {
        await connectDB
        console.log("DB connected ");
        console.log("Listing 5000 ");
    } catch (err) {
        console.log(err);
    }
})