import { z } from "zod";

export const contributorSchema = z.object({
  username: z.string(),
});

export const newStorySchema = z.object({
  storyTitle: z.string(),
  isPublic: z.boolean().default(true),
  contributors: z.string().array(),
  status: z.enum(["ongoing", "completed"]).default("ongoing"),
  chains: z.array(z.any()).default([]),
  maxWordCount: z.number(),
  numberOfLinks: z.number(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  writingOrder: z.array(z.string()).optional(),
  timePerTurn: z.string().optional(),
});
