const express = require('express')
const mongoose = require('mongoose')
const accountRoute = require('./routes/accounts')
const gameRoute = require('./routes/games')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const loginRoute = require('./routes/login')

const cors = require('cors')
require('dotenv').config()


const PORT = 5050;

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', accountRoute)
app.use('/', gameRoute)
app.use('/', postRoute)
app.use('/', commentRoute)
app.use('/', loginRoute)



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