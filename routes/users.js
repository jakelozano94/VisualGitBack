const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const { User } = require('../models/User');


router.get('/', async function(req, res){
    
    const user = await User.find({name: 'Jacob Lozano'})
    res.json(user)
    
    // User.find({name: 'Jacob'}, async function(err, users) {

    //     var userMap = {};
    
    //     users.forEach(function(user) {
    //       userMap[user._id] = user;
    //     });
    
    //     res.send(userMap);  
    //   });
})


module.exports = router
