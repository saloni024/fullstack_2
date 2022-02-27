const mongoose = require('mongoose')

var ListingsSchema = mongoose.Schema({
    listing_id:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true,
    },
    listing_title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    street:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    postal_code:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    price:{
        type: Number,
        required: true,
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
    username:{
        type: String,
        required: true,
        trim: true
    }
})

var listings = mongoose.model('listings',ListingsSchema)
module.exports = listings