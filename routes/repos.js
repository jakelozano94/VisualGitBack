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
    const listRepos = await octokit.repos.listForUser({username: "jakelozano94"})
    res.send(listRepos)
})

repoRouter.get('/example', async (req, res) => {
    const exampleRepo = await octokit.repos.get({
        owner: "jakelozano94",
        repo: "VisualGitBack"
    })
    res.send(exampleRepo)
})



module.exports = repoRouter