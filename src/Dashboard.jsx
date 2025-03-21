import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear login token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h2>Welcome to Dashboard 🎉</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
