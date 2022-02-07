const express = require('express');
const restaurantModel = require('../model/restaurant');
const app = express();

app.get('/restaurants',async(req,res)=>{
    const restaurants = await restaurantModel.find({});
    try {
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
})

app.get('/restaurants/cuisine/:cuisinename',async(req,res)=>{
    const restaurants = await restaurantModel.find({cuisine: {$eq: req.params.cuisinename}});
    try {
        res.send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
})

app.get('/restaurants',async(req,res)=>{
    const sortBy = req.query.sortBy
    let order = (sortBy == "ASC") ? 'restaurant_id' : '-restaurant_id'; 
    

    try{
        const restaurants = restaurantModel
                                .find({})
                                .sort(order)
                                .select('id cuisine name city restaurant_id')
                                .exec((err, data) => {
                                    if (err){
                                        res.send(JSON.stringify({status:false, message: "No data found"}));
                                    }else{
                                        res.send(data);
                                    }
                                  });
    }catch (err) {
        res.status(500).send(err);
    } 
})


app.get('/restaurants/delicatessen',(req,res)=>{
    try{
        const restaurants = restaurantModel.
                                find({})
                                .where('cuisine').equals('Delicatessen')
                                .where('city').ne('Brooklyn')
                                .sort('name')
                                .select('cuisine name city')
                                .exec((err, data) => {
                                    if (err){
                                        res.send(JSON.stringify({status:false, message: "No data found"}));
                                    }else{
                                        res.send(data);
                                    }
                                  });
    }catch (err) {
        res.status(500).send(err);
        
    }
})
module.exports = app