const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accountModel',
        required: true
    },
    game: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
    },
    category: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

}, { timestamps: true, strict: true })

module.exports = mongoose.model('postModel', PostSchema, 'posts')