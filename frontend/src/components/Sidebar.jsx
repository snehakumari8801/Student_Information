import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 min-h-[100vh]">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/students"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded block"
          >
            Students Page
          </Link>
        </li>

        <li>
          <Link
            to="/login"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded block"
          >
            Login
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="text-white hover:bg-gray-700 px-4 py-2 rounded w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
