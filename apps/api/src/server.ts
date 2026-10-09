import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health-check route
app.get("/", (_req, res) => {
  res.json({
    message: "Relay API is running 🚀",
  });
});

// Project routes
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Relay API running on http://localhost:${PORT}`);
  });
});