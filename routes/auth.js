const express = require('express');
const authRouter = express.Router()
const axios = require('axios');
const { Octokit } = require('@octokit/core');
const { createUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');



authRouter.get('/', (req, res) =>{
    console.log(clientId)
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
        const octokit = new Octokit({ auth: token })
        const response = await octokit.request('GET /user')
        createUser(response.data.name)
    })
    .catch((error) =>{
        res.status(500).json({err: error.message})
    })
});

module.exports = authRouter