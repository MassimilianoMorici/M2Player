import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewPost from "./pages/newPost/NewPost"
import NewAccount from "./pages/newAccount/NewAccount";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import PostId from "./pages/postId/PostId";
import GameId from "./pages/gameId/GameId";
import NewGame from "./pages/newGame/NewGame";
import Account from "./pages/account/Account";
import ModPost from "./pages/modPost/ModPost";
import ModGame from "./pages/modGame/ModGame";
import CategoryGame from "./pages/categoryGame/CategoryGame";
import CategoryPost from "./pages/categoryPost/CategoryPost";
import Gestionale from "./pages/gestionale/Gestionale";
import ScrollToTop from "./hooks/useScrollRestoration";

function App() {
  return (

    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/newAccount" element={<NewAccount />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/newPost" element={<NewPost />} />
          <Route path="/modPost/:id" element={<ModPost />} />
          <Route path="/newGame" element={<NewGame />} />
          <Route path="/modGame/:id" element={<ModGame />} />
          <Route path="/allGame" element={<CategoryGame />} />
          <Route path="/allPost" element={<CategoryPost />} />
          <Route path="/post/:id" element={<PostId />} />
          <Route path="/game/:id" element={<GameId />} />
          <Route path="/me" element={<Account />} />
          <Route path="/gestionale" element={<Gestionale />} />
        </Route>

      </Routes>
    </Router>

  );
}

export default App;


