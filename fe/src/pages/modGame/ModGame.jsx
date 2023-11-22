// import React, { useState, useEffect } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import useSession from "../../hooks/useSession";
// import MainLayout from "../../layouts/MainLayout";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./modPost.css";
// import "./_textEditor.scss"

// import AxiosClient from "../../client/client";
// import { useParams } from 'react-router-dom';

// const client = new AxiosClient()

// const ModGame = () => {

//     const { id } = useParams();

//     console.log(id);

//     const [formData, setFormData] = useState({
//         title: "",
//         category: "",
//         content: "",
//         platform: "",
//         editor: "",
//         cover: null,
//         rate: 0,
//         _id: id
//     });

//     const [content, setContent] = useState('');

//     const getPostData = async () => {
//         try {
//             const response = await client.get(`/game/${id}`);
//             const postData = response.game

//             console.log(postData);

//             setFormData({
//                 title: postData.title,
//                 category: postData.category,
//                 content: postData.content,
//                 platform: postData.platform,
//                 editor: postData.editor,
//                 cover: postData.cover,
//                 rate: postData.rate,
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



//     const uploadFile = async (cover) => {
//         const fileData = new FormData()
//         fileData.append('cover', cover)
//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/cloudUpload/${id}`, {
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



//     const onSubmit = async (e) => {
//         e.preventDefault();

//         let data = { ...formData };

//         if (file) {
//             const uploadCover = await uploadFile(file);
//             data = {
//                 ...data,
//                 cover: uploadCover.cover
//             };
//         }

//         try {
//             const response = await client.patch(`/game/update/${id}`, data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("Blog post updated successfully:", response.payload);

//         } catch (e) {
//             console.error("Error while making the request to the server:", e);
//         }
//     };




//     return (
//         <MainLayout>

//             <Container className="new-blog-container asd">
//                 <h1 className="mb-4">Modifica Post</h1>
//                 <Form
//                     encType="multipart/form-data"
//                     onSubmit={onSubmit}
//                 >


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


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Editor</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="editor"
//                             value={formData.editor}
//                             onChange={handleInputChange}
//                             placeholder="Editor"
//                         />
//                     </Form.Group>


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Platform</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="platform"
//                             value={formData.platform}
//                             onChange={handleInputChange}
//                             placeholder="Piattaforma"
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
//                             <option value="MMORPG">MMORPG</option>
//                             <option value="RPG">RPG</option>
//                             <option value="FPS">FPS</option>
//                             <option value="Race">Race</option>
//                             <option value="Adventure">Adventure</option>
//                             <option value="Picchiaduro">Picchiaduro</option>

//                         </Form.Control>
//                     </Form.Group>


//                     <Form.Group controlId="blog-category" className="mt-3">
//                         <Form.Label>Voto</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             as="select"
//                             name="rate"
//                             value={formData.rate}
//                             onChange={handleInputChange}
//                         >
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                             <option value="10">10</option>
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

// export default ModGame;

////////////////////////////prima di alert e spinner
// import React, { useState, useEffect } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import MainLayout from "../../layouts/MainLayout";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "./_textEditor.scss"

// import AxiosClient from "../../client/client";
// import { useParams } from 'react-router-dom';

// const client = new AxiosClient()

// const ModGame = () => {

//     const { id } = useParams();

//     console.log(id);

//     const [formData, setFormData] = useState({
//         title: "",
//         category: "",
//         content: "",
//         platform: "",
//         editor: "",
//         cover: null,
//         rate: 0,
//         _id: id
//     });

//     const [content, setContent] = useState('');

//     const getGameData = async () => {
//         try {
//             const response = await client.get(`/game/${id}`);
//             const gameData = response.game

//             console.log(gameData);

//             setFormData({
//                 title: gameData.title,
//                 category: gameData.category,
//                 content: gameData.content,
//                 platform: gameData.platform,
//                 editor: gameData.editor,
//                 cover: gameData.cover,
//                 rate: gameData.rate,
//                 _id: id
//             });

//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         getGameData()
//     }, []);




//     const [file, setFile] = useState(null)



//     const uploadFile = async (cover) => {
//         const fileData = new FormData()
//         fileData.append('cover', cover)
//         try {
//             const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/cloudUpload/${id}`, {
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


//     const onChangeSetFile = (e) => {
//         setFile(e.target.files[0])
//     }



//     const onSubmit = async (e) => {
//         e.preventDefault();

//         let data = { ...formData };

//         if (file) {
//             const uploadCover = await uploadFile(file);
//             data = {
//                 ...data,
//                 cover: uploadCover.cover
//             };
//         }

//         try {
//             const response = await client.patch(`/game/update/${id}`, data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("Game updated successfully:", response.payload);

//         } catch (e) {
//             console.error("Error while making the request to the server:", e);
//         }
//     };




