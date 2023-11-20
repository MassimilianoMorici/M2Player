const express = require('express')
const GameModel = require('../models/game')
const games = express.Router()
const cloudUpload = require('../middleware/cloudinaryGame')

require('dotenv').config()

//post con Cloudinary
games.post('/games/cloudUpload', cloudUpload.single('cover'), async (req, res) => {
    try {
        res.status(200).json({ cover: req.file.path })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})


// POST
games.post('/game/create', async (req, res) => {

    const { title, cover, category, content, platform, editor, rate, } = req.body;

    const newGame = new GameModel({
        title,
        cover,
        category,
        content,
        platform,
        editor,
        rate
    })

    try {
        const game = await newGame.save()

        res.status(201).send({
            statusCode: 201,
            message: "Game created successfully",
            payload: game
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET
// games.get('/games', async (req, res) => {
//     try {
//         const games = await GameModel.find()

//         res.status(200).send({
//             statusCode: 200,
//             games
//         })
//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Internal server error"
//         })
//     }
// })

// GET
games.get('/games', async (req, res) => {

    const { page = 1, pageSize = 4 } = req.query

    try {
        const games = await GameModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)

        const totalGame = await GameModel.count()

        res.status(200).send({
            statusCode: 200,
            currentPage: Number(page),
            totalPages: Math.ceil(totalGame / pageSize),
            totalGame,
            games
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


// GET BY ID
games.get('/game/:gameId', async (req, res) => {
    const { gameId } = req.params;

    try {
        const game = await GameModel.findById(gameId)

        if (!game) {
            return res.status(404).send({
                statusCode: 404,
                message: "Game not found"
            })

        }

        res.status(200).send({
            statusCode: 200,
            game
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET in base alla category specificata
games.get('/games/category/:category', async (req, res) => {
    try {
        const requestedCategory = req.params.category; // Ottieni il ruolo specificato dalla richiesta URL
        const validCategorys = [
            "MMORPG",
            "RPG",
            "FPS",
            "Race",
            "Adventure",
            "Picchiaduro"
        ]; // Definisci una lista di ruoli validi

        // Verifica se il ruolo specificato è valido
        if (validCategorys.includes(requestedCategory)) {
            // Utilizza la funzione `find` di Mongoose per ottenere gli account con il ruolo specificato
            const filteredGames = await GameModel.find({ category: requestedCategory });

            res.status(200).send({
                statusCode: 200,
                accounts: filteredGames
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

// GET in base all'editor specificato
games.get('/games/editor/:editor', async (req, res) => {
    try {
        const requestedEditor = req.params.editor; // Ottieni il ruolo specificato dalla richiesta URL
        const validEditors = [
            "Capcom",
            "Bandai Namco",
            "Ubisoft",
            "Nintendo",
            "Square Enix",
            "Blizzard",
            "From Software",
            "Marvel"
        ]; // Definisci una lista di ruoli validi

        // Verifica se il ruolo specificato è valido
        if (validEditors.includes(requestedEditor)) {
            // Utilizza la funzione `find` di Mongoose per ottenere gli account con il ruolo specificato
            const filteredGames = await GameModel.find({ editor: requestedEditor });

            res.status(200).send({
                statusCode: 200,
                accounts: filteredGames
            });
        } else {
            res.status(400).send({
                statusCode: 400,
                message: "Editor not valid"
            });
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});

// GET BY TITLE
// games.get('/games/byTitle', async (req, res) => {

//     const { title } = req.query;

//     try {

//         const gamesByTitle = await GameModel.find({
//             // fai la ricerca all'interno di title
//             title: {
//                 //usiamo gli operatori di mongoose
//                 $regex: title, // cerca title
//                 $options: 'i' //case insensitive
//             }
//         })

//         res.status(200).send(gamesByTitle)

//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Internal server error"
//         })
//     }
// })
games.get('/games/byTitle', async (req, res) => {
    const { title, page = 1, limit = 4 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const gamesByTitle = await GameModel.find({
            title: {
                $regex: title,
                $options: 'i'
            }
        })
            .skip(skip)
            .limit(parseInt(limit));

        const totalGames = await GameModel.countDocuments({
            title: {
                $regex: title,
                $options: 'i'
            }
        });

        res.status(200).send({
            games: gamesByTitle,
            totalPages: Math.ceil(totalGames / limit)
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});





// GET BY DATE
games.get('/games/byDate/:date', async (req, res) => {
    const { date } = req.params

    try {
        const getGameByDate = await GameModel.aggregate([ //aggregatore di tutti i post che rispettano le condizione che li sto passando
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

        res.status(200).send(getGameByDate)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


// PATCH CLOUDINARY
games.patch('/game/cloudUpload/:gameId', cloudUpload.single('cover'), async (req, res) => {
    const gameId = req.params.gameId; // Ottenere l'ID del post da aggiornare
    try {
        // Supponiamo che tu abbia un modello o una funzione per recuperare il post dal database
        const game = await GameModel.findById(gameId); // Sostituisci con il metodo reale per recuperare il post

        if (!game) {
            return res.status(404).json({ message: 'Game non trovato' });
        }

        // Aggiorna il percorso dell'immagine nel post
        game.cover = req.file.path; // Assumendo che il percorso dell'immagine sia memorizzato in req.file.path

        // Salva il post aggiornato nel database
        await game.save(); // Sostituisci con il metodo reale per salvare nel database

        res.status(200).json({ gameId, updatedImgPath: req.file.path }); // Restituisci l'ID del post e il percorso dell'immagine aggiornato
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server durante l'aggiornamento"
        });
    }
});




// PATCH
games.patch('/game/update/:gameId', async (req, res) => {
    const { gameId } = req.params;

    const gameExist = await GameModel.findById(gameId)

    if (!gameExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This game does not exist!"
        })
    }

    try {

        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await GameModel.findByIdAndUpdate(gameId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Game edited successfully",
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
games.delete('/game/delete/:gameId', async (req, res) => {
    const { gameId } = req.params;

    try {

        const game = await GameModel.findByIdAndDelete(gameId)

        if (!game) {
            return res.status(404).send({
                statusCode: 400,
                message: "Game not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Game deleted successfully!"

        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})





module.exports = games