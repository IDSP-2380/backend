import { Router, Request, Response } from "express";
import { Story, IStory } from "../models/Story";
import { User } from "../models/User";
import { Link } from "../models/Link";
import { numberOfLinksIsValid, wordCountLimitIsValid } from "../utils/validateForm";

const router = Router();

router.get("/test", async (_req: Request, res: Response) => {
  try {
    const dummy: Partial<IStory> = {
      title: "Test Story111111",
      isPublic: true,
      contributors: [],
      status: "ongoing",
      maxWordCount: 250,
      numberOfLinks: 20,
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

router.get("/testLink", async (_req: Request, res: Response) => {
  try {
    const dummyLink = {
      content: "I love being Lead Dev",
      author: "LeadDevGavin",
      stage: "introduction",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const createdLink = await Link.create(dummyLink);
    res.status(201).json(createdLink);
  } catch (err) {
    console.log(err);
  }
});

router.post("/create/story/private", async (req: Request, res: Response) => {
  try {
    const { maxWordCount, numberOfLinks } = req.body;
    if(!wordCountLimitIsValid(parseInt(maxWordCount))) throw new Error("Invalid word count limit");
    if(!numberOfLinksIsValid(parseInt(numberOfLinks))) throw new Error("Invalid number of links");
  } catch(err) {
    console.log(err);
  }
});


router.post("/create/story/public", async (req: Request, res: Response) => {
  try {
    const { maxWordCount, linkContent, numberOfLinks } = req.body;
    console.log(req.body)
    if(!wordCountLimitIsValid(parseInt(maxWordCount), linkContent)) throw new Error("Invalid word count limit");
    if(!numberOfLinksIsValid(parseInt(numberOfLinks))) throw new Error("Invalid number of links");

    res.status(201).json({ 
      success: true, 
      message: "Story created successfully"
    });
  } catch(err) {
    console.error("Error creating story:", err);
    res.status(500).json({ 
      error: "An error occurred while creating the story" 
    });
  }
});

export default router as Router;
