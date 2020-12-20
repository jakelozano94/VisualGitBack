const express = require('express');
const authRouter = express.Router()
const axios = require('axios');
const { Octokit } = require('@octokit/core');
const { findOrCreateUser } = require('../models/User');
const { clientId, clientSecret } = require('../config.json');