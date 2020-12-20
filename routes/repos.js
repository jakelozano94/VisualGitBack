const express = require('express');
const repoRouter = express.Router();
const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');

const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN,
    userAgent: "visualgit 0.1",
})

repoRouter.get('/list', async (req, res) =>{
    console.log("hello")
    const listRepos = await octokit.repos.listForUser({username: "jakelozano94"})
    console.log(listRepos)
})



module.exports = repoRouter