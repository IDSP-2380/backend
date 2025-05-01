import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/database";
import storyRoutes from "./routes/storyRoutes";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

connectDB()
  .then(() => {
    app.use("/api/stories", storyRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
