
// import React, { useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import useSession from "../../hooks/useSession";
// import MainLayout from "../../layouts/MainLayout";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./newPost.css";
// import "./_textEditor.scss"




// const ModPost = () => {

//     const session = useSession()

//     const [formData, setFormData] = useState({
//         author: session.id,
//         game: "",
//         title: "",
//         content: "",
//         img: null,
//         category: "Gameplay",
//     });

//     const [file, setFile] = useState(null)

//     const onChangeSetFile = (e) => {
//         setFile(e.target.files[0])
//     }

//     const uploadFile = async (img) => {
//         const fileData = new FormData()
//         fileData.append('img', img)
//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload`, {
//                 method: "POST",
//                 body: fileData
//             })
//             return await response.json()
//         } catch (e) {
//             console.log(e, "Errore in uploadFile");
//         }
//     }









//     const [content, setContent] = useState('');


//     const handleQuillChange = (value) => {
//         setContent(value);
//     };

//     console.log(content);







//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();

//         if (file) {

//             const uploadCover = await uploadFile(file)

//             const data = {
//                 ...formData,
//                 content,
//                 img: uploadCover.img
//             };

//             try {

//                 const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/create`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(data),
//                 });

//                 const responseData = await response.json();

//                 if (response.statusCode === 201) {
//                     console.log("Blog post created successfully:", responseData.payload);
//                 } else {
//                     console.error("Errore nella creazione del blog post");
//                 }

//                 // const emailResponse = await client.post("/send-email", {
//                 //     to: session.email,
//                 //     subject: 'Nuovo Blog Post',
//                 //     text: 'Creazione del blog post avvenuta con successo'
//                 // }, {
//                 //     headers: {
//                 //         "Content-Type": "application/json",
//                 //     },
//                 // });
//                 // console.log(emailResponse);

//             } catch (e) {
//                 console.error("Errore nella richiesta al server:", e);
//             }
//         }
//     };



//     return (
//         <MainLayout>

//             <Container className="new-blog-container asd">
//                 <h1 className="mb-4">Aggiungi Post</h1>
//                 <Form encType="multipart/form-data" onSubmit={onSubmit} >

//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Game</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="game"
//                             value={formData.game}
//                             onChange={handleInputChange}
//                             placeholder="Gioco"
//                         />
//                     </Form.Group>


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Titolo</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             placeholder="Titolo"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="blog-category" className="mt-3">
//                         <Form.Label>Categoria</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             as="select"
//                             name="category"
//                             value={formData.category}
//                             onChange={handleInputChange}
//                         >
//                             <option value="Easter Egg">Easter Egg</option>
//                             <option value="Gameplay">Gameplay</option>
//                             <option value="Guide">Guide</option>
//                             <option value="Nuove uscite">Nuove uscite</option>
//                             <option value="Party">Party</option>
//                             <option value="Preordini">Preordini</option>
//                             <option value="Segreti">Segreti</option>
//                             <option value="Tutorial">Tutorial</option>
//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId="blog-cover" className="mt-3">
//                         <Form.Label>Cover</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             type="file"
//                             onChange={onChangeSetFile}
//                             name="cover"
//                         />
//                     </Form.Group>


//                     <Form.Label className="mt-3">Post</Form.Label>
//                     <ReactQuill
//                         theme="snow"
//                         placeholder={"Scrivi il tuo POST..."}
//                         value={content}
//                         onChange={handleQuillChange}
//                         modules={{
//                             toolbar: [
//                                 [{ header: [1, 2, false] }],
//                                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                 [{ color: [] }, { background: [] }],
//                                 [{ list: 'ordered' }, { list: 'bullet' }],
//                                 ['link', 'image', 'video'],
//                                 ['clean']
//                             ]
//                         }}
//                     />
//                     {/* Utilizza un campo nascosto per inviare il contenuto al server */}
//                     <input type="hidden" name="content" value={content} />



