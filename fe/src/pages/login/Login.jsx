import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AlertMessage from '../../components/alertMessage/AlertMessage';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { PacmanLoader } from 'react-spinners'
import "./login.css";


const Login = () => {

    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setTimeout(async () => {
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

                if (response.status === 200) {
                    setIsLoading(false)
                    setSuccessMessage("Login effettuato con successo!");
                    setTimeout(() => {
                        setSuccessMessage(null);
                        navigate(`/home`)
                    }, 3000);
                } else {
                    setIsLoading(false)
                    console.error("Errore nel login")
                }
            } catch (e) {
                setIsLoading(false)
                console.log(e, "Errore nell'invio dei dati");
            }
        }, 2000)
    }



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


            <div className="new-blog-container container login " >

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
                        <Link to="/newAccount" className="text-white justify-content-center">
                            Non sei ancora registato? Registrati
                        </Link>
                    </Form.Group>

                </Form >
            </div>
        </MainLayout>
    )
}

export default Login;