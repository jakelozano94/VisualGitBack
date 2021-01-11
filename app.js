const webServerDebugger = require('debug')('app:web-server');
const mongoDebugger = require('debug')('app:mongo');
const config = require('./package.json');
const { cookieSecret } = require('./config.json');
//initialize server
const express = require('express');
const app = express()
app.listen(8000)

const mongoose = require('mongoose');
const axios = require('axios');

//routes
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const repoRouter = require('./routes/repos')

const { Octokit } = require('@octokit/core');
const { createUser } = require('./models/User');


//CORS setup
const cors = require('cors')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//CORS setup

//Adds cookieSession to server
const cookieSession = require('cookie-session');

app.use(express.cookieParser())
app.user(express.session({secret: 'abc'}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(
//     cookieSession({
//         secret: cookieSecret 
//     })
// )

passport.use(new GithubStrategy({
    clientID: 'your app client id',
    clientSecret: 'your app client secret',
    callbackURL: 'http://localhost:3000/auth/callback'
  }, function(accessToken, refreshToken, profile, done){
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }));

  passport.serializeUser(function(user, done) {
    // for the time being tou can serialize the user 
    // object {accessToken: accessToken, profile: profile }
    // In the real app you might be storing on the id like user.profile.id 
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    // If you are storing the whole user on session we can just pass to the done method, 
    // But if you are storing the user id you need to query your db and get the user 
    //object and pass to done() 
    done(null, user);
  });


//Connect to Mongo
mongoose.connect('mongodb://localhost/visualgit')
    .then(() =>{
    mongoDebugger('Connected to MongoDB...')
    })
    .catch(() => {
        mongoDebugger('Cannot connect to MongoDB.')
    })

    



app.use('/users', userRouter)
app.use('/signin', authRouter)
app.use('/repos', repoRouter)
