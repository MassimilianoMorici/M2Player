// import React, { useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import MainLayout from "../../layouts/MainLayout";
// import AlertMessage from '../../components/alertMessage/AlertMessage';
// import { CheckCircleFill } from 'react-bootstrap-icons';
// import { PacmanLoader } from 'react-spinners'
// import "./login.css";


// const Login = () => {

//     const [loginData, setLoginData] = useState({})
//     const [login, setLogin] = useState(null)
//     const navigate = useNavigate()
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value
//         })
//     }

//     const onSubmit = async (e) => {
//         e.preventDefault()

//         setIsLoading(true)
//         setTimeout(async () => {
//             try {
//                 const response =
//                     await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         method: "POST",
//                         body: JSON.stringify(loginData)
//                     })

//                 const data = await response.json()


//                 if (data.token) {
//                     localStorage.setItem('loggedInUser', JSON.stringify(data.token))
//                 }
//                 setLogin(data)

//                 if (response.status === 200) {
//                     setIsLoading(false)
//                     setSuccessMessage("Login effettuato con successo!");
//                     setTimeout(() => {
//                         setSuccessMessage(null);
//                         navigate(`/home`)
//                     }, 3000);
//                 } else {
//                     setIsLoading(false)
//                     console.error("Errore nel login")
//                 }
//             } catch (e) {
//                 setIsLoading(false)
//                 console.log(e, "Errore nell'invio dei dati");
//             }
//         }, 2000)
//     }



//     return (
//         <MainLayout>

//             {successMessage && (
//                 <AlertMessage message={successMessage} >
//                     <div><CheckCircleFill className='me-2' size={30} />{successMessage}</div>
//                 </AlertMessage>
//             )}

//             {isLoading && (
//                 <div className='alert-container'>
//                     <PacmanLoader size={50} color="#e0d100" />
//                 </div>
//             )}


//             <div className="new-blog-container container login " >

//                 <Form onSubmit={onSubmit}>
//                     <Form.Group className="mt-3">
//                         < Form.Label className="text-white fw-bold"> Email </Form.Label>
//                         <Form.Control
//                             type="text"
//                             size="lg"
//                             name="email"
//                             placeholder="Email"
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group >

//                     <Form.Group className="mt-3">
//                         <Form.Label className="text-white fw-bold">Password</Form.Label>
//                         <Form.Control
//                             className="custom-input"
//                             type="password"
//                             size="lg"
//                             name="password"
//                             placeholder="Password"
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="d-flex flex-column my-4 justify-content-center">
//                         <Button
//                             className="my-3 text-center prova fw-bold"
//                             type="submit"
//                             size="lg"
//                         >
//                             Login
//                         </Button>
//                         <Link to="/newAccount" className="text-white justify-content-center fw-bold">
//                             Non sei ancora registato? Registrati
//                         </Link>
//                     </Form.Group>

//                 </Form >
//             </div>
//         </MainLayout>
//     )
// }

// export default Login;



import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AlertMessage from '../../components/alertMessage/AlertMessage';
import { EyeFill } from 'react-bootstrap-icons';
import { PacmanLoader } from 'react-spinners'
import "./login.css";


const Login = () => {

    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState(null);
    const [failedMessage, setFailedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


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
                    setFailedMessage("Email o password errati!");
                    setTimeout(() => {
                        setFailedMessage(null);
                    }, 3000);
                }
            } catch (e) {
                setIsLoading(false)
                console.log(e, "Errore nell'invio dei dati");
                setFailedMessage("Errore nella richiesta al server");
                setTimeout(() => {
                    setFailedMessage(null);
                }, 3000);
            }
        }, 2000)
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

            {isLoading && (
                <div className='alert-container'>
                    <PacmanLoader size={50} color="#e0d100" />
                </div>
            )}


            <div className="new-blog-container container login " >

                <Form onSubmit={onSubmit}>
                    <Form.Group className="mt-3">
                        < Form.Label className="text-white fw-bold"> Email </Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group >

                    <Form.Group className="mt-3">
                        <div className="d-flex justify-content-between mb-1">
                            <Form.Label className="text-white fw-bold">Password</Form.Label>
                            <EyeFill className='ms-2' role="button" color="white" size={30} onClick={togglePasswordVisibility} />
                        </div>
                        <Form.Control
                            className="custom-input"
                            type={showPassword ? 'text' : 'password'}
                            size="lg"
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="d-flex flex-column my-4 justify-content-center">
                        <Button
                            className="my-3 text-center prova fw-bold"
                            type="submit"
                            size="lg"
                        >
                            Login
                        </Button>
                        <Link to="/newAccount" className="text-white justify-content-center fw-bold">
                            Non sei ancora registato? Registrati
                        </Link>
                    </Form.Group>

                </Form >
            </div>
        </MainLayout>
    )
}

export default Login;