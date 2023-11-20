import React, { useEffect, useState } from "react";
import GameItem from "../../components/game/gameItem/GameItem";
import AxiosClient from "../../client/client";
import MainLayout from "../../layouts/MainLayout";
import "./categoryGame.css";

const client = new AxiosClient()

const CategoryGame = () => {

    const [games, setGames] = useState([])
    const [value, setValue] = useState("TUTTI")

    const handleInputChange = (e) => {
        const { value: inputValue } = e.target;
        setValue(inputValue);
    };

    const getGames = async () => {

        try {

            let response;

            if (value === "TUTTI") {
                response = await client.get('/games');
            } else {
                response = await client.get(`/games/category/${value}`);
            }
            setGames(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGames()
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
                        <option value="MMORPG">MMORPG</option>
                        <option value="RPG">RPG</option>
                        <option value="FPS">FPS</option>
                        <option value="Race">Race</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Picchiaduro">Picchiaduro</option>
                    </select>
                </div>

                <div className="d-flex flex-wrap justify-content-evenly mt-2">
                    {games &&
                        games.games?.map((game) => {
                            return (
                                <GameItem key={game._id}
                                    _id={game._id}
                                    title={game.title}
                                    category={game.category}
                                    cover={game.cover}
                                    platform={game.platform}
                                    editor={game.editor}
                                    rate={game.rate}
                                />
                            )
                        })}
                </div>
            </div >
        </MainLayout>
    )
}

export default CategoryGame;