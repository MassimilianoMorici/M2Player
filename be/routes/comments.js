const express = require('express')
const CommentModel = require('../models/comment')
const GameModel = require('../models/game')
const PostModel = require('../models/post')
const comments = express.Router()

require('dotenv').config()


// POST
comments.post('/comment/create', async (req, res) => {

    const { author, post, game, title, content, screenshot, gameplay } = req.body;

    const newComment = new CommentModel({
        author,
        post,
        game,
        title,
        content,
        screenshot,
        gameplay
    })

    try {
        const comment = await newComment.save()

        res.status(201).send({
            statusCode: 201,
            message: "Comment created successfully",
            payload: comment
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET
comments.get('/comments', async (req, res) => {
    try {
        const comments = await CommentModel.find()
            .populate('author')
            .populate('game')
            .populate('post')

        res.status(200).send({
            statusCode: 200,
            comments
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET BY ID
comments.get('/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await CommentModel.findById(commentId)
        if (!comment) {
            return res.status(404).send({
                statusCode: 404,
                message: "Comment not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            comment
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET all comments by GAME ID
comments.get('/game/viewComments/:gameId', async (req, res) => {

    try {
        const gameId = req.params.gameId;
        const game = await GameModel.findById(gameId)

        if (!game) {
            return res.status(404).send({
                statusCode: 404,
                message: "game not found"
            })
        }

        const comments = await CommentModel.find({ game: gameId })
            .populate('author');
        if (!comments) {
            return res.status(404).send({
                statusCode: 404,
                message: "comments not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            comments
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

// GET all comments by POST ID
comments.get('/post/viewComments/:postId', async (req, res) => {

    try {
        const postId = req.params.postId;
        const post = await PostModel.findById(postId)

        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "post not found"
            })
        }

        const comments = await CommentModel.find({ post: postId })
            .populate('author');
        if (!comments) {
            return res.status(404).send({
                statusCode: 404,
                message: "comments not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            comments
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})


// PATCH
comments.patch('/comment/update/:commentId', async (req, res) => {
    const { commentId } = req.params;

    const commentExist = await CommentModel.findById(commentId)

    if (!commentExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This comment does not exist!"
        })
    }

    try {

        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await CommentModel.findByIdAndUpdate(commentId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Comment edited successfully",
            result
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// DELETE
comments.delete('/comment/delete/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {

        const comment = await CommentModel.findByIdAndDelete(commentId)

        if (!comment) {
            return res.status(404).send({
                statusCode: 400,
                message: "Comment not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Comment deleted successfully!"

        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})




module.exports = comments