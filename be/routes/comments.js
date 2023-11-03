const express = require('express')
const CommentModel = require('../models/comment')
const comments = express.Router()

require('dotenv').config()



module.exports = comments