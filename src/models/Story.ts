import mongoose from "mongoose";

export interface IStory extends mongoose.Document {
  title: string;
  isPublic: boolean;
  contributors: { userId: string; username: string }[];
  status: "ongoing" | "completed" | "drafting";
  createdAt: Date;
  updatedAt: Date;
  chains: any[];

  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  contributors: [
    {
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
