const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://taskflow-34b7.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running 🚀",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
