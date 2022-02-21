const express = require('express');
const userModel = require('../model/user');
const app = express();

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

module.exports = app