//                     <Form.Group className="d-flex mt-3 justify-content-end">
//                         <Button type="reset" size="lg" variant="outline-dark">
//                             Reset
//                         </Button>
//                         <Button
//                             type="submit"
//                             size="lg"
//                             variant="dark"
//                             style={{
//                                 marginLeft: "1em",
//                             }}
//                         >
//                             Submit
//                         </Button>
//                     </Form.Group>
//                 </Form>
//             </Container>
//         </MainLayout>
//     );
// };

// export default ModPost;


/////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import useSession from "../../hooks/useSession";
// import MainLayout from "../../layouts/MainLayout";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./modPost.css";
// import "./_textEditor.scss"

// import DOMPurify from 'dompurify';
// import AxiosClient from "../../client/client";
// import { useParams } from 'react-router-dom';

// const client = new AxiosClient()

// const ModPost = () => {

//     const session = useSession()
//     const { id } = useParams();

//     console.log(id);

//     const [formData, setFormData] = useState({
//         author: session.id,
//         game: "",
//         title: "",
//         content: "",
//         img: null,
//         category: "",
//         _id: id
//     });

//     const [content, setContent] = useState('');

//     const getPostData = async () => {
//         try {
//             const response = await client.get(`/post/${id}`);
//             const postData = response.post

//             console.log(postData);

//             setFormData({
//                 author: session.id,
//                 game: postData.game,
//                 title: postData.title,
//                 content: postData.content,
//                 img: postData.img,
//                 category: postData.category,
//                 _id: id
//             });

//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPostData()
//     }, []);




//     // const [file, setFile] = useState(null)

//     // const onChangeSetFile = (e) => {
//     //     setFile(e.target.files[0])
//     // }

//     // const uploadFile = async (img) => {
//     //     const fileData = new FormData()
//     //     fileData.append('img', img)
//     //     try {
//     //         const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload`, {
//     //             method: "POST",
//     //             body: fileData
//     //         })
//     //         return await response.json()
//     //     } catch (e) {
//     //         console.log(e, "Errore in uploadFile");
//     //     }
//     // }




//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };


//     const handleQuillChange = (value) => {
//         setFormData({
//             ...formData,
//             content: value
//         });
//     };

//     console.log(content);


//     // const onSubmit = async (e) => {
//     //     e.preventDefault();

//     //     if (file) {

//     //         const uploadCover = await uploadFile(file)

//     //         const data = {
//     //             ...formData,
//     //             content,
//     //             img: uploadCover.img
//     //         };

//     //         try {

//     //             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/create`, {
//     //                 method: "POST",
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                 },
//     //                 body: JSON.stringify(data),
//     //             });

//     //             const responseData = await response.json();

//     //             if (response.statusCode === 201) {
//     //                 console.log("Blog post created successfully:", responseData.payload);
//     //             } else {
//     //                 console.error("Errore nella creazione del blog post");
//     //             }

//     //             // const emailResponse = await client.post("/send-email", {
//     //             //     to: session.email,
//     //             //     subject: 'Nuovo Blog Post',
//     //             //     text: 'Creazione del blog post avvenuta con successo'
//     //             // }, {
//     //             //     headers: {
//     //             //         "Content-Type": "application/json",
//     //             //     },
//     //             // });
//     //             // console.log(emailResponse);

//     //         } catch (e) {
//     //             console.error("Errore nella richiesta al server:", e);
//     //         }
//     //     }
//     // };






//     const onSubmit = async (e) => {
//         e.preventDefault();


//         const data = {
//             ...formData
//         };

//         try {

//             const response = await client.patch(`/post/update/${id}`, data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.statusCode === 201) {
//                 console.log("Blog post created successfully:", response.payload);
//             } else {
//                 console.error("Errore nella creazione del blog post");
//             }

//             // const emailResponse = await client.post("/send-email", {
//             //     to: session.email,
//             //     subject: 'Nuovo Blog Post',
//             //     text: 'Creazione del blog post avvenuta con successo'
//             // }, {
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //     },
//             // });
//             // console.log(emailResponse);

//         } catch (e) {
//             console.error("Errore nella richiesta al server:", e);
//         }

//     };



//     return (
//         <MainLayout>

