const express = require('express')
const PostModel = require('../models/post')
const posts = express.Router()
const cloudUpload = require('../middleware/cloudinaryPost')

require('dotenv').config()


//post con Cloudinary
posts.post('/posts/cloudUpload', cloudUpload.single('img'), async (req, res) => {
    try {
        res.status(200).json({ img: req.file.path })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})


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

// GET BY TITLE
posts.get('/posts/byTitle', async (req, res) => {

    const { title } = req.query;

    try {

        const postsByTitle = await PostModel.find({
            // fai la ricerca all'interno di title
            title: {
                //usiamo gli operatori di mongoose
                $regex: title, // cerca title
                $options: 'i' //case insensitive
            }
        })

        res.status(200).send(postsByTitle)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET BY DATE
posts.get('/posts/byDate/:date', async (req, res) => {
    const { date } = req.params

    try {
        const getPostsByDate = await PostModel.aggregate([ //aggregatore di tutti i post che rispettano le condizione che li sto passando
            {
                $match: { // operatore che farà il match dell'espressione
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $dayOfMonth: '$createdAt' },
                                    { $dayOfMonth: new Date(date) }
                                ]
                            },
                            {
                                $eq: [
                                    { $month: '$createdAt' },
                                    { $month: new Date(date) }
                                ]
                            },
                            {
                                $eq: [
                                    { $year: '$createdAt' },
                                    { $year: new Date(date) }
                                ]
                            }
                        ]
                    }

                }
            }

        ])

        res.status(200).send(getPostsByDate)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


// GET in base alla category specificata
posts.get('/posts/category/:category', async (req, res) => {
    try {
        const requestedCategory = req.params.category; // Ottieni il ruolo specificato dalla richiesta URL
        const validCategorys = [
            "Easter Egg",
            "Gameplay",
            "Guide",
            "Nuove uscite",
            "Party",
            "Preordini",
            "Segreti",
            "Tutorial"
        ]; // Definisci una lista di ruoli validi

        // Verifica se il ruolo specificato è valido
        if (validCategorys.includes(requestedCategory)) {
            // Utilizza la funzione `find` di Mongoose per ottenere gli account con il ruolo specificato
            const filteredPosts = await PostModel.find({ category: requestedCategory });

            res.status(200).send({
                statusCode: 200,
                accounts: filteredPosts
            });
        } else {
            res.status(400).send({
                statusCode: 400,
                message: "Category not valid"
            });
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});


// PATCH
posts.patch('/post/update/:postId', async (req, res) => {
    const { postId } = req.params;

    const postExist = await PostModel.findById(postId)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This post does not exist!"
        })
    }

    try {

        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await PostModel.findByIdAndUpdate(postId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Post edited successfully",
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
posts.delete('/post/delete/:postId', async (req, res) => {
    const { postId } = req.params;

    try {

        const post = await PostModel.findByIdAndDelete(postId)

        if (!post) {
            return res.status(404).send({
                statusCode: 400,
                message: "Post not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Post deleted successfully!"

        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


module.exports = posts