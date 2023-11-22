import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import AxiosClient from "../../../client/client";
import "./postList.css";
import PostItem from "../postItem/PostItem";
import { Container } from "react-bootstrap";
import { PacmanLoader } from 'react-spinners'
import postM2 from "../../../assets/m2playerPOST.png"

const client = new AxiosClient()

const PostList = () => {




    const [currentPage, setCurrentPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = async () => {
        try {
            const response = await client.get(`/posts/byTitle?title=${searchTerm}&page=${currentPage}`);
            setPosts(response);
            setIsLoading(false)
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

            <Container className="m-t-postlist my-custom-container">

                <div className="d-flex justify-content-evenly align-items-center d-none d-md-flex d-xxl-flex">
                    <img className="post_img" alt="logo" src={postM2} />
                    <input
                        className="my_input"
                        type="text"
                        placeholder="Cerca per titolo"
                        value={searchTerm}
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                </div>

                <div className="d-md-none text-center">
                    <div>
                        <img className="post_img" alt="logo" src={postM2} />
                    </div>
                    <div>
                        <input
                            className="my_input"
                            type="text"
                            placeholder="Cerca per titolo"
                            value={searchTerm}
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                        />
                    </div>
                </div>


                <div className="d-flex flex-wrap justify-content-evenly">
                    {isLoading ? (
                        <div className='container d-flex justify-content-center spinner-margin'>
                            <PacmanLoader color="#e0d100" />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
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