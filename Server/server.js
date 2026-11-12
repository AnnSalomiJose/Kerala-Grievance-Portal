
// const dotenv = require("dotenv");
// dotenv.config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const grievanceRoutes = require("./routes/grievanceRoutes");
// app.use("/api/grievances", grievanceRoutes);

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Database Connection
// connectDB();

// // Test Route
// app.get("/", (req, res) => {
//   res.status(200).send("CM Kerala Grievance Portal API is running");
// });

// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/grievances", grievanceRoutes);

// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log("JWT SECRET LOADED:", !!process.env.JWT_SECRET);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config();

// Import Routes
const userRoutes = require("./routes/userRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files - Uploaded Attachments
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "CM Kerala Grievance Portal API is running.",
  });
});

// User Routes
app.use("/api/users", userRoutes);

// Grievance Routes
app.use("/api/grievances", grievanceRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection and Server Start
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();
