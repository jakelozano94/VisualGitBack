const mongoose = require('mongoose');
// const userSchema = require('../app');
const userDebugger = require('debug')('app:create');

//model Schema

const userSchema = new mongoose.Schema({
    name: String
})



const User = mongoose.model("User", userSchema)
async function createUser(data){

    const newUser = new User({
        name: data.toString()
    })
    const result = await newUser.save()
    // result()
}

exports.createUser = createUser;