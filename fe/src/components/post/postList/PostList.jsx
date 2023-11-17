import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import AxiosClient from "../../../client/client";
import "./postList.css";
import PostItem from "../postItem/PostItem";
import useSession from "../../../hooks/useSession";
import { Container } from "react-bootstrap";

const client = new AxiosClient()

const PostList = () => {


    const session = useSession()
    // console.log(session);

    const [currentPage, setCurrentPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const getPosts = async () => {
        try {
            const response = await client.get(`/posts/byTitle?title=${searchTerm}&page=${currentPage}`);
            setPosts(response);
        } catch (e) {
            console.log(e);
        }
    };


    const handlePagination = (value) => {
        setCurrentPage(value)
    }

    const handleSearchTermChange = (newTerm) => {
        setSearchTerm(newTerm);
        setCurrentPage(1); // Imposta currentPage a 1 quando il termine di ricerca cambia
    };

    useEffect(() => {
        getPosts()
    }, [currentPage, searchTerm]);





    return (
        <>
            <hr />
            <Container className="m-t my-custom-container">

                <div className="d-flex justify-content-evenly">
                    <h1>POST</h1>

                    <input
                        className="my_input"
                        type="text"
                        placeholder="Cerca per titolo"
                        value={searchTerm}
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                </div>
                <div className="d-flex flex-wrap justify-content-evenly">
                    {posts &&
                        posts.posts?.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((post) => {

                            return (
                                <PostItem key={post._id}
                                    _id={post._id}
                                    title={post.title}
                                    game={post.game}
                                    category={post.category}
                                    img={post.img}
                                    authorNome={post.author?.firstName}
                                    authorCognome={post.author?.lastName}
                                    authorAvatar={post.author?.avatar}
                                    content={post.content}
                                />
                            )
                        })}
                </div>
                <div className="mb-5">
                    <ResponsivePagination
                        current={currentPage}
                        total={posts && posts.totalPages}
                        onPageChange={handlePagination}
                    />
                </div>
            </Container>
        </>
    );
};

export default PostList;