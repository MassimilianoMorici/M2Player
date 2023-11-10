import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewPost from "./pages/newPost/NewPost"

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newPost" element={<NewPost />} />

      </Routes>
    </Router>

  );
}

export default App;


