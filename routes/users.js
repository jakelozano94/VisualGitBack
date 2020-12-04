const express = require('express');
const userRouter = express.Router()
const { User } = require('../models/User');

//Users index route
userRouter.get('/', async function(req, res){
    
    const user = await User.find({})
    res.json(user)

})


module.exports = userRouter