//     return (
//         <MainLayout>

//             <Container className="new-blog-container asd">
//                 <h1 className="mb-4">Modifica Post</h1>
//                 <Form
//                     encType="multipart/form-data"
//                     onSubmit={onSubmit}
//                 >


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


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Editor</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="editor"
//                             value={formData.editor}
//                             onChange={handleInputChange}
//                             placeholder="Editor"
//                         />
//                     </Form.Group>


//                     <Form.Group controlId="blog-form" className="mt-3">
//                         <Form.Label>Platform</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             name="platform"
//                             value={formData.platform}
//                             onChange={handleInputChange}
//                             placeholder="Piattaforma"
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
//                             <option value="MMORPG">MMORPG</option>
//                             <option value="RPG">RPG</option>
//                             <option value="FPS">FPS</option>
//                             <option value="Race">Race</option>
//                             <option value="Adventure">Adventure</option>
//                             <option value="Picchiaduro">Picchiaduro</option>

//                         </Form.Control>
//                     </Form.Group>


//                     <Form.Group controlId="blog-category" className="mt-3">
//                         <Form.Label>Voto</Form.Label>
//                         <Form.Control
//                             size="lg"
//                             as="select"
//                             name="rate"
//                             value={formData.rate}
//                             onChange={handleInputChange}
//                         >
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                             <option value="10">10</option>
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

// export default ModGame;


import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import MainLayout from "../../layouts/MainLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./_textEditor.scss"

import AxiosClient from "../../client/client";
import { useParams } from 'react-router-dom';

import AlertMessage from '../../components/alertMessage/AlertMessage';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { PacmanLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";

const client = new AxiosClient()

const ModGame = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        platform: "",
        editor: "",
        cover: null,
        rate: 0,
        _id: id
    });

    const [content, setContent] = useState('');

    const getGameData = async () => {
        try {
            const response = await client.get(`/game/${id}`);
            const gameData = response.game

            console.log(gameData);

            setFormData({
                title: gameData.title,
                category: gameData.category,
                content: gameData.content,
                platform: gameData.platform,
                editor: gameData.editor,
                cover: gameData.cover,
                rate: gameData.rate,
                _id: id
            });

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getGameData()
    }, []);




    const [file, setFile] = useState(null)



    const uploadFile = async (cover) => {
        const fileData = new FormData()
        fileData.append('cover', cover)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/cloudUpload/${id}`, {
                method: "PATCH",
                body: fileData
            })
            return await response.json()
        } catch (e) {
            console.log(e, "Errore in uploadFile");
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



    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setTimeout(async () => {

            let data = { ...formData };

            if (file) {
                const uploadCover = await uploadFile(file);
                data = {
                    ...data,
                    cover: uploadCover.cover
                };
            }

            try {
                const response = await client.patch(`/game/update/${id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Game updated successfully:", response.payload);
                setIsLoading(false)
                setSuccessMessage("Game modificato con successo!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate(`/game/${id}`)
                }, 3000);

            } catch (e) {
                setIsLoading(false)
                console.error("Error while making the request to the server:", e);
            }
        }, 2000);
    };




    return (
        <MainLayout>


            {successMessage && (
                <AlertMessage message={successMessage} >
                    <div><CheckCircleFill className='me-2' size={30} />{successMessage}</div>
                </AlertMessage>
            )}

            {isLoading && (
                <div className='alert-container'>
                    <PacmanLoader size={50} color="#e0d100" />
                </div>
            )}

            <Container className="new-blog-container asd">
                <h1 className="mb-4">Modifica Post</h1>
                <Form
                    encType="multipart/form-data"
                    onSubmit={onSubmit}
                >


                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control
                            size="lg"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Titolo"
                        />
                    </Form.Group>


                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Editor</Form.Label>
                        <Form.Control
                            size="lg"
                            name="editor"
                            value={formData.editor}
                            onChange={handleInputChange}
                            placeholder="Editor"
                        />
                    </Form.Group>


                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control
                            size="lg"
                            name="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                            placeholder="Piattaforma"
                        />
                    </Form.Group>

                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            size="lg"
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="MMORPG">MMORPG</option>
                            <option value="RPG">RPG</option>
                            <option value="FPS">FPS</option>
                            <option value="Race">Race</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Picchiaduro">Picchiaduro</option>

                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Voto</Form.Label>
                        <Form.Control
                            size="lg"
                            as="select"
                            name="rate"
                            value={formData.rate}
                            onChange={handleInputChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Control>
                    </Form.Group>




                    <Form.Group controlId="blog-cover" className="mt-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control
                            size="lg"
                            type="file"
                            onChange={onChangeSetFile}
                            name="cover"
                        />
                    </Form.Group>


                    <Form.Label className="mt-3">Post</Form.Label>
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
            </Container>
        </MainLayout >
    );
};

export default ModGame;