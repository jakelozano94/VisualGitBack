const express = require('express');
const authRouter = express.Router()
const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');

const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN,
    userAgent: "visualgit 0.1",
})

octokit.repos.get({
    "jakelozano94",
    "VisualGitBack"
})


authRouter.get('/', (req, res) =>{
    res.redirect(`https://github.com/login/oauth/authorize?scope=repo&client_id=${clientId}`)
})
    
authRouter.get('/callback', ({ query: { code } }, res) =>{
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code
    };
    const options = {
        headers: {accept: 'application/json'}
};
    
axios
    .post('https://github.com/login/oauth/access_token', body, options)
    .then((_res) =>((_res.data.access_token)))
    .then(async (token) => {
        let octokit = new Octokit({ auth: token })
        const response = await octokit.request('GET /user')
        findOrCreateUser(response.data)
        process.env.ACCESS_TOKEN = token
        console.log("hello", process.env.ACCESS_TOKEN)
        res.redirect("http://localhost:3000")
    })
    .catch((error) =>{
        res.status(500).json({err: error.message})
    })
});

// findOrCreateUser(response.data)
// res.redirect("http://localhost:3000")

module.exports = authRouter