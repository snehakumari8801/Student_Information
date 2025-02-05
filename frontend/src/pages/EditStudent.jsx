

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams();
  const[loading,setLoading] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });
  const navigate = useNavigate();
  //const BASE_URL = 'http://localhost:5000';
  const BASE_URL = 'https://student-information-backend.onrender.com';


  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((error) => console.error("Error fetching student", error));
      setLoading(false);

  }, [id]);

  if(loading){
    return <ddiv>Loading...</ddiv>
  }

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { 
      ...student,
      className: student.class, 
    };
    
    delete payload.class; 
    axios.put(`${BASE_URL}/api/students/${id}`, payload)
      .then(() => navigate("/students"))
      .catch((error) => console.error("Error updating student", error));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Edit Student</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={student.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="class" className="font-semibold text-gray-700">Class:</label>
          <input
            type="text"
            name="class" 
            id="class"
            value={student.class} 
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="section" className="font-semibold text-gray-700">Section:</label>
          <input
            type="text"
            name="section"
            id="section"
            value={student.section}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rollNumber" className="font-semibold text-gray-700">Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            id="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
