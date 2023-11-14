import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import AxiosClient from "../../../client/client";
import "./postList.css";
import PostItem from "../postItem/PostItem";
import useSession from "../../../hooks/useSession";
const client = new AxiosClient()

const PostList = () => {


    const session = useSession()
    console.log(session);

    const [currentPage, setCurrentPage] = useState(1)
    const [posts, setPosts] = useState([])

    const getPosts = async () => {

        try {
            const response = await client.get(`/posts?page=${currentPage}`)
            setPosts(response)

        } catch (e) {
            console.log(e);
        }
    };

    console.log(posts);


    const handlePagination = (value) => {
        setCurrentPage(value)
    }


    useEffect(() => {
        getPosts()
    }, [currentPage]);



    return (

        <div>
            <div className="d-flex flex-wrap justify-content-evenly my-5">
                {posts && posts.posts?.map((post) => {
                    console.log(post);
                    return (
                        <PostItem key={post._id}
                            _id={post._id}
                            title={post.title}
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
            <div>
                <ResponsivePagination
                    current={currentPage}
                    total={posts && posts.totalPages}
                    onPageChange={handlePagination}
                />
            </div>
        </div>
    );
};

export default PostList;