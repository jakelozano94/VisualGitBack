const express = require('express');
const authRouter = express.Router()
const axios = require('axios');
const { Octokit } = require('@octokit/core');
const { createUser } = require('../models/User');



authRouter.get('/', (req, res) =>{
    console.log(process.env.CLIENT_ID)
    res.redirect(`https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.CLIENT_ID}`)
})
    
authRouter.get('/callback', ({ query: { code } }, res) =>{
    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
    };
    const options = {
        headers: {accept: 'application/json'}
};
    
axios
    .post('https://github.com/login/oauth/access_token', body, options)
    .then((_res) =>((_res.data.access_token)))
    .then(async (token) => {
        localStorage.setItem(token)
        const octokit = new Octokit({ auth: token })
        const response = await octokit.request('GET /user')
        createUser(response.data.name)
        // app.get('')
    })
    .catch((error) =>{
        res.status(500).json({err: error.message})
    })
});

module.exports = authRouter