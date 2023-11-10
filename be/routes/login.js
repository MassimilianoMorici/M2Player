const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const AccountModel = require('../models/account')
const jwt = require('jsonwebtoken')
require('dotenv').config()




login.post('/login', async (req, res) => {


    const account = await AccountModel.findOne({ email: req.body.email })


    //se l'utente non esiste
    if (!account) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Nome utente errato o inesistente'
        })
    }


    //controllo validità password
    const validPassword = await bcrypt.compare(req.body.password, account.password)
    //accetta 2 paramentri
    //1 la password che ha inviato l'utente tramite il login
    //2 la pass dell'utente che abbiamo trovato nell'user


    if (!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Email o password errati o inesistenti'
            //meglio non dire nel message che la password è errata, 
            //meglio essere più generici possibili
        })
    }


    //generazione token
    const token = jwt.sign({
        //andiamo a mettere tutto ciò che del nostro 
        //utente vogliamo che ritorni criptato nel token
        id: account._id, //ci passiamo anche l'id per fare la pagina utente in futuro
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        birthday: account.birthday,
        avatar: account.avatar,
        role: account.role
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
        //con expiresIn:'24h' in pratica il token dopo 24 ore 
        //risulterà valido ma scaduto, quindi dovrà sloggarsi,
        //e riloggarsi per ottenere un nuovo token valido per altre 24ore,
        //lato frontend è buona norma fare un check della data del 
        //token per vedere se è uguale a quella odierna
        //se minore di quella odierna, buttiamo fuori l'utente e 
        //lo reindiriziamo al login
    })


    //adesso che abbiamo il nostro token dobbiamo farcelo 
    //restituire dall'header nel nostro login
    res.header('Authorization', token).status(200).send({
        statusCode: 200,
        message: 'login effettutato con successo',
        token
    })
})


module.exports = login;