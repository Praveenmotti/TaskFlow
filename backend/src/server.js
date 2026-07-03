const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://task-flow-two-wheat.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));

// Health check
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

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Only start server if running directly (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    connectDB();
  });
} else {
  connectDB();
}

module.exports = app;