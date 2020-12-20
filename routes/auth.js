const express = require('express');
const authRouter = express.Router();
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');




// const octokit = new Octokit({
//     auth: process.env.ACCESS_TOKEN,
//     userAgent: "visualgit 0.1",
// })

// const listRepos = await octokit.repos.listForUser({
//     username: "jakelozano94"
// })


authRouter.get('/', (req, res) =>{
    res.redirect(`https://github.com/login/oauth/authorize?scope=repo&client_id=${clientId}`)
})

const getAccessToken = async (code) => {
    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code
        })
    })

    const data = await res.text();
    const params = new URLSearchParams(data)
    return params.get('access_token')
}

const createOctokit = async (access_token) => {
    return new Octokit({
        auth: access_token,
        userAgent: "visualgit 0.1",
    })
}
    
authRouter.get('/callback', async (req, res) =>{
    const code = req.query.code
    const token = await getAccessToken(code);
    const driver = await createOctokit(token);
    const response = await driver.request('GET /user')

    if (response) {
        const { data } = response
        req.session.username = data.login
        req.session.token = token
        res.json(req.session)
    }
    else {
        console.log('The error from making session cookies.')
    }
    
    // console.log(res)
    // const body = {
    //     client_id: clientId,
    //     client_secret: clientSecret,
    //     code
    // };
    // const options = {
    //     headers: {accept: 'application/json'}
    // };
    
    // axios
    //     .post('https://github.com/login/oauth/access_token', body, options)
    //     .then((_res) =>((_res.data.access_token)))
    //     .then(async (token) => {
    //         let octokit = new Octokit({ auth: token })
    //         const response = await octokit.request('GET /user')
    //         findOrCreateUser(response.data, token)
    //         process.env.ACCESS_TOKEN = token
    //         // console.log("hello", process.env.ACCESS_TOKEN)
    //         res.redirect("http://localhost:3000")
    //     })
    //     .catch((error) =>{
    //         res.status(500).json({err: error.message})
    //     })
});

// findOrCreateUser(response.data)
// res.redirect("http://localhost:3000")

module.exports = authRouter