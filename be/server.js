const express = require('express')
const mongoose = require('mongoose')
const accountRoute = require('./routes/accounts')
const gameRoute = require('./routes/games')
require('dotenv').config()


const PORT = 5060;

const app = express();

app.use(express.json())

app.use('/', accountRoute)
app.use('/', gameRoute)




mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during db connection'))
db.once('open', () => {
    console.log('Database successfully connected!');
})

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))