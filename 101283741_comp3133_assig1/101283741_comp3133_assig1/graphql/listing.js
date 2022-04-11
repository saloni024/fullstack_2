const { gql, ApolloError } = require("apollo-server-express");

const ListingSchema = require("../models/listing");

exports.typeDef = gql`
  type Listing {
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

  type Query {
    getAllListing: [Listing]
    searchListing(name: String, city: String, postal_code: String): [Listing]
  }

  input ListingInput {
    listing_id: String
    listing_title: String
    description: String
    street: String
    city: String
    postal_code: String
    price: Float
    email: String
  }

  type Mutation {
    createListing(listing: ListingInput): Listing @isAuth
  }
`;

exports.resolver = {
  Query: {
    getAllListing: async (parent, args, context, info) => {
      const { isAuth, user } = context;

      // if (isAuth && user.type === "admin") {
      //   console.log(user.username);
      //   return await ListingSchema.find({ username: user.username });
      // }
      console.log("jeng");
      return await ListingSchema.find();
    },
    searchListing: async (parent, args, context, info) => {
      const { name, city, postal_code } = args;

      if (name) {
        return await ListingSchema.find({ listing_title: { $regex: name } });
      }

      if (city) {
        return await ListingSchema.find({ city: { $regex: city } });
      }

      if (postal_code) {
        return await ListingSchema.find({
          postal_code: { $regex: postal_code },
        });
      }
    },
  },
  Mutation: {
    createListing: async (parent, args, context, info) => {
      const { user } = context.req;

      try {
        if (user.type !== "admin") {
          throw new Error("Only user with Admin role can access this function");
        }

        const listing = new ListingSchema({
          ...args.listing,
          username: user.username,
        });
        await listing.save();
        return listing;
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
};
