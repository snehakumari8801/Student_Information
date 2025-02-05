// backend/models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, 
  section: { type: String, required: true },
  rollNumber: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
