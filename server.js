const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { logger, errorHandler } = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Mount routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce Product Catalog API is running",
    version: "1.0.0",
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
