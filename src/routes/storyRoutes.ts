import { Router, Request, Response } from "express";
import mongoose from "mongoose"; // using raw mongoose connection

const router = Router();

// Super simple MongoDB test
router.get("/test", async (_req: Request, res: Response) => {
  try {
    const collections = await mongoose.connection
      .db!.listCollections()
      .toArray();
    res.json({ message: "Connected to database 🎉", collections });
  } catch (error) {
    console.error("MongoDB query error:", error);
    res.status(500).json({ error: "Failed to query database" });
  }
});

export default router;
