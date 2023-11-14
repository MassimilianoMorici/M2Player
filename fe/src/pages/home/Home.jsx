import React from "react";
import MainLayout from "../../layouts/MainLayout";
// import MyMain from "../../components/main/MyMain";
import "./home.css";
// import GameList from "../../components/game/gameList/GameList";
import PostList from "../../components/post/postList/PostList";

const Home = () => {

    return (
        <MainLayout>
            {/* 
            <MyMain />
            <GameList /> 
            */}
            <PostList />
        </MainLayout>
    )
}

export default Home