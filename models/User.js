const mongoose = require('mongoose');
// const userSchema = require('../app');
const userDebugger = require('debug')('app:create');

//model Schema

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    htmlUrl: String,
    reposUrl: String,
})



const User = mongoose.model("User", userSchema)


const newUser = async (login) => {
    if (await User.find({ username: login })){
        console.log("true")
        return false
    }else{
        console.log("false")
        return true
    }
} 

async function findOrCreateUser( {name, login, html_url, repos_url} ){
    if (newUser(login)){
        const createdUser = new User({
            name: name,
            username: login,
            html_url: html_url,
            repos_url: repos_url
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