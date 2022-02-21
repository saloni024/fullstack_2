const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, "Please enter name"]
    },
    username:{
        type: String,
        trim:true,
        required: [true, "Please enter username"],
        minlength: 4,
    },
    email:{
        type: String,
        trim:true,
        required: [true,"Please enter email"],
        validate: function(value)
        {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    address:{
        street:{
            type:String,
            trim:true,
            required: [true,"Please enter street"]
        },
        suite:{
            type: String,
            trim:true,
            required: [true,"Please enter suite"]
        },
        city:{
            type: String,
            trim:true,
            required: [true,"Please enter city"],
            validate: function(value)
            {
                var cityRegex = /^[a-zA-Z ]*$/;
                return cityRegex.test(value);
            }
        },
        zipcode:{
            type: String,
            trim:true,
            required: [true,"Please enter zipcode"],
            validate: function(value)
            { 
                zipRegex = /\d{5}-\d{4}/;
                return zipRegex.test(value);
            }
        },
        geo:{
            lat:{
                type:Number,
                trim:true,
                required: [true,"Please enter latitude"]
            },
            lng:{
                type:Number,
                trim:true,
                required: [true,"Please enter longitude"]
            }
        },
    },
    phone:{
        type:String,
        trim:true,
        required: [true,"Please enter phone"],
        validate: function(value)
        { 
            phoneRegex = /\d-\d{3}-\d{3}-\d{4}/;
            return phoneRegex.test(value);
        }
    },
    website:{
        type:String,
        trim:true,
        required: [true,"Please enter website"],
        validate: function(value)
        { 
            urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
            return urlRegex.test(value);
        }
    },
    company:{
        name:{
            type:String,
            trim:true,
            required:[true,"Please enter company name"]
        },
        catchPhrase:{
            type:String,
            trim:true,
            required:[true,"Please enter catch phrase"]
        },
        bs:{
            type:String,
            trim:true,
            required:[true,"Please enter company buisness"]
        }
    }
})

const User = mongoose.model("Users", UserSchema);
module.exports = User;