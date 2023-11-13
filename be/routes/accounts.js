const express = require('express')
const AccountModel = require('../models/account')
const accounts = express.Router()
const bcrypt = require('bcrypt')

require('dotenv').config()


const cloudUpload = require('../middleware/cloudinaryAccount')


//post con Cloudinary
accounts.post('/account/cloudUpload', cloudUpload.single('avatar'), async (req, res) => {
    try {
        res.status(200).json({ avatar: req.file.path })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})


// POST
accounts.post('/account/create', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    //livello di crittograzia, 10 è già inviolabile
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //accetta due parametri
    //1 cosa deve criptare
    //2 con che algoritmo deve criptarlo(ma noi l'abbiamo definito nel nostro salt)

    const newAccount = new AccountModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        password: hashedPassword,
        avatar: req.body.avatar,
        role: req.body.role
    })

    try {
        const account = await newAccount.save()

        res.status(201).send({
            statusCode: 201,
            message: "Account created successfully",
            payload: account
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

// GET
accounts.get('/accounts', async (req, res) => {
    try {
        const accounts = await AccountModel.find()

        res.status(200).send({
            statusCode: 200,
            accounts
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})


// GET ACCOUNT ADMIN
accounts.get('/adminAccounts', async (req, res) => {
    try {
        const accounts = await AccountModel.find({ role: 'admin' })

        res.status(200).send({
            statusCode: 200,
            accounts
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET ACCOUNT USER
accounts.get('/userAccounts', async (req, res) => {
    try {
        const accounts = await AccountModel.find({ role: 'user' })

        res.status(200).send({
            statusCode: 200,
            accounts
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

// GET BY ID
accounts.get('/account/:accountId', async (req, res) => {
    const { accountId } = req.params;


    try {

        const account = await AccountModel.findById(accountId)
        if (!account) {
            return res.status(404).send({
                statusCode: 404,
                message: "Account not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            account
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})


// PATCH
accounts.patch('/account/update/:accountId', async (req, res) => {
    const { accountId } = req.params;

    const accountExist = await AccountModel.findById(accountId)

    if (!accountExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This account does not exist!"
        })
    }

    try {

        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await AccountModel.findByIdAndUpdate(accountId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Account edited successfully",
            result
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})

// DELETE
accounts.delete('/account/delete/:accountId', async (req, res) => {
    const { accountId } = req.params;

    try {

        const account = await AccountModel.findByIdAndDelete(accountId)

        if (!account) {
            return res.status(404).send({
                statusCode: 400,
                message: "Account not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Account deleted successfully!"

        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore Interno del server"
        })
    }
})






module.exports = accounts