// import React, { useEffect, useState } from "react";
// import ResponsivePagination from 'react-responsive-pagination';
// import 'react-responsive-pagination/themes/classic.css';
// import AxiosClient from "../../../client/client";
// import "./gameList.css";
// import GameItem from "../gameItem/GameItem";
// import useSession from "../../../hooks/useSession";
// import { Container } from "react-bootstrap";

// const client = new AxiosClient()

// const GameList = () => {


//     const session = useSession()
//     // console.log(session);

//     const [currentPage, setCurrentPage] = useState(1)
//     const [posts, setPosts] = useState([])

//     const getPosts = async () => {

//         try {
//             const response = await client.get(`/games?page=${currentPage}`)
//             setPosts(response)

//         } catch (e) {
//             console.log(e);
//         }
//     };


//     const handlePagination = (value) => {
//         setCurrentPage(value)
//     }


//     useEffect(() => {
//         getPosts()
//     }, [currentPage]);


//     console.log(posts);


//     return (


//         <Container className="mod my-custom-container">
//             <h1 className="d-flex justify-content-center">GAME</h1>
//             <div className="d-flex flex-wrap justify-content-evenly">
//                 {posts && posts.games?.map((post) => {
//                     // console.log(post);

//                     return (
//                         <GameItem key={post._id}
//                             _id={post._id}
//                             title={post.title}
//                             category={post.category}
//                             cover={post.cover}
//                             platform={post.platform}


//                         />
//                     )
//                 })}
//             </div>
//             <div className="mb-5">
//                 <ResponsivePagination
//                     current={currentPage}
//                     total={posts && posts.totalPages}
//                     onPageChange={handlePagination}
//                 />
//             </div>
//         </Container>

//     );
// };

// export default GameList;

import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import AxiosClient from "../../../client/client";
import "./gameList.css";
import GameItem from "../gameItem/GameItem";
import useSession from "../../../hooks/useSession";
import { Container, Form } from "react-bootstrap";

const client = new AxiosClient()

const GameList = () => {


    const session = useSession()
    // console.log(session);

    const [currentPage, setCurrentPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");


    const getPosts = async () => {
        try {
            const response = await client.get(`/games/byTitle?title=${searchTerm}&page=${currentPage}`);
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
        getPosts();
    }, [currentPage, searchTerm]);



    console.log(posts);


    return (


        <Container className="m-t-mod my-custom-container">
            <div className="d-flex justify-content-evenly">
                <h1 >GAME</h1>

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
                    posts.games?.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((post) => {
                        return (
                            <GameItem key={post._id}
                                _id={post._id}
                                title={post.title}
                                category={post.category}
                                cover={post.cover}
                                platform={post.platform}
                                editor={post.editor}
                                rate={post.rate}
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

    );
};

export default GameList;