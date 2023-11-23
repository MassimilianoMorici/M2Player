import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AxiosClient from "../../client/client";
import "./gestionale.css"
import { Link } from "react-router-dom";
import { CaretDownFill, CaretRightFill, Trash3 } from "react-bootstrap-icons";
import AlertMessage from '../../components/alertMessage/AlertMessage';
import { PacmanLoader } from 'react-spinners'

const client = new AxiosClient()


const Gestionale = () => {

    const [successMessage, setSuccessMessage] = useState(null);
    const [failedMessage, setFailedMessage] = useState(null);

    const [games, setGames] = useState([])
    const [posts, setPosts] = useState([])
    const [accounts, setAccounts] = useState([])

    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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
            setIsLoadingGames(true)
            const response = await client.get('/games')
            setGames(response)
            setIsLoadingGames(false)
        } catch (error) {
            console.log(error);
        }
    }

    // GET POST
    const getPosts = async () => {
        try {
            setIsLoadingPosts(true)
            const response = await client.get('/posts')
            setPosts(response)
            setIsLoadingPosts(false)
        } catch (error) {
            console.log(error);
        }
    }

    // GET ACCOUNT
    const getAccounts = async () => {
        try {
            setIsLoadingAccounts(true)
            const response = await client.get('/accounts')
            setAccounts(response)
            setIsLoadingAccounts(false)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getGames()
        getPosts()
        getAccounts()
    }, [])


    // const deleteAccount = async (idAccount) => {
    //     setIsLoadingDelete(true)
    //     try {
    //         const response = await client.delete(`account/delete/${idAccount}`)
    //         if (response.statusCode === 200) {
    //             console.log("Eliminazione account avvenuta con successo");
    //             setIsLoadingDelete(false)
    //             setSuccessMessage("Account eliminato con successo!");
    //             getAccounts()
    //             setTimeout(() => {
    //                 setSuccessMessage(null);
    //             }, 3000);

    //         } else {
    //             setIsLoadingDelete(false)
    //             console.error("Errore durante l'eliminazione dell'account", response);
    //         }

    //     } catch (error) {
    //         setIsLoadingDelete(false)
    //         console.log(error);
    //     }
    // }


    //prima della mod elimina tutto
    // const deleteAccount = async (idAccount) => {

    //     const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo account?");

    //     if (confirmDelete) {
    //         setIsLoadingDelete(true); // Mostra il loading

    //         setTimeout(async () => {
    //             try {
    //                 const response = await client.delete(`account/delete/${idAccount}`);

    //                 if (response.statusCode === 200) {
    //                     console.log("Eliminazione account avvenuta con successo");
    //                     setIsLoadingDelete(false)
    //                     setSuccessMessage("Account eliminato con successo!");
    //                     getAccounts();
    //                     setTimeout(() => {
    //                         setSuccessMessage(null);
    //                     }, 3000);
    //                 } else {
    //                     console.error("Errore durante l'eliminazione dell'account", response);
    //                     setIsLoadingDelete(false); // Nasconde il loading in caso di errore
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //                 setIsLoadingDelete(false); // Nasconde il loading in caso di eccezione
    //             }
    //         }, 2000); // Mostra il loading per 2 secondi prima di eseguire la chiamata
    //     };
    // }

    const deleteAccount = async (idAccount) => {

        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo account?");

        if (confirmDelete) {
            setIsLoadingDelete(true);

            setTimeout(async () => {
                try {
                    const response = await client.delete(`account/${idAccount}/deleteCommentPost`);

                    if (response.statusCode === 200) {
                        console.log("Eliminazione account avvenuta con successo");
                        setIsLoadingDelete(false)
                        setSuccessMessage("Account eliminato con successo!");
                        getAccounts();
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000);
                    } else {
                        console.error("Errore durante l'eliminazione dell'account", response);
                        setIsLoadingDelete(false);
                        setFailedMessage("Errore durante l'eliminazione dell'account!");
                        setTimeout(() => {
                            setFailedMessage(null);
                        }, 3000);
                    }
                } catch (error) {
                    console.log(error);
                    setIsLoadingDelete(false);
                    setFailedMessage("Errore nella richiesta al server");
                    setTimeout(() => {
                        setFailedMessage(null);
                    }, 3000);
                }
            }, 2000); // Mostra il loading per 2 secondi prima di eseguire la chiamata
        };
    }


    const handleDeleteClick = (accountId) => {
        return () => {
            deleteAccount(accountId);
        };
    };


    return (
        <MainLayout>

            {successMessage && (
                <div>
                    <AlertMessage message={successMessage} success={true} />
                </div>
            )}

            {failedMessage && (
                <div>
                    <AlertMessage message={failedMessage} success={false} />
                </div>
            )}

            {isLoadingDelete && (
                <div className='alert-container'>
                    <PacmanLoader size={50} color="#e0d100" />
                </div>
            )}

            <div className="pGestionale-main">

                {/* LISTA GAME */}
                <div className="container gestionale-bg">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            GAME
                        </h2>
                        <div onClick={toggleGames}>
                            {gamesIcon}
                        </div>
                    </div>
                    {showGames && isLoadingGames ? (
                        <div className='container d-flex justify-content-center spinner-margin'>
                            <PacmanLoader color="#e0d100" />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>


                {/* LISTA POST */}
                <div className="container gestionale-bg">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            POST
                        </h2>
                        <div onClick={togglePosts}>
                            {postsIcon}
                        </div>
                    </div>

                    {showPosts && isLoadingPosts ? (
                        <div className='container d-flex justify-content-center spinner-margin'>
                            <PacmanLoader color="#e0d100" />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>


                {/* LISTA ACCOUNT */}
                <div className="container mb-5 gestionale-bg">
                    <div className="d-flex align-items-center">
                        <h2 className="me-3 my-0" >
                            ACCOUNT
                        </h2>
                        <div onClick={toggleAccounts}>
                            {accountsIcon}
                        </div>
                    </div>

                    {showAccounts && isLoadingAccounts ? (
                        <div className='container d-flex justify-content-center spinner-margin'>
                            <PacmanLoader color="#e0d100" />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

            </div>
        </MainLayout>
    )
}

export default Gestionale;