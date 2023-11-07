const express = require('express')
const GameModel = require('../models/game')
const games = express.Router()

require('dotenv').config()

// POST
games.post('/game/create', async (req, res) => {

    const { title, cover, category, description, platform, editor, rate, price } = req.body;

    const newGame = new GameModel({
        title,
        cover,
        category,
        description,
        platform,
        editor,
        rate,
        price
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
games.get('/games', async (req, res) => {
    try {
        const games = await GameModel.find()

        res.status(200).send({
            statusCode: 200,
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
games.get('/games/byTitle', async (req, res) => {

    const { title } = req.query;

    try {

        const gamesByTitle = await GameModel.find({
            // fai la ricerca all'interno di title
            title: {
                //usiamo gli operatori di mongoose
                $regex: title, // cerca title
                $options: 'i' //case insensitive
            }
        })

        res.status(200).send(gamesByTitle)

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


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