import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewPost from "./pages/newPost/NewPost"
import NewAccount from "./pages/newAccount/NewAccount";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/newAccount" element={<NewAccount />} />

      </Routes>
    </Router>

  );
}

export default App;


