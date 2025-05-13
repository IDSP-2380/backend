import mongoose from "mongoose";

export interface ILink extends mongoose.Document {
  content: string;
  author: string;
  stage: string;
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const LinkSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  stage: { type: String, required: true },
  isDraft: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Link = mongoose.model<ILink>("Link", LinkSchema);
