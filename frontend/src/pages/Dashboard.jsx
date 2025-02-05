


import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
 // const BASE_URL = 'http://localhost:5000'


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar onLogout={handleLogout} />
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <h2 className="text-3xl md:text-4xl mb-4 font-bold text-gray-800">Welcome to the Dashboard</h2>
        <img 
          className="h-auto max-w-full rounded-lg shadow-md"
          src="https://edutinker.com/wp-content/uploads/2023/01/Student-Information-System-A-Complete-Guide.png" 
          alt="Dashboard Image"
        />
      </div>
    </div>
  );
};

export default Dashboard;
