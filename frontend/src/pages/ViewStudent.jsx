

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  //const BASE_URL = 'http://localhost:3000';
  //const BASE_URL = 'https://student-information-backend.onrender.com';
  const BASE_URL = 'https://student-information-backend1.onrender.com';



  useEffect(() => {
    axios.get(`${BASE_URL}/api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((error) => console.error("Error fetching student", error));
  }, [id]);

  if (!student) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Student Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-600">{student.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Class:</span>
          <span className="text-gray-600">{student.class}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Section:</span>
          <span className="text-gray-600">{student.section}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Roll Number:</span>
          <span className="text-gray-600">{student.rollNumber}</span>
        </div>
      </div>

      <div className="mt-6">
        <button 
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewStudent;
