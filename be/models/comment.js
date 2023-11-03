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
        default: "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
    },
    screenshot: {
        type: String,
    },
    gameplay: {
        type: String
    }

}, { timestamps: true, strict: true })

module.exports = mongoose.model('commentModel', CommentSchema, 'comments')