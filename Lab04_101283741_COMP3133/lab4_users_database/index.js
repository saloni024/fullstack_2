const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://saloni:101283741@comp3133.iblld.mongodb.net/User?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection', err)
});

app.use(userRouter);

app.listen(8081, () => { console.log('Server is running...') });
