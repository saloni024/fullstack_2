const mongoose = require('mongoose')

var BookingsSchema = mongoose.Schema({
    listing_id:{
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    booking_id:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true,
    },
    booking_date:{
        type: Date,
        required: true,
    },
    booking_start:{
        type: Date,
        required: true,
    },
    booking_end:{
        type: Date,
        required: true,
    },
    username:{
        type: String,
        required: true,
        trim: true
    }
})

var bookings = mongoose.model('bookings', BookingsSchema)
module.exports = bookings