const express = require('express');
const userModel = require('../model/users');
const listingModel = require('../model/listings');
const bookingModel = require('../model/bookings')
const app = express();

var session = {
  username: null,
  type: null
}
app.get('/users',async(req,res)=>{
    const users = await userModel.find({});
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
})

app.post('/users', async (req, res) => {
  
    console.log(req.body)
    const user = new userModel(req.body);
    
    try {
      await user.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(user);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/listings',async(req,res)=>{
    const user = await userModel.findOne({"username":req.body.username});
    if(user.type == "admin"){
    const users = await listingModel.find({});
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.send("Only admin can view listings!")
})

app.post('/listings', async (req, res) => {
  const user = await userModel.findOne({"username":req.body.username});
  if(user.type == "admin"){
        const user = new listingModel(req.body);
      
      try {
        await user.save((err) => {
          if(err){
            res.send(err)
          }else{
            res.send(user);
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.send("Only admin can add listing!")
  });

  app.get('/bookings',async(req,res)=>{
    
    const user = await userModel.findOne({"username":req.body.username});
    if(user.type == "user"){
    const users = await bookingModel.find({});
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.send("Only user can view bookings!");
})

app.post('/bookings', async (req, res) => {
  const user = await userModel.findOne({"username":req.body.username});
  if(user.type == "user"){
    console.log(req.body)
    const user = new bookingModel(req.body);
    
    try {
      await user.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(user);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  res.send("Only user can add bookings!")
  });

  app.post('/login', async (req, res) => {
    var un = await userModel.findOne({"username":req.body.username})
    if(un != null && un.password == req.body.password){
        session = {
          username: un.username,
          admin: un.type
        }
        res.send("Login successfull!")
    }
    res.send("Incorrect username or password!")
    
  });
  app.post('/logout', async (req, res) => {
        session = {
          username: null,
          admin: null
        }
        res.send("Logout successfull!")
  });

module.exports = app