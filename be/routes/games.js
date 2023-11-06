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

//GET in base alla category specificata
games.get('/games/:category', async (req, res) => {
    try {
        const requestedCategory = req.params.category; // Ottieni il ruolo specificato dalla richiesta URL
        const validCategorys = ["MMORPG", "RPG", "FPS", "Race", "Adventure", "Picchiaduro"]; // Definisci una lista di ruoli validi

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
                message: "Categorys not valid"
            });
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});


module.exports = games