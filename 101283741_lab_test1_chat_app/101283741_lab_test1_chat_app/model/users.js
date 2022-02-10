const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    createon: String
})

const User = mongoose.model("User", UserSchema)
module.exports = User