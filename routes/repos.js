const express = require('express');
const repoRouter = express.Router();
const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');
// const { createOctokit } = require('./auth');


repoRouter.get('/list', async ( req, res) =>{
    res.json(req.session)
    // const driver = await createOctokit(session.token)
    // const listRepos = await driver.repos.listForUser({username: session.username})
    // res.send(listRepos)
})

repoRouter.get('/example', async (req, res) => {
    const exampleRepo = await octokit.repos.get({
        owner: "jakelozano94",
        repo: "VisualGitBack"
    })
    res.send(exampleRepo)
})

repoRouter.get('/commits', async (req, res) => {
    const repoCommits = await octokit.repos.listCommits({
        owner: "jakelozano94",
        repo: "VisualGitBack"
    })
    res.send(repoCommits)
})



module.exports = repoRouter