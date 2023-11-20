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
// posts.get('/posts', async (req, res) => {

//     try {
//         const posts = await PostModel.find()

//         res.status(200).send({
//             statusCode: 200,
//             posts
//         })
//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Internal server error"
//         })
//     }
// })

// GET
posts.get('/posts', async (req, res) => {

    const { page = 1, pageSize = 4 } = req.query

    try {
        const posts = await PostModel.find()
            .populate('author')
            .limit(pageSize)
            .skip((page - 1) * pageSize)

        const totalPost = await PostModel.count()

        res.status(200).send({
            statusCode: 200,
            currentPage: Number(page),
            totalPages: Math.ceil(totalPost / pageSize),
            totalPost,
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
            .populate('author')
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
// posts.get('/posts/byTitle', async (req, res) => {

//     const { title } = req.query;

//     try {

//         const postsByTitle = await PostModel.find({
//             // fai la ricerca all'interno di title
//             title: {
//                 //usiamo gli operatori di mongoose
//                 $regex: title, // cerca title
//                 $options: 'i' //case insensitive
//             }
//         })

//         res.status(200).send(postsByTitle)

//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Internal server error"
//         })
//     }
// })
posts.get('/posts/byTitle', async (req, res) => {
    const { title, page = 1, limit = 4 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const postsByTitle = await PostModel.find({
            title: {
                $regex: title,
                $options: 'i'
            }
        })
            .populate('author')
            .skip(skip)
            .limit(parseInt(limit));

        const totalPosts = await PostModel.countDocuments({
            title: {
                $regex: title,
                $options: 'i'
            }
        });

        res.status(200).send({
            posts: postsByTitle,
            totalPages: Math.ceil(totalPosts / limit)
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});





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
                posts: filteredPosts
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

// GET all posts by account
posts.get('/posts/allPostsAccount/:accountId', async (req, res) => {
    try {
        const accountId = req.params.accountId; // Utilizza 'accountId' anziché 'postId'
        const posts = await PostModel.find({ author: accountId })
            .populate('author');

        if (!posts || posts.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "Nessun post trovato per questo account"
            });
        }

        res.status(200).send({
            statusCode: 200,
            posts
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});







// PATCH CLOUDINARY
// Aggiungi questa route per la modifica dell'immagine
// posts.patch('/account/cloudUpload', cloudUpload.single('avatar'), async (req, res) => {
//     try {
//         // Verifica se l'utente ha già un'immagine e la elimina se necessario
//         if (req.user.avatar) {
//             // Estrai il public_id dall'URL dell'immagine esistente
//             const publicId = req.user.avatar.match(//upload/(.+)//)[1];

//                 // Elimina l'immagine esistente da Cloudinary
//                 await cloudinary.uploader.destroy(publicId);
//         }

//         // Aggiorna il percorso dell'avatar per l'utente
//         req.user.avatar = req.file.path;

//         // Salva le modifiche all'utente nel database (o nel tuo sistema di archiviazione)
//         await req.user.save();

//         res.status(200).json({ avatar: req.file.path });
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({
//             statusCode: 500,
//             message: "Errore Interno del server"
//         });
//     }
// });

posts.patch('/posts/cloudUpload/:postId', cloudUpload.single('img'), async (req, res) => {
    const postId = req.params.postId; // Ottenere l'ID del post da aggiornare
    try {
        // Supponiamo che tu abbia un modello o una funzione per recuperare il post dal database
        const post = await PostModel.findById(postId); // Sostituisci con il metodo reale per recuperare il post

        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' });
        }

        // Aggiorna il percorso dell'immagine nel post
        post.img = req.file.path; // Assumendo che il percorso dell'immagine sia memorizzato in req.file.path

        // Salva il post aggiornato nel database
        await post.save(); // Sostituisci con il metodo reale per salvare nel database

        res.status(200).json({ postId, updatedImgPath: req.file.path }); // Restituisci l'ID del post e il percorso dell'immagine aggiornato
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server durante l'aggiornamento"
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