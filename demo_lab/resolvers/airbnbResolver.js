const User = require('../model/users')
const Booking = require('../model/bookings')
const Listing = require('../model/listings')
const { GraphQLScalarType, Kind } = require('graphql');
const jwt = require('jsonwebtoken')

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  });
exports.resolvers = {
    Date: dateScalar,
    Query: {
        getUsers: async(parent,args)=>{
            return User.find({})
        },
        getUserById: async(parent,args)=>{
            return User.findById(args.id)
        },
        validate: async(parent,args)=>{
            var username = args.username
            var password = args.password
            var un = await User.findOne({"username":username})
            if(un != null && un.password == password){
                return un;
            }
            return null;
        },
        getListings: async(parent,args)=>{
            var un = await User.findOne({"username":args.username})
            if(un != null && un.type == "admin"){
                return Listing.find({})
            }
            return null;
        },
        getListingById: async(parent,args)=>{
            return Listing.findById(args.id)
        },
        getListingByListingId: async(parent,args)=>{
            return Listing.find({"listing_id":args.listing_id})
        },
        getListingByName: async(parent,args)=>{
            return Listing.find({"listing_title":args.listing_title})
        },
        getListingByCity: async(parent,args)=>{
            return Listing.find({"city":args.city})
        },
        getListingByZip: async(parent,args)=>{
            return Listing.find({"postal_code":args.postal_code})
        },
        getBookings: async(parent,args)=>{
            var un = await User.findOne({"username":args.username})
            if(un != null && un.type == "user"){
                return Booking.find({})
            }
            return null;
        },
        getBookingById: async(parent,args)=>{
            return Booking.findById(args.id)
        }
    },

    Mutation: {
        login: async (args) => {
            return User.findOne({ username: args.username }).then((user) => {
              if (!user) {
                return "user not found";
              }
              if (args.password !== user.password) {
                return "password is incorrect";
              }
              let token = jwt.sign(
                {
                  username: user.username,
                  email: user.email,
                  type: user.type,
                },
                "secret",
                { expiresIn: "1000000" }
              );
              return token;
            });
          },
        addUser: async(parent,args)=>{
            let newUser = User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })
            return newUser.save()
        },
        updateUser: async(parent,args)=>{
            if(!args.id){
                return;
            }
            return await User.findByIdAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    username: args.username,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    password: args.password,
                    email: args.email,
                    type: args.type
                }
            },{new: true}, (err, user)=>{
                if(err){
                    console.log('Something went wrong!')
                }else{
                    return user
                }
            }
            );
        },

        deleteUser: async(parent,args)=>{
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await User.findByIdAndDelete(args.id)
      },

      addListing: async(parent,args)=>{
            var un = await User.findOne({"username":args.username})
            if(un != null && un.type == "admin"){
                let newListing = Listing({
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
                })
                return newListing.save()
            }
            return null;
        },

        updateListing: async(parent,args)=>{
            if(!args.id){
                return;
            }
            return await Listing.findByIdAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
                }
            },{new: true}, (err, listing)=>{
                if(err){
                    console.log('Something went wrong!')
                }else{
                    return listing
                }
            }
            );
        },

        deleteListing: async(parent,args)=>{
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await Listing.findByIdAndDelete(args.id)
        },

        addBooking: async(parent,args)=>{
            var un = await User.findOne({"username":args.username})
            if(un != null && un.type == "user"){
                let newBooking = Booking({
                    listing_id: args.listing_id,
                    booking_id: args.booking_id,
                    booking_date: args.booking_date,
                    booking_start: args.booking_start,
                    booking_end: args.booking_end,
                    username: args.username
                })
                return newBooking.save()
            }
            return null;
        },

        updateBooking: async(parent,args)=>{
            if(!args.id){
                return;
            }
            return await Booking.findByIdAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    listing_id: args.listing_id,
                    booking_id: args.booking_id,
                    booking_date: args.booking_date,
                    booking_start: args.booking_start,
                    booking_end: args.booking_end,
                    username: args.username
                }
            },{new: true}, (err, booking)=>{
                if(err){
                    console.log('Something went wrong!')
                }else{
                    return booking
                }
            }
            );
        },

        deleteBooking: async(parent,args)=>{
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await Booking.findByIdAndDelete(args.id)
        },
    }
}