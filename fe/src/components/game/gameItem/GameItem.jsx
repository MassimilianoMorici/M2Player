import React from "react";
import { Card, Container } from "react-bootstrap";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GameItem.css";

const GameItem = ({ title, cover, category, platform, editor, rate, _id }) => {



    return (
        <Card className="blog-card my-5 ">
            <Link to={`/game/${_id}`} className="blog-link">
                <Card.Img variant="top" src={cover} className="blog-cover" />
                <Card.Body>
                    <Container>
                        <div className="d-flex flex-column">
                            <div className="h_body_1">
                                <h4 className="ellipsis1 d-flex justify-content-center">{title}</h4>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mt-2">
                                <div className="d-flex flex-column h_body_2">
                                    <h6>piattaforma</h6>
                                    <p>{platform}</p>
                                </div>
                                <div className="d-flex flex-column h_body_2">
                                    <h6>Categoria</h6>
                                    <p>{category}</p>
                                </div>
                            </div>
                        </div>

                    </Container>

                </Card.Body>
            </Link>
            <Card.Footer className="bg-card-mod" >

                <div className="d-flex justify-content-between card-foot-mod">
                    <h6>{editor}</h6>
                    <h6>VOTO: {rate}</h6>
                </div>

            </Card.Footer>
        </Card >
    )
}

export default GameItem;