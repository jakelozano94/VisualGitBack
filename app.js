const webServerDebugger = require('debug')('app:web-server');
const mongoDebugger = require('debug')('app:mongo');
const config = require('./package.json');
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
