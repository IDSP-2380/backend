import { Router, Request, Response } from "express";
import { Story } from "../models/Story";
import { NewStoryInput } from "../types/story";

const router = Router();

router.get("/test", async (req: Request, res: Response) => {
  try {
    const input: NewStoryInput = req.body;

    const created = await Story.create({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(created);
  } catch (err) {
    console.log(err);
  }
});

export default router as Router;
