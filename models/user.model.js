const mongoose = require("mongoose")

const RegistrationModel = mongoose.model("user", mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
}))

module.exports = { RegistrationModel }