const { gql, ApolloError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const UserSchema = require("../models/user");
const { issueToken } = require("../utils/token");

exports.typeDef = gql`
  type User {
    id: ID
    username: String
    firstname: String
    lastname: String
    password: String
    email: String
    type: String
  }

  type AuthResponse {
    user: User
    token: String
  }

  input AuthUserInput {
    username: String
    password: String
  }

  type Query {
    authUser: User @isAuth
    authenticateUser(user: AuthUserInput): AuthResponse
  }

  input UserInput {
    username: String
    firstname: String
    lastname: String
    password: String
    email: String
    type: String
  }

  type Mutation {
    createUser(user: UserInput): User
  }
`;

exports.resolver = {
  Query: {
    authUser: (parent, args, context, info) => {
      const { isAuth, user } = context.req;

      return user;
    },
    authenticateUser: async (parent, args, context, info) => {
      const { username, password } = args.user;

      try {
        const user = await UserSchema.findOne({ username });
        if (!user) {
          throw new Error("Username not found!");
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
          throw new Error("Wrong credentials!");
        }

        const token = await issueToken(user);

        return { user, token };
      } catch (error) {
        throw new ApolloError(error.message, 403);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { username, firstname, lastname, email, password, type } =
        args.user;

      try {
        const user = new UserSchema({
          username,
          firstname,
          lastname,
          email,
          password: bcrypt.hashSync(password, parseInt(process.env.SALT)),
          type,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
};
