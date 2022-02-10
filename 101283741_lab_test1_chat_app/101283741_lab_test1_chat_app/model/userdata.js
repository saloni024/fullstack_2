const mongoose = require('mongoose')

const UserDataSchema = new mongoose.Schema({
    from_user: String,
    room: String,
    message: String,
    date_sent: String
})

const UserData = mongoose.model("Userdata", UserDataSchema);
module.exports = UserData