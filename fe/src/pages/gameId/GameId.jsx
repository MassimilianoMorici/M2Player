// import React from "react";


// const GameId = () => {


//     return (
//         <>
//             asd
//         </>
//     )
// }

// export default GameId


import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Image, Modal } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import MainLayout from '../../layouts/MainLayout';
import AxiosClient from '../../client/client';
import useSession from '../../hooks/useSession';
import { Trash3, Pen } from 'react-bootstrap-icons';
import AlertMessage from '../../components/alertMessage/AlertMessage';
import { PacmanLoader } from 'react-spinners'




import "./gameId.css";


const GameId = () => {

    const session = useSession()
    const client = new AxiosClient()
    const navigate = useNavigate()
    const { id } = useParams();

    const [posts, setPosts] = useState([])
    const [successMessage, setSuccessMessage] = useState(null);
    const [failedMessage, setFailedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [viewComments, setViewComments] = useState([])

    const [newComment, setNewComment] = useState({
        title: "",
        content: "",
        author: session.id,
        game: id,
    })
    // const [viewComments, setViewComments] = useState([])


    //GET GAME ID
    const getPost = async () => {

        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/${id}`);
            const data = await response.json()
            setPosts(data)
            setIsLoading(false)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    // console.log(posts);



    const sanitizedHTML = DOMPurify.sanitize(posts.game?.content);


    // console.log("Posts:", posts);
    // console.log("Sanitized HTML:", sanitizedHTML);
    // console.log("CONTENT", posts.post?.content);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };


    //POST COMMENTI
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = newComment

        try {
            const response = await client.post(`/comment/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.statusCode === 201) {
                console.log("Commento creato con successo: ", response.payload);
                setSuccessMessage("Commento creato con successo!");
                getPosts()

                setNewComment({
                    title: "",
                    content: "",
                    author: session.id,
                    game: id,
                })
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);

            } else {
                console.error("Errore nella creazione del commento");
                setFailedMessage("Errore nella creazione del commento!");
                setTimeout(() => {
                    setFailedMessage(null);
                }, 3000);
            }
        } catch (e) {
            console.error("Errore nella richiesta al server:", e);
            setFailedMessage("Errore nella richiesta al server");
            setTimeout(() => {
                setFailedMessage(null);
            }, 3000);
        }
    }


    //GET COMMENTI
    const getPosts = async () => {

        setIsLoadingComments(true)

        try {

            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/viewComments/${id}`);
            const data = await response.json()
            setViewComments(data)
            setIsLoadingComments(false)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // console.log(viewComments);

    //DELETE COMMENT
    const deleteComment = async (idComment) => {

        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo commento?");

        if (confirmDelete) {

            try {

                const response = await client.delete(`/comment/delete/${idComment}`);

                if (response.statusCode === 200) {
                    setSuccessMessage("Commento eliminato con successo!");
                    getPosts()
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);

                } else {
                    console.error("Errore nella eliminazione del commento");
                    setFailedMessage("Errore nella eliminazione del commento!");
                    setTimeout(() => {
                        setFailedMessage(null);
                    }, 3000);
                }

            } catch (e) {
                console.error("Errore nella richiesta al server:", e);
                setFailedMessage("Errore nella richiesta al server");
                setTimeout(() => {
                    setFailedMessage(null);
                }, 3000);
            }
        }
    }

    const handleDeleteClick = (commentId) => {
        return () => {
            deleteComment(commentId);
        };
    };

    //PATCH DEL COMMENTO
    const [showEditModal, setShowEditModal] = useState(false);
    const [editComment, setEditComment] = useState({
        _id: "",
        title: "",
        content: "",
        author: session.id,
        game: id,
    });

    const openEditModal = (commentData) => {
        setEditComment({
            _id: commentData._id,
            title: commentData.title,
            content: commentData.content,
            author: session.id,
            game: id,
        });
        setShowEditModal(true);

    };

    const handleModComment = (e) => {
        const { name, value } = e.target;
        setEditComment({
            ...editComment,
            [name]: value
        })
        console.log(editComment);
    }

    const handleEditComment = async (e) => {
        e.preventDefault();
        try {
            const response = await client.patch(`/comment/update/${editComment._id}`, editComment, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.statusCode === 200) {
                console.log("Commento modificato con successo");
                setShowEditModal(false);
                setSuccessMessage("Commento modificato con successo!");
                getPosts()
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);

            } else {
                console.error("Errore durante la modifica del commento");
                setFailedMessage("Errore durante la modifica del commento!");
                setTimeout(() => {
                    setFailedMessage(null);
                }, 3000);
            }
        } catch (e) {
            console.error("Errore nella richiesta al server", e);
            setFailedMessage("Errore nella richiesta al server");
            setTimeout(() => {
                setFailedMessage(null);
            }, 3000);
        }
    };


    //DELETE del game con controllo ed eliminazione dei commenti relativi
    // const deleteGame = async () => {

    //     setIsLoadingDelete(true)

    //     // Se ci sono commenti
    //     if (viewComments.comments.length > 0) {
    //         try {
    //             const responseComments = await client.delete(`/game/${id}/deleteAllComment`);

    //             if (responseComments.statusCode === 200) {
    //                 console.log("Eliminazione commenti del game avvenuta con successo");
    //             } else {
    //                 console.error("Errore durante l'eliminazione dei commenti del game", responseComments);
    //             }

    //         } catch (error) {
    //             console.error("Errore generico durante l'eliminazione", error);
    //         }
    //     }

    //     try {

    //         // Procedi con l'eliminazione del game
    //         const responseGame = await client.delete(`/game/delete/${id}`);

    //         if (responseGame.statusCode === 200) {
    //             console.log("Eliminazione game avvenuta con successo");
    //             setSuccessMessage("Game eliminato con successo!");
    //             setTimeout(() => {
    //                 setSuccessMessage(null);
    //                 navigate('/home')
    //             }, 3000);

    //         } else {
    //             console.error("Errore durante l'eliminazione del game", responseGame);
    //         }
    //         setIsLoadingDelete(false)
    //     } catch (error) {
    //         console.error("Errore generico durante l'eliminazione", error);
    //     }
    // };

    //DELETE GAME
    const deleteGame = async () => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo game?");

        if (confirmDelete) {

            setIsLoadingDelete(true)

            setTimeout(async () => {
                // Se ci sono commenti
                if (viewComments.comments.length > 0) {
                    try {
                        const responseComments = await client.delete(`/game/${id}/deleteAllComment`);

                        if (responseComments.statusCode === 200) {
                            console.log("Eliminazione commenti del game avvenuta con successo");
                        } else {
                            console.error("Errore durante l'eliminazione dei commenti del game", responseComments);
                            setIsLoadingDelete(false)
                            setFailedMessage("Errore durante l'eliminazione dei commenti del game!");
                            setTimeout(() => {
                                setFailedMessage(null);
                            }, 3000);
                        }

                    } catch (error) {
                        setIsLoadingDelete(false)
                        console.error("Errore generico durante l'eliminazione", error);
                        setFailedMessage("Errore nella richiesta al server");
                        setTimeout(() => {
                            setFailedMessage(null);
                        }, 3000);
                    }
                }

                try {

                    // Procedi con l'eliminazione del game
                    const responseGame = await client.delete(`/game/delete/${id}`);

                    if (responseGame.statusCode === 200) {
                        console.log("Eliminazione game avvenuta con successo");
                        setIsLoadingDelete(false)
                        setSuccessMessage("Game eliminato con successo!");
                        setTimeout(() => {
                            setSuccessMessage(null);
                            navigate('/home')
                        }, 3000);

                    } else {
                        setIsLoadingDelete(false)
                        console.error("Errore durante l'eliminazione del game", responseGame);
                        setFailedMessage("Errore durante l'eliminazione del game!");
                        setTimeout(() => {
                            setFailedMessage(null);
                        }, 3000);
                    }

                } catch (error) {
                    setIsLoadingDelete(false)
                    console.error("Errore generico durante l'eliminazione", error);
                    setFailedMessage("Errore nella richiesta al server");
                    setTimeout(() => {
                        setFailedMessage(null);
                    }, 3000);
                }
            }, 2000);
        };
    }



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


            <div className='container component-bg m-t-IdPage'>

                {isLoading ? (
                    <div className='container d-flex justify-content-center spinner-margin'>
                        <PacmanLoader color="#e0d100" />
                    </div>
                ) : (
                    <div>
                        <Image className="img-Idpage" src={posts.game?.cover} fluid />
                        <div className='mt-5'>
                            <h1 className="fw-bold">{posts.game?.title}</h1>
                            <h6 className="fw-bold">{posts.game?.editor}</h6>
                            <h5 className="fw-bold">{posts.game?.platform}</h5>
                            <h5>Categoria: {posts.game?.category}</h5>
                        </div>

                        <div className='mt-5'>
                            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                        </div>

                        {/* se sei l'autore puoi modificare o eliminare il post */}
                        {session.role === "admin" && (
                            <div className='container d-flex justify-content-end'>
                                <Link to={`/modGame/${posts.game?._id}`}>
                                    <Button variant="outline-primary">Modifica</Button>
                                </Link>
                                <Button onClick={deleteGame} variant="outline-success" className='ms-2'>Elimina</Button>
                            </div>
                        )}
                    </div>
                )}

            </div>


            <Container className='component-bg'>
                <h1 className="fw-bold mb-5">Aggiungi commento</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label className='fw-bold'>Titolo</Form.Label>
                        <Form.Control
                            required
                            size="lg"
                            name="title"
                            value={newComment.title}
                            onChange={handleInputChange}
                            placeholder="Titolo"
                        />
                    </Form.Group>
                    <Form.Group controlId="blog-content" className="mt-3">
                        <Form.Label className='fw-bold'>Post</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            size="lg"
                            name="content"
                            value={newComment.content}
                            onChange={handleInputChange}
                            placeholder="Scrivi il tuo post..."
                            style={{ minHeight: '100px' }}
                        />
                    </Form.Group>

                    <Form.Group className="d-flex mt-3 justify-content-end">
                        <Button type="reset" size="lg" variant="outline-dark">
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            variant="dark"
                            style={{
                                marginLeft: "1em",
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Group>
                </Form>

            </Container>


            <Container className='component-bg'>
                <h1 className="fw-bold mb-5">Commenti</h1>

                {isLoadingComments ? (
                    <div className='container d-flex justify-content-center mb-5'>
                        <PacmanLoader color="#e0d100" />
                    </div>
                ) : (
                    <div>
                        {viewComments && viewComments.comments?.map((comment) => {

                            return (
                                <div key={comment._id} className='d-flex my-4'>
                                    <div className='box-comment-img me-2'>
                                        <img src={`${comment.author?.avatar}`} alt="img" />
                                    </div>
                                    <Container className='box-comment'>
                                        <div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h5>{comment.author?.firstName} {comment.author?.lastName}</h5>
                                                <div>
                                                    {/* se sei l'autore puoi modificare il commento */}
                                                    {session.id === comment.author?._id && (
                                                        <Pen onClick={() => openEditModal(comment)} color="red" size={25} role="button" />)}

                                                    {/* se sei l'autore o l'admin puoi eliminare il commento */}
                                                    {(session.id === comment.author?._id || session.role === "admin") && (
                                                        <Trash3 onClick={handleDeleteClick(comment._id)} color="red" size={25} role="button" className='mx-3' />)}
                                                </div>
                                            </div>
                                            <h2>{comment.title}</h2>
                                            <p>{comment.content}</p>
                                        </div>



                                    </Container>
                                </div>
                            )
                        })}
                    </div>
                )}
            </Container >



            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Commento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditComment}>
                        <Form.Group controlId="editRate">
                            <Form.Label className='ms-2'>Titolo</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editComment.title}
                                onChange={handleModComment}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editComment">
                            <Form.Label className='mt-3 ms-2'>Post</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={editComment.content}
                                onChange={handleModComment}
                                required
                            />
                        </Form.Group>
                        <Button className='mt-3' type="submit">Salva Modifiche</Button>
                    </Form>
                </Modal.Body>
            </Modal>



        </MainLayout>
    );

}
export default GameId;