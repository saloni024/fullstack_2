const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const { schema } = require("./schema");
const { AuthMiddleware } = require("./middlewares/auth");

require("dotenv").config();

const startServer = async () => {
  const app = express();
  app.use(AuthMiddleware);
  app.use(express.json());
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      let { user, isAuth } = req;

      return {
        req,
        user,
        isAuth,
      };
    },
  });

  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri, connectOptions);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
};

startServer();
