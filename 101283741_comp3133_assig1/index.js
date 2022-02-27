const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')
//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());
//import ApolloServer
const {ApolloServer} = require('apollo-server-express')

//import typedefs and resolver
const TypeDefs = require('./schemas/airbnbSchema')
const Resolvers = require('./resolvers/airbnbResolver')

//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection', err)
});

app.use(userRouter);
app.listen(8081, () => { console.log('Server is running...') });

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers
})



//start apollo server
/*server.start().then(res => {
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
  
 })*/
