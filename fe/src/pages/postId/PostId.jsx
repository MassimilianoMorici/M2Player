// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AxiosClient from '../../client/client';
// import { Button, Container, Form, Image, Modal } from 'react-bootstrap';
// import useSession from '../../hooks/useSession';
// import { Trash3, Pen } from 'react-bootstrap-icons';
// import "./postId.css";
// const client = new AxiosClient()


// const PostId = () => {

//     const session = useSession()

//     const { id } = useParams();
//     const [posts, setPosts] = useState([])
//     const [newComment, setNewComment] = useState({
//         title: "",
//         content: "",
//         author: session.id,
//         blogPost: id,
//     })
//     const [viewComments, setViewComments] = useState([])

//     const getPost = async () => {

//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`);
//             const data = await response.json()
//             setPosts(data)


//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPost();
//     }, []);

//     const getPosts = async () => {

//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/viewComments/${id}`);
//             const data = await response.json()
//             setViewComments(data)


//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPosts();
//     }, []);



//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewComment({
//             ...newComment,
//             [name]: value,
//         });
//     };


//     const onSubmit = async (e) => {
//         e.preventDefault();

//         const data = newComment

//         try {
//             const response = await client.post(`/comment/create`, data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (response.statusCode === 201) {
//                 console.log("Blog post created successfully:", response.payload);
//             } else {
//                 console.error("Errore nella creazione del blog post");
//             }

//             setNewComment({
//                 title: "",
//                 content: "",
//                 author: session.id,
//                 blogPost: id,
//             })

//             getPosts()

//         } catch (e) {
//             console.error("Errore nella richiesta al server:", e);
//         }
//     }

//     const deleteComment = async (idComment) => {

//         try {
//             const response = await client.delete(`/post/delete/${idComment}`);
//             if (response.statusCode === 200) {
//                 console.log("comment deleted successfully:");
//             } else {
//                 console.error("Errore nella eliminazione del commento");
//             }

//             getPosts()
//         } catch (e) {
//             console.error("Errore nella richiesta al server:", e);
//         }
//     }

//     const handleDeleteClick = (commentId) => {
//         return () => {
//             deleteComment(commentId);
//         };
//     };

//     const [showEditModal, setShowEditModal] = useState(false);
//     const [editComment, setEditComment] = useState({
//         _id: "",
//         title: "",
//         content: "",
//         author: session.id,
//         blogPost: id,
//     });

//     const openEditModal = (commentData) => {
//         setEditComment({
//             _id: commentData._id,
//             title: commentData.title,
//             content: commentData.content,
//             author: session.id,
//             blogPost: id,
//         });
//         setShowEditModal(true);

//     };

//     const handleModComment = (e) => {
//         const { name, value } = e.target;
//         setEditComment({
//             ...editComment,
//             [name]: value
//         })
//         console.log(editComment);
//     }

//     const handleEditComment = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await client.put(`/blogPosts/${id}/updateComment/${editComment._id}`, editComment, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.statusCode === 200) {
//                 console.log("Commento modificato con successo");
//                 setShowEditModal(false);
//                 getPosts();
//             } else {
//                 console.error("Errore durante la modifica del commento");
//             }
//         } catch (e) {
//             console.error("Errore durante la modifica del commento", e);
//         }
//     };


//     return (
//         <>
//             <NavBar />
//             <div className="blog-details-root">

//                 <Container>
//                     <Image className="blog-details-cover" src={posts.blogPost?.cover} fluid />
//                     <div className='d-flex justify-content-between align-items-center mt-5'>
//                         <h1 className="blog-details-title">{posts.blogPost?.title}</h1>
//                         <div className="blog-details-author">
//                             <img src={`${posts.blogPost?.author.avatar}`} alt="img" />
//                             <p>{`${posts.blogPost?.author.nome} ${posts.blogPost?.author.cognome}`}</p>
//                         </div>

//                     </div>
//                     <div className="d-flex justify-content-end my-3">
//                         <div>{`${posts.blogPost?.readTime.value} ${posts.blogPost?.readTime.unit} read`}</div>
//                     </div>
//                     <div>
//                         {posts.blogPost?.content}
//                     </div>
//                 </Container>

//                 <hr className='my-5' />

//                 <Container>
//                     <h1 className="blog-details-title mb-5">Aggiungi commento</h1>
//                     <Form onSubmit={onSubmit}>
//                         <Form.Group controlId="blog-form" className="mt-3">
//                             <Form.Label>Titolo</Form.Label>
//                             <Form.Control
//                                 size="lg"
//                                 name="title"
//                                 value={newComment.title}
//                                 onChange={handleInputChange}
//                                 placeholder="Titolo"
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="blog-content" className="mt-3">
//                             <Form.Label>Post</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 size="lg"
//                                 name="content"
//                                 value={newComment.content}
//                                 onChange={handleInputChange}
//                                 placeholder="Scrivi il tuo post..."
//                                 style={{ minHeight: '100px' }}
//                             />
//                         </Form.Group>

