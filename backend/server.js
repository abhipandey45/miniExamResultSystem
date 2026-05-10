const dns = require("dns");
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Route files *****
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes section *****
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});