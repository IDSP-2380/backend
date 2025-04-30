import { Router, Request, Response } from "express";
import { Story, IStory } from "../models/Story";
import { User } from "../models/User";

const router = Router();

router.get("/test", async (_req: Request, res: Response) => {
  try {
    const dummy: Partial<IStory> = {
      title: "Test Story111111",
      isPublic: true,
      contributors: [],
      status: "ongoing",
      createdAt: new Date(),
      updatedAt: new Date(),
      chains: [],
    };
    console.log(":(")
    const created = await Story.create(dummy);
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
  }
});

router.get("/testUser", async (_req: Request, res: Response) => {
  try {
    const dummyUser = {
      username: "leadDevGavin",
      password: "ILoveBeingLeadDev123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const createdUser = await User.create(dummyUser);
    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
  }
});

export default router as Router;
