const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

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
exports.typeDefs = gql`
    scalar Date

    type User{
        id: ID
        username: String
        firstname: String
        lastname: String
        password: String
        email: String
        type: String
    }
    type Listing {
        id: ID
        listing_id: String
        listing_title: String
        description: String
        street: String
        city: String
        postal_code: String
        price: Float
        email: String
        username: String
    }
    type Booking {
        id: ID
        listing_id: String
        booking_id: String
        booking_date: Date
        booking_start: Date
        booking_end: Date
        username: String
    }

    type Query{
        getUsers: [User]
        getUserById(id: ID!):User
        validate(username: String!,password:String!):User
        getListings(username: String!): [Listing]
        getListingById(id: ID!):Listing
        getListingByListingId(listing_id:String!):[Listing]
        getListingByName(listing_title: String!):[Listing]
        getListingByCity(city: String!):[Listing]
        getListingByZip(postal_code: String!):[Listing]
        getBookings(username: String!): [Booking]
        getBookingById(id: ID!):Booking
    }

    type Mutation {
        addUser(
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!
        ):User

        updateUser(
            id: ID!
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!
        ):User

        deleteUser(id:ID!):User

        addListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
        ):Listing

        updateListing(
            id: ID!
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
        ):Listing

        deleteListing(id:ID!):Listing

        addBooking(
            listing_id: String!
            booking_id: String!
            booking_date: Date!
            booking_start: Date!
            booking_end: Date!
            username: String!
        ):Booking

        updateBooking(
            id: ID!
            listing_id: String!
            booking_id: String!
            booking_date: Date!
            booking_start: Date!
            booking_end: Date!
            username: String!
        ):Booking

        deleteBooking(id: ID!):Booking
    }
`