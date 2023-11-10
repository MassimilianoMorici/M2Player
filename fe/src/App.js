import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>

  );
}

export default App;
