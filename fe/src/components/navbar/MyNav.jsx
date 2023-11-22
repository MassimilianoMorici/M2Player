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

//prima di pasticciare per responsive
// import React from "react";
// import { Dropdown, NavDropdown, Navbar } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import "./navbar.css";
// import logoM2 from "../../assets/m2playerLogo.png"

// import useSession from "../../hooks/useSession";

// const MyNav = () => {


//     const session = useSession()
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         // Rimuovi il token di autenticazione
//         localStorage.removeItem('loggedInUser');
//         navigate('/')
//     }

//     // console.log(session.role);

//     return (
//         <div className="container-fluid blog-navbar fixed-top">
//             <div className="d-flex justify-content-between align-items-center ">
//                 <div className="d-flex align-items-center">
//                     <div>
//                         <Navbar.Brand as={Link} to={session ? "/home" : "/"}>
//                             <img className="blog-navbar-brand" alt="logo" src={logoM2} />
//                         </Navbar.Brand>
//                     </div>

//                     <div>
//                         <ul className="d-flex tag-ul">
//                             <li className="mx-3"><a className="nav-a" href="/allGame">Game</a></li>
//                             <li className="mx-3 "><a className="nav-a" href="/allPost">Post</a></li>
//                         </ul>
//                     </div>
//                 </div>
//                 {/* <div>
//                     <p className="mx-2"><a className="nav-a" href="/allGame">Game</a></p>
//                 </div>
//                 <div>
//                     <p className="mx-2 "><a className="nav-a" href="/allPost">Post</a></p>
//                 </div> */}

//                 <div>
//                     {session &&
//                         <Dropdown className="ms-5">
//                             <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
//                                 <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                                 <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
//                                 <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>
//                                 <NavDropdown.Item className="selection" href="/newPost">Nuovo Post</NavDropdown.Item>
//                                 {session.role === "admin" && (
//                                     <>
//                                         <NavDropdown.Item className="selection" href="/newGame">Nuovo Game</NavDropdown.Item>
//                                         <NavDropdown.Item className="selection" href="/gestionale">Gestionale</NavDropdown.Item>
//                                     </>
//                                 )}
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     }
//                 </div>
//             </div>
//         </div >

//         // <Navbar className="blog-navbar" fixed="top">
//         //     <Container className="">
//         //         <Row className="d-flex justify-content-between">
//         //             <Col >
//         //                 <Navbar.Brand as={Link} to={session ? "/home" : "/"}>
//         //                     <img className="blog-navbar-brand" alt="logo" src={logoM2} />
//         //                 </Navbar.Brand>

//         //                 {session &&

//         //                     <Dropdown className="ms-5">
//         //                         <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
//         //                             <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
//         //                         </Dropdown.Toggle>

//         //                         <Dropdown.Menu>
//         //                             <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
//         //                             <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>

//         //                             <NavDropdown.Item className="selection" href="/newPost">Nuovo Post</NavDropdown.Item>
//         //                             {session.role === "admin" &&
//         //                                 <NavDropdown.Item className="selection" href="/newGame">Nuovo Game</NavDropdown.Item>}
//         //                             <NavDropdown.Divider />
//         //                             <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
//         //                         </Dropdown.Menu>
//         //                     </Dropdown>
//         //                 }
//         //             </Col>
//         //         </Row>
//         //     </Container>
//         // </Navbar>

//     );
// };

// export default MyNav;


import React from "react";
import { Dropdown, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logoM2 from "../../assets/m2playerLogo.png"
import gameM2 from "../../assets/m2playerGAME.png"
import postM2 from "../../assets/m2playerPOST.png"

import useSession from "../../hooks/useSession";

const MyNav = () => {


    const session = useSession()
    const navigate = useNavigate()

    const handleLogout = () => {
        // Rimuovi il token di autenticazione
        localStorage.removeItem('loggedInUser');
        navigate('/')
    }

    //d-md-none x headerPiccolo
    //d-none d-md-flex d-xxl-flex x headerGrande

    return (
        <div className="container-fluid blog-navbar fixed-top">
            <div className="d-flex justify-content-between align-items-center ">
                <div className="d-flex align-items-center">
                    <div>
                        <Navbar.Brand as={Link} to={session ? "/home" : "/"}>
                            <img className="blog-navbar-brand" alt="logo" src={logoM2} />
                        </Navbar.Brand>
                    </div>

                    <div className="d-flex tag-ul d-none d-md-flex d-xxl-flex">
                        <a href="/allGame">
                            <img className="game_post_link ms-mod-nav" alt="logo" src={gameM2} />
                        </a>
                        <a href="/allPost">
                            <img className="game_post_link ms-5" alt="logo" src={postM2} />
                        </a>
                        {/* <ul className="d-flex tag-ul d-none d-md-flex d-xxl-flex">
                            <li className="mx-3"><a className="nav-a" href="/allGame">Game</a></li>
                            <li className="mx-3 "><a className="nav-a" href="/allPost">Post</a></li>
                        </ul> */}
                    </div>
                </div>
                {/* <div>
                    <p className="mx-2"><a className="nav-a" href="/allGame">Game</a></p>
                </div>
                <div>
                    <p className="mx-2 "><a className="nav-a" href="/allPost">Post</a></p>
                </div> */}

                <div>
                    {session &&
                        <Dropdown className="ms-5">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
                                <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
                                <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>

                                <NavDropdown.Item className="selection d-md-none" href="/allGame">Game</NavDropdown.Item>
                                <NavDropdown.Item className="selection d-md-none" href="/allPame">Post</NavDropdown.Item>

                                <NavDropdown.Item className="selection" href="/newPost">Nuovo Post</NavDropdown.Item>
                                {session.role === "admin" && (
                                    <>
                                        <NavDropdown.Item className="selection" href="/newGame">Nuovo Game</NavDropdown.Item>
                                        <NavDropdown.Item className="selection" href="/gestionale">Gestionale</NavDropdown.Item>
                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </div>
        </div >

        // <Navbar className="blog-navbar" fixed="top">
        //     <Container className="">
        //         <Row className="d-flex justify-content-between">
        //             <Col >
        //                 <Navbar.Brand as={Link} to={session ? "/home" : "/"}>
        //                     <img className="blog-navbar-brand" alt="logo" src={logoM2} />
        //                 </Navbar.Brand>

        //                 {session &&

        //                     <Dropdown className="ms-5">
        //                         <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="togli-bordo">
        //                             <img src={`${session.avatar}`} alt="logo avatar" className="img-avatar" />
        //                         </Dropdown.Toggle>

        //                         <Dropdown.Menu>
        //                             <NavDropdown.Item className="selection" href="/home">Home</NavDropdown.Item>
        //                             <NavDropdown.Item className="selection" href="/me">Account</NavDropdown.Item>

        //                             <NavDropdown.Item className="selection" href="/newPost">Nuovo Post</NavDropdown.Item>
        //                             {session.role === "admin" &&
        //                                 <NavDropdown.Item className="selection" href="/newGame">Nuovo Game</NavDropdown.Item>}
        //                             <NavDropdown.Divider />
        //                             <NavDropdown.Item onClick={handleLogout} className="selection" >Logout</NavDropdown.Item>
        //                         </Dropdown.Menu>
        //                     </Dropdown>
        //                 }
        //             </Col>
        //         </Row>
        //     </Container>
        // </Navbar>

    );
};

export default MyNav;