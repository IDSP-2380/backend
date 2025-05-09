import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/database";
import storyRoutes from "./routes/storyRoutes";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://inklink-fe.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 10000;

connectDB()
  .then(() => {
    app.use("/api/stories", storyRoutes);

    app.use("/api/user", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
