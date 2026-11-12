
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Import Database Connection
const connectDB = require("./config/db");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
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

// Start Server
const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing.");
    }

    // Connect MongoDB
    await connectDB();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("JWT SECRET LOADED:", true);
    });

  } catch (error) {
    console.error("Server Startup Error:", error.message);
    process.exit(1);
  }
};

// Run Server
startServer();
