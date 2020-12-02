const mongoose = require('mongoose');
const userSchema = require('../app');

console.log(userSchema)


const User = mongoose.model("User", userSchema)

async function createUser(data){
    const newUser = new User({
        name: data.name
    })
    const result = await newUser.save()
    
}

exports.createUser = createUser;