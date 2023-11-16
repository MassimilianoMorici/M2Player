const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        default: "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
    },
    category: {
        type: String,
        enum: ["MMORPG", "RPG", "FPS", "Race", "Adventure", "Picchiaduro"],
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    editor: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        max: 10,
        min: 1,
        required: true
    },


}, { timestamps: true, strict: true })

module.exports = mongoose.model('gameModel', GameSchema, 'games')