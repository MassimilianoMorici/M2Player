const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accountModel',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postModel',
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gameModel',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    screenshot: {
        type: String,
    },
    gameplay: {
        type: String
    }

}, { timestamps: true, strict: true })

module.exports = mongoose.model('commentModel', CommentSchema, 'comments')