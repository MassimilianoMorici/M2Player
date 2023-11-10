import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";


const Login = () => {

    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response =
                await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(loginData)
                })

            const data = await response.json()


            if (data.token) {
                localStorage.setItem('loggedInUser', JSON.stringify(data.token))
            }


            setLogin(data)
            navigate('/home')

        } catch (e) {
            console.log(e, "Errore nell'invio dei dati");
        }
    }



    return (
        <>

            <Container className="new-blog-container login" >
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="author-form" className="mt-3">
                        < Form.Label className="text-white"> Email </Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group >

                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control
                            className="custom-input"
                            type="text"
                            size="lg"
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="d-flex flex-column my-4 justify-content-center">

                        <Button
                            className="my-3 text-center prova"
                            type="submit"
                            size="lg"
                        >
                            Login
                        </Button>

                    </Form.Group>

                </Form >
            </Container >
        </>
    )
}

export default Login;