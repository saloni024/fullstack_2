const { makeExecutableSchema } = require("@graphql-tools/schema");
const { gql } = require("apollo-server-express");

const { isAuthDirectiveTransformer } = require("./graphql/directives/auth");
const user = require("./graphql/user");
const listing = require("./graphql/listing");
const booking = require("./graphql/booking");

const baseDef = gql`
  directive @isAuth on FIELD_DEFINITION
`;

const typeDefs = [baseDef, user.typeDef, listing.typeDef, booking.typeDef];

const resolvers = [user.resolver, listing.resolver, booking.resolver];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.schema = isAuthDirectiveTransformer(schema, 'isAuth')
