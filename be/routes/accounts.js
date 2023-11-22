const express = require('express')
const AccountModel = require('../models/account')
const CommentModel = require('../models/comment')
const PostModel = require('../models/post')
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


// DELETE INCREDIBILE
// accounts.delete('/account/:accountId/deleteCommentPost', async (req, res) => {
//     try {
//         const accountId = req.params.accountId;
//         const account = await AccountModel.findById(accountId)

//         if (!account) {
//             return res.status(404).send({
//                 statusCode: 404,
//                 message: "Account not found"
//             })
//         }

//         const comments = await CommentModel.find({ author: accountId })
//         if (!comments || comments.length === 0) {
//             return res.status(404).send({
//                 statusCode: 404,
//                 message: "No comments created by this account"
//             })
//         }

//         // Eliminazione dei commenti associati all'account
//         await CommentModel.deleteMany({ author: accountId })

//         res.status(200).send({
//             statusCode: 200,
//             message: "All comments for this account have been deleted"
//         })

//         const posts = await PostModel.find({ author: accountId })
//         if (!posts || posts.length === 0) {
//             return res.status(404).send({
//                 statusCode: 404,
//                 message: "No posts created by this account"
//             })
//         }

//         // Eliminazione dei post associati all'account
//         await PostModel.deleteMany({ author: accountId })

//         res.status(200).send({
//             statusCode: 200,
//             message: "All posts for this account have been deleted"
//         })

//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Internal server error"
//         })
//     }
// })
accounts.delete('/account/:accountId/deleteCommentPost', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const account = await AccountModel.findById(accountId);

        if (!account) {
            return res.status(404).send({
                statusCode: 404,
                message: "Account not found"
            });
        }

        // Trova e elimina i commenti associati all'account
        const deleteCommentsResult = await CommentModel.deleteMany({ author: accountId });
        console.log("Deleted comments result:", deleteCommentsResult); // Log per debug



        // Trova e elimina i post associati all'account
        //Recupero dei post associati all'account: Utilizza PostModel.find({ author: accountId }) 
        //per trovare tutti i post che sono stati creati dall'account specificato.
        const posts = await PostModel.find({ author: accountId });

        //Iterazione attraverso i post: Una volta ottenuti i post, il codice itera attraverso 
        //ciascun post trovato utilizzando un ciclo for...of. Per ogni post:
        for (const post of posts) {
            //Eliminazione dei commenti associati al post: Utilizza CommentModel.deleteMany({ post: post._id })
            // per eliminare tutti i commenti associati a quel post specifico. 
            //Questo passaggio garantisce che i commenti vengano eliminati prima del post.
            const deletePostCommentsResult = await CommentModel.deleteMany({ post: post._id });
            console.log("Deleted post comments result:", deletePostCommentsResult); // Log per debug
            //Eliminazione del post stesso: Successivamente, PostModel.deleteOne({ _id: post._id }) 
            //viene utilizzato per eliminare il singolo post trovato nel ciclo corrente.
            const deletePostResult = await PostModel.deleteOne({ _id: post._id });
            console.log("Deleted post result:", deletePostResult); // Log per debug
        }
        //Eliminazione di eventuali rimanenti post associati all'account: Una volta completata l'iterazione e 
        //l'eliminazione di tutti i singoli post e dei loro commenti, viene eseguita un'ulteriore eliminazione per garantire 
        //che non ci siano post rimasti associati all'account. 
        //Questo avviene con PostModel.deleteMany({ author: accountId }).
        const deletePostsResult = await PostModel.deleteMany({ author: accountId });
        console.log("Deleted posts result:", deletePostsResult); // Log per debug



        // Elimina l'account stesso dopo aver eliminato i commenti e i post correlati
        const deleteAccountResult = await AccountModel.findByIdAndDelete(accountId);
        console.log("Deleted account result:", deleteAccountResult); // Log per debug

        res.status(200).send({
            statusCode: 200,
            message: "Account, comments, and posts have been deleted"
        });

    } catch (e) {
        console.error("Error:", e); // Log dell'errore
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });
    }
});






module.exports = accounts