//             <Container className="new-blog-container asd">
//                 <h1 className="mb-4">Modifica Post</h1>
//                 <Form
//                     // encType="multipart/form-data" 
//                     onSubmit={onSubmit}
//                 >

//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Game</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="game"
//                             value={formData.game}
//                             onChange={handleInputChange}
//                             placeholder="Gioco"
//                         />
//                     </Form.Group>


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Titolo</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             placeholder="Titolo"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="blog-category" className="mt-3">
//                         <Form.Label>Categoria</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             as="select"
//                             name="category"
//                             value={formData.category}
//                             onChange={handleInputChange}
//                         >
//                             <option value="Easter Egg">Easter Egg</option>
//                             <option value="Gameplay">Gameplay</option>
//                             <option value="Guide">Guide</option>
//                             <option value="Nuove uscite">Nuove uscite</option>
//                             <option value="Party">Party</option>
//                             <option value="Preordini">Preordini</option>
//                             <option value="Segreti">Segreti</option>
//                             <option value="Tutorial">Tutorial</option>
//                         </Form.Control>
//                     </Form.Group>

//                     {/* <Form.Group controlId="blog-cover" className="mt-3">
//                         <Form.Label>Cover</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             type="file"
//                             onChange={onChangeSetFile}
//                             name="cover"
//                         />
//                     </Form.Group> */}


//                     <Form.Label className="mt-3">Post</Form.Label>
//                     <ReactQuill
//                         theme="snow"
//                         placeholder={"Scrivi il tuo POST..."}
//                         value={formData.content}
//                         onChange={handleQuillChange}
//                         modules={{
//                             toolbar: [
//                                 [{ header: [1, 2, false] }],
//                                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                 [{ color: [] }, { background: [] }],
//                                 [{ list: 'ordered' }, { list: 'bullet' }],
//                                 ['link', 'image', 'video'],
//                                 ['clean']
//                             ]
//                         }}
//                     />
//                     {/* Utilizza un campo nascosto per inviare il contenuto al server */}

//                     <input type="hidden" name="content" value={content} />



//                     <Form.Group className="d-flex mt-3 justify-content-end">
//                         <Button type="reset" size="lg" variant="outline-dark">
//                             Reset
//                         </Button>
//                         <Button
//                             type="submit"
//                             size="lg"
//                             variant="dark"
//                             style={{
//                                 marginLeft: "1em",
//                             }}
//                         >
//                             Submit
//                         </Button>
//                     </Form.Group>
//                 </Form>
//             </Container>
//         </MainLayout >
//     );
// };

// export default ModPost;




//prima di alert e spinner
// import React, { useState, useEffect } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import useSession from "../../hooks/useSession";
// import MainLayout from "../../layouts/MainLayout";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./_textEditor.scss"

// import AxiosClient from "../../client/client";
// import { useParams } from 'react-router-dom';

// const client = new AxiosClient()

// const ModPost = () => {

//     const session = useSession()
//     const { id } = useParams();

//     console.log(id);

//     const [formData, setFormData] = useState({
//         author: session.id,
//         game: "",
//         title: "",
//         content: "",
//         img: null,
//         category: "",
//         _id: id
//     });

//     const [content, setContent] = useState('');

//     const getPostData = async () => {
//         try {
//             const response = await client.get(`/post/${id}`);
//             const postData = response.post

//             console.log(postData);

//             setFormData({
//                 author: session.id,
//                 game: postData.game,
//                 title: postData.title,
//                 content: postData.content,
//                 img: postData.img,
//                 category: postData.category,
//                 _id: id
//             });

//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getPostData()
//     }, []);




//     const [file, setFile] = useState(null)



//     const uploadFile = async (img) => {
//         const fileData = new FormData()
//         fileData.append('img', img)
//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload/${id}`, {
//                 method: "PATCH",
//                 body: fileData
//             })
//             return await response.json()
//         } catch (e) {
//             console.log(e, "Errore in uploadFile");
//         }
//     }




//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };


//     const handleQuillChange = (value) => {
//         setFormData({
//             ...formData,
//             content: value
//         });
//     };

//     console.log(content);


