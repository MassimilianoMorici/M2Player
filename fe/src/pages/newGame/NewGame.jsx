import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useSession from "../../hooks/useSession";
import MainLayout from "../../layouts/MainLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./newGame.css";
import "./_textEditor.scss"




const NewGame = () => {

    const session = useSession()

    const [formData, setFormData] = useState({
        title: "",
        editor: "",
        platform: "",
        category: "MMORPG",
        rate: "",
        cover: null,
    });

    const [file, setFile] = useState(null)

    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (cover) => {
        const fileData = new FormData()
        fileData.append('cover', cover)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/games/cloudUpload`, {
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

    // console.log(content);


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

            const rate = parseFloat(formData.rate);

            const uploadCover = await uploadFile(file)

            const data = {
                ...formData,
                rate: rate,
                content,
                cover: uploadCover.cover
            };

            try {

                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/create`, {
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
                <h1 className="mb-4">Aggiungi Gioco</h1>
                <Form encType="multipart/form-data" onSubmit={onSubmit} >




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

                    <Form.Label className="mt-3">Descrizione</Form.Label>
                    <ReactQuill
                        theme="snow"
                        placeholder={"Descrizione..."}
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

export default NewGame;