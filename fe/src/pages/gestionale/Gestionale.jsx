import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AxiosClient from "../../client/client";
import "./gestionale.css"
import { Link } from "react-router-dom";
import { CaretDownFill, CaretRightFill, Trash3 } from "react-bootstrap-icons";


const client = new AxiosClient()


const Gestionale = () => {


    const [games, setGames] = useState([])
    const [posts, setPosts] = useState([])
    const [accounts, setAccounts] = useState([])

    const [showGames, setShowGames] = useState(false)
    const [showPosts, setShowPosts] = useState(false)
    const [showAccounts, setShowAccounts] = useState(false)

    const [gamesIcon, setGamesIcon] = useState(<CaretRightFill color="black" size={35} role="button" />)
    const [postsIcon, setPostsIcon] = useState(<CaretRightFill color="black" size={35} role="button" />)
    const [accountsIcon, setAccountsIcon] = useState(<CaretRightFill color="black" size={35} role="button" />)

    const toggleGames = () => {
        setShowGames(!showGames);
        setGamesIcon(showGames ? <CaretRightFill color="black" size={35} role="button" /> : <CaretDownFill color="black" size={35} role="button" />)
    }

    const togglePosts = () => {
        setShowPosts(!showPosts);
        setPostsIcon(showPosts ? <CaretRightFill color="black" size={35} role="button" /> : <CaretDownFill color="black" size={35} role="button" />)
    }

    const toggleAccounts = () => {
        setShowAccounts(!showAccounts);
        setAccountsIcon(showAccounts ? <CaretRightFill color="black" size={35} role="button" /> : <CaretDownFill color="black" size={35} role="button" />)
    }

    // GET GAME
    const getGames = async () => {
        try {
            const response = await client.get('/games')
            setGames(response)
        } catch (error) {
            console.log(error);
        }
    }

    // GET POST
    const getPosts = async () => {
        try {
            const response = await client.get('/posts')
            setPosts(response)
        } catch (error) {
            console.log(error);
        }
    }

    // GET ACCOUNT
    const getAccounts = async () => {
        try {
            const response = await client.get('/accounts')
            setAccounts(response)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getGames()
        getPosts()
        getAccounts()
    }, [])


    const deleteAccount = async (idAccount) => {
        try {
            const response = await client.delete(`account/delete/${idAccount}`)
            if (response.statusCode === 200) {
                console.log("Eliminazione account avvenuta con successo");
                getAccounts()
            } else {
                console.error("Errore durante l'eliminazione dell'account", response);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleDeleteClick = (accountId) => {
        return () => {
            deleteAccount(accountId);
        };
    };


    console.log("GET GAME: ", games);
    console.log("GET POST: ", posts.posts);
    console.log("GET ACCOUNT: ", accounts);

    return (
        <MainLayout>
            <div className="pGestionale-main">



                {/* LISTA GAME */}
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            GAME
                        </h2>
                        <div onClick={toggleGames}>
                            {gamesIcon}
                        </div>
                    </div>
                    {showGames && games && games.games?.map((game) => {
                        return (
                            <Link
                                key={game._id}
                                to={`/game/${game._id}`}
                                className='d-flex align-items-center my-4 p-account-box-singlePost'>
                                <div>
                                    <img className="img-postmap me-3" src={`${game.cover}`} alt="" />
                                </div>
                                <h2>{game.title}</h2>
                            </Link>
                        )
                    })}
                </div>

                <hr className="my-5" />

                {/* LISTA POST */}
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            POST
                        </h2>
                        <div onClick={togglePosts}>
                            {postsIcon}
                        </div>
                    </div>

                    {showPosts && posts && posts.posts?.map((post) => {
                        return (
                            <Link
                                key={post._id}
                                to={`/post/${post._id}`}
                                className='d-flex align-items-center my-4 p-account-box-singlePost'>
                                <div>
                                    <img className="img-postmap me-3" src={`${post.img}`} alt="" />
                                </div>
                                <h2>{post.title}</h2>
                            </Link>
                        )
                    })}
                </div>

                <hr className="my-5" />

                {/* LISTA ACCOUNT */}
                <div className="container mb-5">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            ACCOUNT
                        </h2>
                        <div onClick={toggleAccounts}>
                            {accountsIcon}
                        </div>
                    </div>

                    {showAccounts && accounts && accounts.accounts?.map((account) => {
                        return (
                            <div
                                key={account._id}
                                className='d-flex justify-content-between align-items-center my-4 p-account-box-singlePost'>
                                <div className="d-flex">
                                    <div>
                                        <img className="img-postmap me-3" src={`${account.avatar}`} alt="" />
                                    </div>
                                    <h2>{account.email}</h2>
                                </div>
                                {/* si possono eliminare solo gli account user */}
                                {account.role === "user" &&
                                    <Trash3 onClick={handleDeleteClick(account._id)} color="red" size={25} role="button" className='mx-3' />
                                }
                            </div>
                        )
                    })}
                </div>

            </div>
        </MainLayout>
    )
}

export default Gestionale;