//     const onChangeSetFile = (e) => {
//         setFile(e.target.files[0])
//     }



//     // const onSubmit = async (e) => {
//     //     e.preventDefault();

//     //     if (file) {

//     //         const uploadCover = await uploadFile(file)

//     //         const data = {
//     //             ...formData,
//     //             content,
//     //             img: uploadCover.img
//     //         };

//     //         try {

//     //             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/create`, {
//     //                 method: "POST",
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                 },
//     //                 body: JSON.stringify(data),
//     //             });

//     //             const responseData = await response.json();

//     //             if (response.statusCode === 201) {
//     //                 console.log("Blog post created successfully:", responseData.payload);
//     //             } else {
//     //                 console.error("Errore nella creazione del blog post");
//     //             }

//     //             // const emailResponse = await client.post("/send-email", {
//     //             //     to: session.email,
//     //             //     subject: 'Nuovo Blog Post',
//     //             //     text: 'Creazione del blog post avvenuta con successo'
//     //             // }, {
//     //             //     headers: {
//     //             //         "Content-Type": "application/json",
//     //             //     },
//     //             // });
//     //             // console.log(emailResponse);

//     //         } catch (e) {
//     //             console.error("Errore nella richiesta al server:", e);
//     //         }
//     //     }
//     // };







//     // const onSubmit = async (e) => {
//     //     e.preventDefault();


//     //     if (file) {
//     //         const uploadCover = await uploadFile(file);
//     //         const data = {
//     //             ...formData,
//     //             img: uploadCover.img
//     //         };

//     //         try {

//     //             const response = await client.patch(`/post/update/${id}`, data, {
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                 },
//     //             });


//     //             console.log("Blog post created successfully:", response.payload);

//     //         } catch (e) {
//     //             console.error("Errore nella richiesta al server:", e);
//     //         }

//     //     } else {
//     //         const data = {
//     //             ...formData
//     //         };

//     //         try {

//     //             const response = await client.patch(`/post/update/${id}`, data, {
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                 },
//     //             });

//     //             console.log("Blog post created successfully:", response.payload);

//     //         } catch (e) {
//     //             console.error("Errore nella richiesta al server:", e);
//     //         }
//     //     }
//     // };


//     const onSubmit = async (e) => {
//         e.preventDefault();

//         let data = { ...formData };

//         if (file) {
//             const uploadCover = await uploadFile(file);
//             data = {
//                 ...data,
//                 img: uploadCover.img
//             };
//         }

//         try {
//             const response = await client.patch(`/post/update/${id}`, data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("Blog post updated successfully:", response.payload);

//         } catch (e) {
//             console.error("Error while making the request to the server:", e);
//         }
//     };



//     console.log(formData);

//     console.log("FILE: ", file);









//     return (
//         <MainLayout>

//             <Container className="new-blog-container asd">
//                 <h1 className="mb-4">Modifica Post</h1>
//                 <Form
//                     encType="multipart/form-data"
//                     onSubmit={onSubmit}
//                 >

//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Game</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="game"
//                             value={formData.game}
//                             onChange={handleInputChange}
//                             placeholder="Gioco"
//                         />
//                     </Form.Group>


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Titolo</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             placeholder="Titolo"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="blog-category" className="mt-3">
//                         <Form.Label>Categoria</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             as="select"
//                             name="category"
//                             value={formData.category}
//                             onChange={handleInputChange}
//                         >
//                             <option value="Easter Egg">Easter Egg</option>
//                             <option value="Gameplay">Gameplay</option>
//                             <option value="Guide">Guide</option>
//                             <option value="Nuove uscite">Nuove uscite</option>
//                             <option value="Party">Party</option>
//                             <option value="Preordini">Preordini</option>
//                             <option value="Segreti">Segreti</option>
//                             <option value="Tutorial">Tutorial</option>
//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId="blog-cover" className="mt-3">
//                         <Form.Label>Cover</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             type="file"
//                             //value={formData.img}
//                             onChange={onChangeSetFile}
//                             name="img"
//                         />
//                     </Form.Group>