//                         <Form.Group className="d-flex mt-3 justify-content-end">
//                             <Button type="reset" size="lg" variant="outline-dark">
//                                 Reset
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 size="lg"
//                                 variant="dark"
//                                 style={{
//                                     marginLeft: "1em",
//                                 }}
//                             >
//                                 Submit
//                             </Button>
//                         </Form.Group>
//                     </Form>

//                 </Container>

//                 <hr className='my-5' />

//                 <Container>
//                     <h1 className="blog-details-title mb-5">Commenti</h1>
//                     {viewComments && viewComments.comments?.map((comment) => {

//                         return (
//                             <div key={comment._id} className='d-flex my-4'>
//                                 <img className='box-comment-img me-4'
//                                     src={`${comment.author?.avatar}`} alt="img" />

//                                 <Container className='box-comment d-flex justify-content-between'>
//                                     <div>
//                                         <p>{comment.author?.nome} {comment.author?.cognome}</p>
//                                         <h2>{comment.title}</h2>
//                                         <p>{comment.content}</p>
//                                     </div>

//                                     {session.id === comment.author?._id && (
//                                         <div>
//                                             <Pen onClick={() => openEditModal(comment)} color="red" size={25} role="button" />
//                                             <Trash3 onClick={handleDeleteClick(comment._id)} color="red" size={25} role="button" className='mx-3' />
//                                         </div>
//                                     )}
//                                 </Container>
//                             </div>
//                         )
//                     })}
//                 </Container >


//                 <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Modifica Commento</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form onSubmit={handleEditComment}>
//                             <Form.Group controlId="editRate">
//                                 <Form.Label className='ms-2'>Titolo</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="title"
//                                     value={editComment.title}
//                                     onChange={handleModComment}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="editComment">
//                                 <Form.Label className='mt-3 ms-2'>Post</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     name="content"
//                                     value={editComment.content}
//                                     onChange={handleModComment}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Button className='mt-3' type="submit">Salva Modifiche</Button>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </>
//     );

// }
// export default PostId;

//////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Image } from 'react-bootstrap';

// import "./postId.css";


// const PostId = () => {



//     const { id } = useParams();
//     const [posts, setPosts] = useState([])


//     const getPost = async () => {

//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`);
//             const data = await response.json()
//             setPosts(data)


//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPost();
//     }, []);

//     console.log(posts);


//     return (
//         <>

//             <div className="blog-details-root">

//                 <Container>
//                     <Image className="blog-details-cover" src={posts.post?.img} fluid />
//                     <div className='d-flex justify-content-between align-items-center mt-5'>
//                         <h1 className="blog-details-title">{posts.post?.title}</h1>
//                         <div className="blog-details-author">
//                             <img src={`${posts.post?.author.avatar}`} alt="img" />
//                             <p>{`${posts.post?.author.firstName} ${posts.post?.author.lastName}`}</p>
//                         </div>

//                     </div>
//                     <div className="d-flex justify-content-end my-3">
//                         <div></div>
//                     </div>
//                     <div>
//                         {posts.post?.content}
//                     </div>
//                 </Container>




//             </div>
//         </>
//     );

// }
// export default PostId;


/////////////////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Image } from 'react-bootstrap';
// import DOMPurify from 'dompurify';
// import MainLayout from '../../layouts/MainLayout';




// import "./postId.css";


// const PostId = () => {



//     const { id } = useParams();
//     const [posts, setPosts] = useState([])


//     const getPost = async () => {

//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`);
//             const data = await response.json()
//             setPosts(data)


//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPost();
//     }, []);

//     console.log(posts);



//     const sanitizedHTML = DOMPurify.sanitize(posts.post?.content);


//     console.log("Posts:", posts);
//     console.log("Sanitized HTML:", sanitizedHTML);
//     console.log("CONTENT", posts.post?.content);


//     return (
//         <MainLayout>

//             <div className="blog-details-root">

//                 <Container>
//                     <Image className="blog-details-cover" src={posts.post?.img} fluid />
//                     <div className='d-flex justify-content-between align-items-center mt-5'>
//                         <h1 className="blog-details-title">{posts.post?.title}</h1>
//                         <div className="blog-details-author">
//                             <img src={`${posts.post?.author.avatar}`} alt="img" />
//                             <p>{`${posts.post?.author.firstName} ${posts.post?.author.lastName}`}</p>
//                         </div>

