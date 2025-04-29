import { Router, Request, Response } from "express";
import { Story } from "../models/Story";
import { newStorySchema } from "../types/dtos";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(201).json("hi");
});

router.post("/test", async (req: Request, res: Response) => {
  try {
    const parsed = newStorySchema.parse(req.body);

    const created = await Story.create({
      ...parsed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(created);
  } catch (err) {
    console.log(err);
  }
});

export default router as Router;
