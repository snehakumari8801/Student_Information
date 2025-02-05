const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors()
)
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  //route
  const authRoutes = require("./routes/authRoutes");
 app.use("/api/auth", authRoutes);
 

  const studentRoutes = require("./routes/studentRoutes");
  app.use("/api/students", studentRoutes);  

// Placeholder route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
