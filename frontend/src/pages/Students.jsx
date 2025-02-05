


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    className: "",
    section: "",
    rollNumber: "",
  });

  //const BASE_URL = 'http://localhost:5000';
  const BASE_URL = 'https://student-information-backend.onrender.com';


  //console.log(newStudent);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/students`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students", error));
  }, [students]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/students/`, newStudent)
      .then(() => {
        setStudents([...students, newStudent]); 
        setShowModal(false); 
      })
      .catch((error) => console.error("Error adding student", error));
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/api/students/${id}`)
      .then(() => {
        setStudents(students.filter(student => student._id !== id));
      })
      .catch((error) => console.error("Error deleting student", error));
  };

  const handleViewStudent = (id) => {
    navigate(`/students/view/${id}`);
  };

  const handleEditStudent = (id) => {
    navigate(`/students/edit/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6">Students List</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mb-4"
      >
        Add Student
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/2 lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Add Student</h3>
            <form onSubmit={handleAddStudent}>
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Class"
                value={newStudent.className}
                onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Section"
                value={newStudent.section}
                onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Class</th>
              <th className="py-2 px-4 text-left">Section</th>
              <th className="py-2 px-4 text-left">Roll Number</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b">
                <td className="py-2 px-4">{student._id}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.class}</td>
                <td className="py-2 px-4">{student.section}</td>
                <td className="py-2 px-4">{student.rollNumber}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewStudent(student._id)}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditStudent(student._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
