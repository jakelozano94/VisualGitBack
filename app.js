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

const { Octokit } = require('@octokit/core');
const { createUser } = require('./models/User');


//CORS setup
const cors = require('cors')
app.use(cors())
//CORS setup

//Connect to Mongo
mongoose.connect('mongodb://localhost/visualgit')
    .then(() =>{
    mongoDebugger('Connected to MongoDB...')
    })
    .catch(() => {
        mongoDebugger('Cannot connect to MongoDB.')
    })

    

// app.get('/login', (req, res) =>{
//     res.redirect(`https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.CLIENT_ID}`)
// })
    
// app.get('/signin/callback', ({ query: { code } }, res) =>{
//     const body = {
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         code
//     };
//     const options = {
//         headers: {accept: 'application/json'}
// };
    
// axios
//     .post('https://github.com/login/oauth/access_token', body, options)
//     .then((_res) =>((_res.data.access_token)))
//     .then(async (token) => {
//         localStorage.setItem(token)
//         const octokit = new Octokit({ auth: token })
//         const response = await octokit.request('GET /user')
//         createUser(response.data.name)
//         app.get('')
//     })
//     .catch((error) =>{
//         res.status(500).json({err: error.message})
//     })
// });

app.use('/users', userRouter)
app.use('/signin', authRouter)
