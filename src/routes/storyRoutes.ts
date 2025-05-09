import { Router, Request, Response } from "express";
import { Story, IStory } from "../models/Story";
import { User } from "../models/User";
import { Link } from "../models/Link";
import { Chain } from "../models/Chain";
import {
  numberOfLinksIsValid,
  wordCountLimitIsValid,
} from "../utils/validateForm";
import { newStorySchema } from "../types/dtos";

const router = Router();

router.get("/test/:id", async (req: Request, res: Response) => {
  try {
    // const testId = '681d2dcc9e9f42f406593dc4'
    console.log("bfore");
    const story = await Story.findById(req.params.id);
    console.log("after");
    if (!story) res.status(404).json({ error: "custom error hererer" });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch story" });
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
    const parsed = newStorySchema.parse(req.body);

    const {
      storyTitle,
      maxWordCount,
      numberOfLinks,
      contributors,
      startDate,
      endDate,
      timePerTurn,
    } = parsed;

    if (!wordCountLimitIsValid(maxWordCount))
      throw new Error("Invalid word count limit");
    if (!numberOfLinksIsValid(numberOfLinks))
      throw new Error("Invalid number of links");

    const story = {
      title: storyTitle,
      isPublic: false,
      contributors: contributors,
      status: "ongoing",
      maxWordCount: maxWordCount,
      chains: [],
      numberOfLinks: numberOfLinks,
      startDate: startDate,
      endDate: endDate,
      writingOrder: contributors,
      timePerTurn: timePerTurn,
    };

    await Story.create(story);

    res.status(201).json({
      success: true,
      message: "Story created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while creating the story",
    });
  }
});

router.post("/create/story/public", async (req: Request, res: Response) => {
  try {
    const { maxWordCount, linkContent, numberOfLinks, storyTitle } = req.body;

    console.log(req.body);

    const linkStuff = {
      content: linkContent,
      author: "me",
      stage: "start",
    };

    const createdLink = await Link.create(linkStuff);

    const chain = {
      links: createdLink,
    };

    const createdChain = await Chain.create(chain);

    const story = {
      title: storyTitle,
      isPublic: true,
      maxWordCount: maxWordCount,
      numberOfLinks: numberOfLinks,
      chains: createdChain,
    };

    await Story.create(story);
    console.log(req.body);
    if (!wordCountLimitIsValid(parseInt(maxWordCount), linkContent))
      throw new Error("Invalid word count limit");
    if (!numberOfLinksIsValid(parseInt(numberOfLinks)))
      throw new Error("Invalid number of links");

    res.status(201).json({
      success: true,
      message: "Story created successfully",
    });
  } catch (err) {
    console.error("Error creating story:", err);
    res.status(500).json({
      error: "An error occurred while creating the story",
    });
  }
});

router.get("/stories-and-drafts", async (_req: Request, res: Response) => {
  try {
    const stories = await Story.find();
    res.status(201).json(stories);
  } catch (err) {
    console.log(err);
  }
});

router.get("/filter", async (req: Request, res: Response) => {
  try {
    const search = new RegExp(req.query.search as string, "i");
    const searchQuery = [
      { title: search },
      { contributors: { $in: [search] } },
    ];

    let query: any = { $or: searchQuery };

    const activeTab = req.query.activeTab;
    if (activeTab === "Ongoing") {
      query.status = "ongoing";
    } else if (activeTab === "Completed") {
      query.status = "completed";
    }

    const select = req.query.select;
    let sort = {};
    switch (select) {
      case "Recently Updated":
        sort = { updatedAt: -1 };
        break;
      case "Oldest Story":
        sort = { createdAt: 1 };
        break;
    }

    const stories = await Story.find(query).or(searchQuery).sort(sort);

    res.json(stories);
  } catch (err) {
    console.log(err);
  }
});

export default router as Router;
