const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addStudent = async (req, res) => {
  const { name, className, section, rollNumber } = req.body;

  console.log(name, className, section, rollNumber);

  if (!name || !className || !section || !rollNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Student({
      name,
      class: className,
      section,
      rollNumber,
    });
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, class: className, section, rollNumber } = req.body;
  console.log(className);

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, className, section, rollNumber },
      { new: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
