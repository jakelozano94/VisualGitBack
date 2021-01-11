const express = require('express');
const repoRouter = express.Router();
const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');
const { createOctokit } = require('./auth');

// there is a code smell of reappearing destructuring and creating driver, possible abstraction to helper function

repoRouter.get('/list', async ( req, res ) =>{
    // res.json(req.session)
    const { session } = req
    console.log(session)
    const driver = await createOctokit(session.token)
    .catch(console.log)
    const listRepos = await driver.repos.listForUser({username: session.username})
    // .then(res.json(listRepos))
    .catch(err => console.log(err))
    res.json(listRepos)
})

repoRouter.get('/example', async (req, res) => {
    const { session } = req
    console.log(req)
    const driver = await createOctokit(session.token)
    // console.log(driver)
    const exampleRepo = await driver.repos.get({
        owner: "jakelozano94",
        repo: "VisualGitBack"
    })
    // console.log(exampleRepo)
    res.json(exampleRepo)
})

repoRouter.get('/commits', async (req, res) => {
    const { session } = req
    const driver = await createOctokit(session.token)
    const repoCommits = await driver.repos.listCommits({
        owner: "jakelozano94",
        repo: "VisualGitBack"
    })
    res.json(repoCommits)
})

repoRouter.get('/branches', async (req, res) => {
    const {session} = req
    const driver = await createOctokit(session.token)
    const repoBranches = await driver.repos.listBranches({
        owner: session.username,
        repo: "VisualGitBack"
    })
    res.json(repoBranches)
})

repoRouter.get('/contributors', async (req, res) => {
    // res.json(req.session)
    const { session } = req
    console.log(session)
    const driver = await createOctokit(session.token)
    .catch(console.log)
    const listRepos = await driver.repos.listCotributors({username: session.username})
    // .then(res.json(listRepos))
    .catch(err => console.log(err))
    res.json(listRepos)
})



module.exports = repoRouter