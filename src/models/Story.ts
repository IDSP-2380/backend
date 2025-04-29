import mongoose from "mongoose";
import { IStory } from "../types/story";

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  contributors: [
    {
      userId: { type: Number, required: true },
      username: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  chains: { type: Array, default: [] },

  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  writingOrder: { type: [String], required: false },
  timePerTurn: { type: String, required: false },
});

export const Story = mongoose.model<IStory>("Story", StorySchema);
