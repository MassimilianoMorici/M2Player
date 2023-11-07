const express = require('express')
const PostModel = require('../models/post')
const posts = express.Router()

require('dotenv').config()

// POST
posts.post('/post/create', async (req, res) => {

    const { author, game, title, content, img, category } = req.body;

    const newPost = new PostModel({
        author,
        game,
        title,
        content,
        img,
        category,
    })

    try {
        const post = await newPost.save()

        res.status(201).send({
            statusCode: 201,
            message: "Post created successfully",
            payload: post
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET
posts.get('/posts', async (req, res) => {
    try {
        const posts = await PostModel.find()

        res.status(200).send({
            statusCode: 200,
            posts
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET BY ID
posts.get('/post/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            post
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})




module.exports = posts