import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Post from "./Components/Post";
import Customers from "./Components/Customers";
import AddUser from "./Components/AddUser";
import Crew from "./Components/Crew";
import DashboardAdmin from "./Components/DashboardAdmin";
import ErrorPage from "./Components/ErrorPage";
import Feedback from "./Components/Feedback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboardAdmin/:id" element={<DashboardAdmin />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/customer/:id" element={<Customers />} />
        <Route path="/adduser/:id" element={<AddUser />} />
        <Route path="/crew/:id" element={<Crew />} />
        <Route path="/feedback/:id" element={<Feedback />} />
      </Routes>
    </Router>
  )
}

export default App;
