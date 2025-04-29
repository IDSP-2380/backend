import { Router, Request, Response } from "express";
import { Story, IStory } from "../models/Story";

const router = Router();

router.get("/test", async (_req: Request, res: Response) => {
  try {
    const dummy: Partial<IStory> = {
      title: "🚧 Test Story 🚧",
      isPublic: true,
      contributors: [],
      status: "drafting",
      createdAt: new Date(),
      updatedAt: new Date(),
      chains: [],
    };

    const created = await Story.create(dummy);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
  }
});

export default router as Router;
