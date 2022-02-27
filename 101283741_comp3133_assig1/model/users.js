const mongoose = require('mongoose')

var UsersSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: function(value)
        {
            var passwordRegex = /^[A-Za-z0-9#$&_]*$/;
            return passwordRegex.test(value);
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate: function(value)
        {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    type:{
        type: String,
        enum: ['admin','user'],
        default: 'user',
        required: true,
        trim: true
    },
})

var users = mongoose.model('users',UsersSchema)
module.exports = users