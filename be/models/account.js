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
        type: Date,
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

//Logica per registrare in admin chiunque abbia un email aziendale, attenzione, 
//tale logica va implementata con una logica di attivazione account via email, non è questo il caso dato che è un progetto simulazione
AccountSchema.pre("save", function (next) {
    if (this.email && this.email.endsWith("@m2player.it")) {
        this.role = "admin"
    }
    next()
})

module.exports = mongoose.model('accountModel', AccountSchema, 'accounts')