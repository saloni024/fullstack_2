const { Schema, model } = require("mongoose");

const ListingSchema = new Schema({
  listing_id: {
    required: true,
    type: String,
  },
  listing_title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  street: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  postal_code: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      },
      message: "Please fill a valid email address",
    },
  },
  username: {
    required: true,
    type: String,
  },
});

module.exports = model("Listing", ListingSchema);
