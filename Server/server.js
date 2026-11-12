
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Initialize Express App
const app = express();

// Import Routes
const userRoutes = require("./routes/userRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

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

// Start Server and Connect MongoDB
const startServer = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const JWT_SECRET = process.env.JWT_SECRET;

    // Check MongoDB URI
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing. Please add it in Render Environment.");
    }

    // Check JWT Secret
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing. Please add it in Render Environment.");
    }

    // Connect MongoDB
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected Successfully");

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("JWT SECRET LOADED:", !!JWT_SECRET);
    });

  } catch (error) {
    console.error("Server Startup Error:", error.message);
    process.exit(1);
  }
};

// Run Server
startServer();
