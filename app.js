const webServerDebugger = require('debug')('app:web-server');
const express = require('express');
const app = express()
const passport = require('passport');
const Strategy = require('passport-github').Strategy

// app.get('/', (req, res) =>{
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENTID}`);
// })

app.get('/', (req, res) =>{
    res.send("Logged in...")
})


passport.use(new Strategy({
    clientID: process.env['CLIENTID'],
    clientSecret: process.env['CLIENT_SECRET'],
    callbackURL: '/signin/callback'
},
function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, cb) {
//     console.log(user)
//     cb(null, user);
// });
  
// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });

// app.get('/login/github',
//   passport.authenticate('github', {session: false}));

// app.get('/signin/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' , session: false}),
//   function(req, res) {
//     res.redirect('/');
//   });


// app.listen(3000);
// webServerDebugger('App listening on port 3000');