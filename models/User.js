const mongoose = require('mongoose');
// const userSchema = require('../app');
const userDebugger = require('debug')('app:create');

//model Schema

const userSchema = new mongoose.Schema({
    name: String,
    html_url: String,
    repos_url: String,
})



const User = mongoose.model("User", userSchema)


const newUser = async (data) => {
    if (await User.find({ name: data })){
        console.log("true")
        return false
    }else{
        console.log("false")
        return true
    }
} 

async function findOrCreateUser(data){

    if (newUser){
        const createdUser = new User({
            name: data.toString()
        })
        const result = await createdUser.save()
    }else{
        return userInfo
    }

    // result()
}

newUser

exports.findOrCreateUser = findOrCreateUser;
exports.User = User