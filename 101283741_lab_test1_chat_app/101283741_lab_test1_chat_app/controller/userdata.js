const express = require('express');
const userModel = require('../model/users');
const usedataModel = require('../model/userdata');
const app = express();

app.get('/users',async(req,res)=>{
    const users = await userModel.find({});
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
})

app.get('/userdata',async(req,res)=>{
    const users = await usedataModel.find({});
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
})



module.exports = app