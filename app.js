const webServerDebugger = require('debug')('app:web-server');
const mongoDebugger = require('debug')('app:mongo');
const express = require('express');
const app = express()
const passport = require('passport');
const mongoose = require('mongoose');
const { query } = require('express');
const Strategy = require('passport-github').Strategy
const axios = require('axios');



mongoose.connect('mongodb://localhost/visualgit')
.then(() =>{
        mongoDebugger('Connected to MongoDB...')
    })
    .catch(() => {
        mongoDebugger('Cannot connect to MongoDB.')
    })


var GitHubStrategy = require('passport-github').Strategy;
app.listen(3000)
app.get('/login', (req, res) =>{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
})

app.get('/signin/callback', ({ query: { code } }, res) =>{
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
        .then((_res) =>(webServerDebugger(_res.data.access_token)))
        .then((token) => {
            webServerDebugger(token)
            res.redirect(`/?token=${token}`)
        })
        .catch((error) =>{
            res.status(500).json({err: error.message})
        })
    
});

// app.get('/auth/github', 
//     passport.authenticate('github'));

// app.get('/signin/callback',
// passport.authenticate('github', { failureRedirect: '/login' }))

// passport.use(new GitHubStrategy({
//     clientID: process.env.CLIENTID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/signin/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
    
    // db Schemas
    
    const userSchema = new mongoose.Schema({
        name: String
    })

    exports.userSchema = userSchema


// createUser()