//                     <Form.Label className="mt-3">Post</Form.Label>
//                     <ReactQuill
//                         theme="snow"
//                         placeholder={"Scrivi il tuo POST..."}
//                         value={formData.content}
//                         onChange={handleQuillChange}
//                         modules={{
//                             toolbar: [
//                                 [{ header: [1, 2, false] }],
//                                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                 [{ color: [] }, { background: [] }],
//                                 [{ list: 'ordered' }, { list: 'bullet' }],
//                                 ['link', 'image', 'video'],
//                                 ['clean']
//                             ]
//                         }}
//                     />
//                     {/* Utilizza un campo nascosto per inviare il contenuto al server */}

//                     <input type="hidden" name="content" value={content} />



//                     <Form.Group className="d-flex mt-3 justify-content-end">
//                         <Button type="reset" size="lg" variant="outline-dark">
//                             Reset
//                         </Button>
//                         <Button
//                             type="submit"
//                             size="lg"
//                             variant="dark"
//                             style={{
//                                 marginLeft: "1em",
//                             }}
//                         >
//                             Submit
//                         </Button>
//                     </Form.Group>
//                 </Form>
//             </Container>
//         </MainLayout >
//     );
// };

// export default ModPost;


import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useSession from "../../hooks/useSession";
import MainLayout from "../../layouts/MainLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./_textEditor.scss"

import AxiosClient from "../../client/client";
import { useParams } from 'react-router-dom';

