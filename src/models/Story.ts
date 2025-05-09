import mongoose from "mongoose";
import { ChainSchema, IChain } from "./Chain";

export interface IStory extends mongoose.Document {
  title: string;
  isPublic: boolean;
  contributors: string[];
  status: "ongoing" | "completed" | "drafting";
  createdAt: Date;
  updatedAt: Date;
  chains: IChain[];
  maxWordCount: number;
  numberOfLinks: number;
  isPublished: boolean;
  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  contributors: {type: [String], default: []},
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  chains: { type: [ChainSchema], default: [] },
  maxWordCount: { type: Number, required: true },
  numberOfLinks: { type: Number, required: true },
  isPublished: {type: Boolean, required: true},
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  writingOrder: { type: [String], required: false },
  timePerTurn: { type: String, required: false },
});

export const Story = mongoose.model<IStory>("Story", StorySchema);
