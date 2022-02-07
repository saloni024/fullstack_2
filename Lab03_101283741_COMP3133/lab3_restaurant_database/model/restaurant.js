const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address: {
        building: Number,
        street: String,
        zipcode: Number
    },
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: Number

})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;

