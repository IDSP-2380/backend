import mongoose from "mongoose";

export interface Contributor {
  userId: string;
  username: string;
}

export interface IStory extends mongoose.Document {
  title: string;
  isPublic: boolean;
  contributors: Contributor[];
  status: "ongoing" | "completed";
  createdAt: Date;
  updatedAt: Date;
  chains: any[];

  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}

export interface NewStoryInput {
  title: string;
  isPublic: boolean;
  contributors: Contributor[];
  status: "ongoing" | "completed";
  chains: any[];

  startDate?: Date;
  endDate?: Date;
  writingOrder?: string[];
  timePerTurn?: string;
}
