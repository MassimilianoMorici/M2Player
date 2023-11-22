import React, { useEffect, useState } from "react";
import useSession from "../../hooks/useSession";
import { Image } from "react-bootstrap";
import MainLayout from "../../layouts/MainLayout";
import MyNav from "../../components/navbar/MyNav";
import { Link } from "react-router-dom";
import { PacmanLoader } from 'react-spinners'
import "./account.css";

const Account = () => {

    const session = useSession()
    // posts/allPostsAccount/

    const idAccount = session.id

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([])

    const getPost = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/allPostsAccount/${idAccount}`);
            const data = await response.json()
            setPosts(data)
            setIsLoading(false)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPost();
    }, []);



    return (
        <MainLayout>

            <div className="container">

                <div className=" p-account-details">
                    <h1>Ciao {session.firstName}!</h1>
                    <Image className="p-account-img mt-3" src={session.avatar} fluid />
                </div>

                <hr className="my-5" />

                <div className="mt-5">
                    <h2>info account:</h2>
                    <h4>Nome: {session.firstName}</h4>
                    <h4>Cognome: {session.lastName}</h4>
                    <h4>Email: {session.email}</h4>
                    <h4>Lv Account: {session.role}</h4>
                </div>

                <hr className="my-5" />


                <div className="p-account-boxPost">
                    <h2 className="mb-5"> I tuoi POST: </h2>

                    {isLoading ? (
                        <div className='container d-flex justify-content-center spinner-margin'>
                            <PacmanLoader color="#e0d100" />
                        </div>
                    ) : (
                        <>
                            {posts && posts.posts?.map((post) => {
                                return (
                                    <Link
                                        key={post._id}
                                        to={`/post/${post._id}`}
                                        className='d-flex align-items-center my-4 p-account-box-singlePost'>
                                        <div>
                                            <img className="img-postmap me-3" src={`${post.img}`} alt="" />
                                        </div>
                                        <h2>{post.title}</h2>
                                    </Link>
                                )
                            })}
                        </>
                    )}

                </div>



            </div>

        </MainLayout>
    )
}

export default Account; 