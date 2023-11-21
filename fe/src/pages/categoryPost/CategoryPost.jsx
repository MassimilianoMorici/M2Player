import React, { useEffect, useState } from "react";
import PostItem from "../../components/post/postItem/PostItem";
import AxiosClient from "../../client/client";
import MainLayout from "../../layouts/MainLayout";

const client = new AxiosClient()

const CategoryPost = () => {

    const [posts, setPosts] = useState([])
    const [value, setValue] = useState("TUTTI")

    const handleInputChange = (e) => {
        const { value: inputValue } = e.target;
        setValue(inputValue);
    };

    const getPosts = async () => {

        try {

            let response;

            if (value === "TUTTI") {
                response = await client.get('/posts');
            } else {
                response = await client.get(`/posts/category/${value}`);
            }
            setPosts(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts()
    }, [value])


    return (
        <MainLayout>

            <div className="my-custom-container pCategory-marginTop">

                <div className="container">
                    <label className="mb-2">Categoria</label>
                    <select
                        id="blog-category"
                        name="category"
                        className="form-control form-control-lg"
                        onChange={handleInputChange}
                    >
                        <option value="TUTTI">TUTTI</option>
                        <option value="Easter Egg">Easter Egg</option>
                        <option value="Gameplay">Gameplay</option>
                        <option value="Guide">Guide</option>
                        <option value="Nuove uscite">Nuove uscite</option>
                        <option value="Party">Party</option>
                        <option value="Preordini">Preordini</option>
                        <option value="Segreti">Segreti</option>
                        <option value="Tutorial">Tutorial</option>
                    </select>
                </div>

                <div className="d-flex flex-wrap justify-content-evenly mt-2">
                    {posts &&
                        posts.posts?.map((post) => {
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
            </div >
        </MainLayout>
    )
}

export default CategoryPost;