const express = require('express');
const authRouter = express.Router();
const fetch = require('node-fetch');
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
// const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');



// passport.use(new GitHubStrategy({
//     clientID: clientId,
//     clientSecret: clientSecret,
//     callbackURL: "http://localhost:8000/signin/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// exports.callback = function(req, res){
//     // In the real application you might need to check 
//     // whether the user exits and if exists redirect 
//     // or if not you many need to create user.
//     res.send('Login success');
//   };
  
//   exports.error = function(req, res){
//     res.send('Login Failed');
//   };


// const octokit = new Octokit({
//     authx: process.env.ACCESS_TOKEN,
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
        // res.json(req.session)
        res.redirect(`http://localhost:3000`)
        console.log(req.session.username, req.session.token)
    }
    else {
        console.log('The error from making session cookies.')
    }
    

   
});

// findOrCreateUser(response.data)
// res.redirect("http://localhost:3000")

module.exports = authRouter;
module.exports.createOctokit = createOctokit;