// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function MyNav() {
//     return (
//         <Navbar expand="lg" className="bg-body-tertiary">
//             <Container>
//                 <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link href="#home">Home</Nav.Link>
//                         <Nav.Link href="#link">Link</Nav.Link>
//                         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">
//                                 Another action
//                             </NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item href="#action/3.4">
//                                 Separated link
//                             </NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default MyNav;


// import React from "react";
// import { Container, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./navbar.css";
// import logoM2 from "../../assets/m2playerLogo.png"

// const MyNav = () => {

//     return (
//         <Navbar expand="lg" className="blog-navbar" fixed="top">
//             <Container className="justify-content-between">

//                 <Navbar.Brand as={Link} to="/">
//                     <img className="blog-navbar-brand" alt="logo" src={logoM2} />
//                 </Navbar.Brand>

//             </Container>
//         </Navbar>
//     );
// };

// export default MyNav;

import React from "react";
import { Button, Container, Dropdown, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logoM2 from "../../assets/m2playerLogo.png"

import useSession from "../../hooks/useSession";

const MyNav = () => {


    const session = useSession()
    const navigate = useNavigate()

    const handleLogout = () => {
        // Rimuovi il token di autenticazione
        localStorage.removeItem('loggedInUser');
        navigate('/')
    }



    return (
        <Navbar expand="lg" className="blog-navbar" fixed="top">
            <Container className="justify-content-between">

                <Navbar.Brand as={Link} to="/">
                    <img className="blog-navbar-brand" alt="logo" src={logoM2} />
                </Navbar.Brand>


                {session &&
                    <Container className="d-flex justify-content-end">

                        <Button
                            as={Link}
                            to="/newPost"
                            className="blog-navbar-add-button bg-dark"
                            size="lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-plus-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                            </svg>
                            Post Article
                        </Button>

                        <Dropdown className="ms-5">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
                                <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
                                <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>}



            </Container>
        </Navbar>
    );
};

export default MyNav;