const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  listing_id: {
    required: true,
    type: String,
  },
  booking_id: {
    required: true,
    type: String,
  },
  booking_date: {
    required: true,
    type: Date,
  },
  booking_start: {
    required: true,
    type: Date,
  },
  booking_end: {
    required: true,
    type: Date,
  },
  username: {
    required: true,
    type: String,
  },
});

module.exports = model("Booking", BookingSchema);
