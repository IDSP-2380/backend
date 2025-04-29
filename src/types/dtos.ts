import { z } from "zod";

export const contributorSchema = z.object({
  userId: z.number(),
  username: z.string(),
});

export const newStorySchema = z.object({
  title: z.string(),
  isPublic: z.boolean().default(true),
  contributors: z.array(contributorSchema),
  status: z.enum(["ongoing", "completed"]).default("ongoing"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  chains: z.array(z.any()).default([]),

  startDate: z.date().optional(),
  endDate: z.date().optional(),
  writingOrder: z.array(z.string()).optional(),
  timePerTurn: z.string().optional(),
});
