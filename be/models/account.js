const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('accountModel', AccountSchema, 'accounts')