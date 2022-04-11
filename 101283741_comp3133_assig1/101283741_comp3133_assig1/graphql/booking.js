const { gql, ApolloError } = require("apollo-server-express");

const BookingSchema = require("../models/booking");

exports.typeDef = gql`
  type Booking {
    listing_id: String
    booking_id: String
    booking_date: String
    booking_start: String
    booking_end: String
    username: String
  }

  type Query {
    getAllBooking: [Booking] @isAuth
  }

  input BookingInput {
    listing_id: String
    booking_id: String
    booking_date: String
    booking_start: String
    booking_end: String
  }

  type Mutation {
    createBooking(booking: BookingInput): Booking @isAuth
  }
`;

exports.resolver = {
  Query: {
    getAllBooking: async (parent, args, context, info) => {
      const { user } = context.req;

      try {
        if (user.type !== "customer") {
          throw new Error(
            "Only user with Customer role can access this function"
          );
        }

        return await BookingSchema.find({ username: user.username });
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
  Mutation: {
    createBooking: async (parent, args, context, info) => {
      const { user } = context.req;

      try {
        if (user.type !== "customer") {
          throw new Error(
            "Only user with Customer role can access this function"
          );
        }

        const booking = new BookingSchema({
          ...args.booking,
          username: user.username,
        });
        await booking.save();
        return booking;
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
};
