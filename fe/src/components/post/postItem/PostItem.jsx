import React from "react";
import { Card, Container } from "react-bootstrap";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./postItem.css";

const PostItem = ({ title, game, category, img, authorNome, authorCognome, authorAvatar, _id }) => {



    return (
        <Card className="blog-card my-5 ">
            <Link to={`/post/${_id}`} className="blog-link">
                <Card.Img variant="top" src={img} className="blog-cover" />
                <Card.Body>
                    <Container>
                        <div className="d-flex flex-column">
                            <div className="h_body_1">
                                <h4 className="ellipsis1 d-flex justify-content-center">{title}</h4>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mt-2">
                                <div className="d-flex flex-column h_body_2">
                                    <h6>Game</h6>
                                    <p>{game}</p>
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
            <Card.Footer>
                <Row>
                    <Col
                        xs={2}>
                        <Image className="blog-author" src={authorAvatar} roundedCircle />
                    </Col>
                    <Col className="ms-3">
                        <div>by</div>
                        <h6>{`${authorNome} ${authorCognome}`}</h6>
                    </Col>
                </Row>
            </Card.Footer>
        </Card >
    )
}

export default PostItem;