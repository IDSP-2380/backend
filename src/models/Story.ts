import mongoose from "mongoose";
import { ChainSchema, IChain } from "./Chain";

export interface IStory extends mongoose.Document {
  title: string;
  isPublic: boolean;
  contributors: string[];
  status: "Ongoing" | "Completed" | "Drafting";
  createdAt: Date;
  updatedAt: Date;
  chains: IChain[];
  maxWordCount: number;
  numberOfLinks: number;
  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  contributors: { type: [String], default: [] },
  status: {
    type: String,
    enum: ["Ongoing", "Completed"],
    default: "Ongoing",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  chains: { type: [ChainSchema], default: [] },
  maxWordCount: { type: Number, required: true },
  numberOfLinks: { type: Number, required: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  writingOrder: { type: [String], required: false },
  timePerTurn: { type: String, required: false },
});

export const Story = mongoose.model<IStory>("Story", StorySchema);
