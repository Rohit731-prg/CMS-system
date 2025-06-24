import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Post from "./Components/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  )
}

export default App;