//                     </div>
//                     <div className="d-flex justify-content-end my-3">
//                         <div></div>
//                     </div>

//                     <div>
//                         <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
//                     </div>

//                 </Container>
//             </div>
//         </MainLayout>
//     );

// }
// export default PostId;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, Image, Modal } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import MainLayout from '../../layouts/MainLayout';
import AxiosClient from '../../client/client';
import useSession from '../../hooks/useSession';
import { Trash3, Pen } from 'react-bootstrap-icons';




import "./postId.css";


const PostId = () => {

    const session = useSession()
    const client = new AxiosClient()
    const { id } = useParams();
    const [posts, setPosts] = useState([])

    const [newComment, setNewComment] = useState({
        title: "",
        content: "",
        author: session.id,
        post: id,
    })
    // const [viewComments, setViewComments] = useState([])


    const getPost = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`);
            const data = await response.json()
            setPosts(data)


        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    // console.log(posts);



    const sanitizedHTML = DOMPurify.sanitize(posts.post?.content);


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
                console.log("Blog post created successfully:", response.payload);
            } else {
                console.error("Errore nella creazione del blog post");
            }

            setNewComment({
                title: "",
                content: "",
                author: session.id,
                post: id,
            })

            getPosts()

        } catch (e) {
            console.error("Errore nella richiesta al server:", e);
        }
    }


    //get commenti

    const [viewComments, setViewComments] = useState([])

    const getPosts = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/viewComments/${id}`);
            const data = await response.json()
            setViewComments(data)


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

        try {
            const response = await client.delete(`/comment/delete/${idComment}`);
            if (response.statusCode === 200) {
                console.log("comment deleted successfully:");
            } else {
                console.error("Errore nella eliminazione del commento");
            }

            getPosts()
        } catch (e) {
            console.error("Errore nella richiesta al server:", e);
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
        post: id,
    });

    const openEditModal = (commentData) => {
        setEditComment({
            _id: commentData._id,
            title: commentData.title,
            content: commentData.content,
            author: session.id,
            post: id,
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
                getPosts();
            } else {
                console.error("Errore durante la modifica del commento");
            }
        } catch (e) {
            console.error("Errore durante la modifica del commento", e);
        }
    };



    return (
        <MainLayout>

            <div className="blog-details-root">

                <div className='container'>
                    <Image className="blog-details-cover" src={posts.post?.img} fluid />
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <h1 className="blog-details-title">{posts.post?.title}</h1>
                    </div>
                    <div className="blog-details-author justify-content-between align-items-center mt-3">
                        <h3>Categoria: {posts.post?.category}</h3>

                        <div className='d-flex align-items-center'>
                            <img src={`${posts.post?.author.avatar}`} alt="img" />
                            <p>{`${posts.post?.author.firstName} ${posts.post?.author.lastName}`}</p>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                    </div>
                </div>

                <hr className='my-5' />

                <Container>
                    <h1 className="blog-details-title mb-5">Aggiungi commento</h1>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="blog-form" className="mt-3">
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                size="lg"
                                name="title"
                                value={newComment.title}
                                onChange={handleInputChange}
                                placeholder="Titolo"
                            />
                        </Form.Group>
                        <Form.Group controlId="blog-content" className="mt-3">
                            <Form.Label>Post</Form.Label>
                            <Form.Control
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


                <hr className='my-5' />

                <Container>
                    <h1 className="blog-details-title mb-5">Commenti</h1>
                    {viewComments && viewComments.comments?.map((comment) => {

                        return (
                            <div key={comment._id} className='d-flex my-4'>
                                <img className='box-comment-img me-4'
                                    src={`${comment.author?.avatar}`} alt="img" />

                                <Container className='box-comment d-flex justify-content-between'>
                                    <div>
                                        <h5>{comment.author?.firstName} {comment.author?.lastName}</h5>
                                        <h2>{comment.title}</h2>
                                        <p>{comment.content}</p>
                                    </div>

                                    <div>
                                        {/* se sei l'autore puoi modificare il commento */}
                                        {session.id === comment.author?._id && (
                                            <Pen onClick={() => openEditModal(comment)} color="red" size={25} role="button" />)}

                                        {/* se sei l'autore o l'admin puoi eliminare il commento */}
                                        {(session.id === comment.author?._id || session.role === "admin") && (
                                            <Trash3 onClick={handleDeleteClick(comment._id)} color="red" size={25} role="button" className='mx-3' />)}
                                    </div>

                                </Container>
                            </div>
                        )
                    })}
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
            </div>


        </MainLayout>
    );

}
export default PostId;