import AlertMessage from '../../components/alertMessage/AlertMessage';
import { PacmanLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";

const client = new AxiosClient()

const ModPost = () => {

    const session = useSession()
    const { id } = useParams();

    const navigate = useNavigate()

    const [successMessage, setSuccessMessage] = useState(null);
    const [failedMessage, setFailedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const [formData, setFormData] = useState({
        author: session.id,
        game: "",
        title: "",
        content: "",
        img: null,
        category: "",
        _id: id
    });

    const [content, setContent] = useState('');

    const getPostData = async () => {

        setIsLoadingData(true)

        try {
            const response = await client.get(`/post/${id}`);
            const postData = response.post
            // Visualizza lo spinner per almeno 3 secondi usando setTimeout
            setTimeout(() => {
                setFormData({
                    author: session.id,
                    game: postData.game,
                    title: postData.title,
                    content: postData.content,
                    img: postData.img,
                    category: postData.category,
                    _id: id
                });
                setIsLoadingData(false); // Indica il completamento del caricamento dei dati
            }, 3000);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPostData()
    }, []);




    const [file, setFile] = useState(null)



    const uploadFile = async (img) => {
        const fileData = new FormData()
        fileData.append('img', img)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload/${id}`, {
                method: "PATCH",
                body: fileData
            })
            return await response.json()
        } catch (e) {
            console.log(e, "Errore in uploadFile");
            setFailedMessage("Errore upload del file!");
            setTimeout(() => {
                setFailedMessage(null);
            }, 3000);
        }
    }




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleQuillChange = (value) => {
        setFormData({
            ...formData,
            content: value
        });
    };



    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }



    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     if (file) {

    //         const uploadCover = await uploadFile(file)

    //         const data = {
    //             ...formData,
    //             content,
    //             img: uploadCover.img
    //         };

    //         try {

    //             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/create`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(data),
    //             });

    //             const responseData = await response.json();

    //             if (response.statusCode === 201) {
    //                 console.log("Blog post created successfully:", responseData.payload);
    //             } else {
    //                 console.error("Errore nella creazione del blog post");
    //             }

    //             // const emailResponse = await client.post("/send-email", {
    //             //     to: session.email,
    //             //     subject: 'Nuovo Blog Post',
    //             //     text: 'Creazione del blog post avvenuta con successo'
    //             // }, {
    //             //     headers: {
    //             //         "Content-Type": "application/json",
    //             //     },
    //             // });
    //             // console.log(emailResponse);

    //         } catch (e) {
    //             console.error("Errore nella richiesta al server:", e);
    //         }
    //     }
    // };







    // const onSubmit = async (e) => {
    //     e.preventDefault();


    //     if (file) {
    //         const uploadCover = await uploadFile(file);
    //         const data = {
    //             ...formData,
    //             img: uploadCover.img
    //         };

    //         try {

    //             const response = await client.patch(`/post/update/${id}`, data, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });


    //             console.log("Blog post created successfully:", response.payload);

    //         } catch (e) {
    //             console.error("Errore nella richiesta al server:", e);
    //         }

    //     } else {
    //         const data = {
    //             ...formData
    //         };

    //         try {

    //             const response = await client.patch(`/post/update/${id}`, data, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             console.log("Blog post created successfully:", response.payload);

    //         } catch (e) {
    //             console.error("Errore nella richiesta al server:", e);
    //         }
    //     }
    // };


    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setTimeout(async () => {

            let data = { ...formData };

            if (file) {
                const uploadCover = await uploadFile(file);
                data = {
                    ...data,
                    img: uploadCover.img
                };
            }

            try {
                const response = await client.patch(`/post/update/${id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.statusCode === 200) {
                    console.log("Post modificato con successo: ", response.payload);
                    setIsLoading(false)
                    setSuccessMessage("Post modificato con successo!");
                    setTimeout(() => {
                        setSuccessMessage(null);
                        navigate(`/post/${id}`)
                    }, 3000);
                } else {
                    setIsLoading(false)
                    console.error("Errore nella modifica del post");
                    setFailedMessage("Errore nella modifica del post!");
                    setTimeout(() => {
                        setFailedMessage(null);
                    }, 3000);
                }
            } catch (e) {
                setIsLoading(false)
                console.error("Error while making the request to the server:", e);
                setFailedMessage("Errore nella richiesta al server");
                setTimeout(() => {
                    setFailedMessage(null);
                }, 3000);
            }
        }, 2000);
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

            {isLoading && (
                <div className='alert-container'>
                    <PacmanLoader size={50} color="#e0d100" />
                </div>
            )}


            <Container className="new-blog-container asd">
                <h1 className="mb-4">Modifica Post</h1>

                {isLoadingData ? (
                    <div className='container d-flex justify-content-center spinner-margin'>
                        <PacmanLoader size={40} color="#e0d100" />
                    </div>
                ) : (
                    <>

                        <Form
                            encType="multipart/form-data"
                            onSubmit={onSubmit}
                        >

                            <Form.Group className="mt-3">
                                <Form.Label className="fw-bold">Game</Form.Label>
                                <Form.Control
                                    required
                                    size="lg"
                                    name="game"
                                    value={formData.game}
                                    onChange={handleInputChange}
                                    placeholder="Gioco"
                                />
                            </Form.Group>


                            <Form.Group className="mt-3">
                                <Form.Label className="fw-bold">Titolo</Form.Label>
                                <Form.Control
                                    required
                                    size="lg"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Titolo"
                                />
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label className="fw-bold">Categoria</Form.Label>
                                <Form.Control
                                    required
                                    size="lg"
                                    as="select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="Easter Egg">Easter Egg</option>
                                    <option value="Gameplay">Gameplay</option>
                                    <option value="Guide">Guide</option>
                                    <option value="Nuove uscite">Nuove uscite</option>
                                    <option value="Party">Party</option>
                                    <option value="Preordini">Preordini</option>
                                    <option value="Segreti">Segreti</option>
                                    <option value="Tutorial">Tutorial</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label className="fw-bold">Cover</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="file"
                                    //value={formData.img}
                                    onChange={onChangeSetFile}
                                    name="img"
                                />
                            </Form.Group>


                            <Form.Label className="mt-3 fw-bold">Post</Form.Label>
                            <ReactQuill
                                theme="snow"
                                placeholder={"Scrivi il tuo POST..."}
                                value={formData.content}
                                onChange={handleQuillChange}
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ color: [] }, { background: [] }],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ]
                                }}
                            />
                            {/* Utilizza un campo nascosto per inviare il contenuto al server */}

                            <input type="hidden" name="content" value={content} />



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
                    </>
                )}
            </Container>
        </MainLayout >
    );
};

export default ModPost;