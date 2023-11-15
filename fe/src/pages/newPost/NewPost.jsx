// import React, { useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import useSession from "../../hooks/useSession";
// import MainLayout from "../../layouts/MainLayout";
// import "./styles.css";




// const NewPost = () => {

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

//                     <Form.Group controlId="blog-content" className="mt-3">
//                         <Form.Label>Post</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             size="lg"
//                             name="content"
//                             value={formData.content}
//                             onChange={handleInputChange}
//                             placeholder="Scrivi il tuo post..."
//                             style={{ minHeight: '200px' }}
//                         />
//                     </Form.Group>

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

// export default NewPost;



import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useSession from "../../hooks/useSession";
import MainLayout from "../../layouts/MainLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./newPost.css";
import "./_textEditor.scss"




const NewPost = () => {

    const session = useSession()

    const [formData, setFormData] = useState({
        author: session.id,
        game: "",
        title: "",
        content: "",
        img: null,
        category: "Gameplay",
    });

    const [file, setFile] = useState(null)

    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (img) => {
        const fileData = new FormData()
        fileData.append('img', img)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload`, {
                method: "POST",
                body: fileData
            })
            return await response.json()
        } catch (e) {
            console.log(e, "Errore in uploadFile");
        }
    }









    const [content, setContent] = useState('');


    const handleQuillChange = (value) => {
        setContent(value);
    };

    console.log(content);







    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (file) {

            const uploadCover = await uploadFile(file)

            const data = {
                ...formData,
                content,
                img: uploadCover.img
            };

            try {

                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();

                if (response.statusCode === 201) {
                    console.log("Blog post created successfully:", responseData.payload);
                } else {
                    console.error("Errore nella creazione del blog post");
                }

                // const emailResponse = await client.post("/send-email", {
                //     to: session.email,
                //     subject: 'Nuovo Blog Post',
                //     text: 'Creazione del blog post avvenuta con successo'
                // }, {
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // });
                // console.log(emailResponse);

            } catch (e) {
                console.error("Errore nella richiesta al server:", e);
            }
        }
    };



    return (
        <MainLayout>

            <Container className="new-blog-container asd">
                <h1 className="mb-4">Aggiungi Post</h1>
                <Form encType="multipart/form-data" onSubmit={onSubmit} >

                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Game</Form.Label>
                        <Form.Control
                            size="lg"
                            name="game"
                            value={formData.game}
                            onChange={handleInputChange}
                            placeholder="Gioco"
                        />
                    </Form.Group>


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

                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
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

                    <Form.Group controlId="blog-cover" className="mt-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control
                            size="lg"
                            type="file"
                            onChange={onChangeSetFile}
                            name="cover"
                        />
                    </Form.Group>

                    {/* <Form.Group controlId="blog-content" className="mt-3">
                        <Form.Label>Post</Form.Label>
                        <Form.Control
                            as="textarea"
                            size="lg"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Scrivi il tuo post..."
                            style={{ minHeight: '200px' }}
                        />
                    </Form.Group> */}


                    {/* <Form.Group controlId="blog-content" className="mt-3"> */}

                    <Form.Label className="mt-3">Post</Form.Label>
                    <ReactQuill
                        theme="snow"
                        placeholder={"Scrivi il tuo POST..."}
                        value={content}
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
                    {/* </Form.Group> */}


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
        </MainLayout>
    );
};

export default NewPost;