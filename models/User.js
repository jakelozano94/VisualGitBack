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
    const findAUser = await User.find({ username: login }).exec()
    if (findAUser.length > 0){
        return false
    }else{
        return true
    }
} 

async function findOrCreateUser( {name, login, html_url, repos_url} ){
    const isNew = await newUser(login)
    if (isNew){
        const createdUser = new User({
            name: name,
            username: login,
            htmlUrl: html_url,
            reposUrl: repos_url
        })
        console.log("new User")
        const result = await createdUser.save()
    }else{
        console.log("old User")
    }

}

newUser

exports.findOrCreateUser = findOrCreateUser;
exports.User = User