import mongoose from "mongoose";

export interface ILink extends mongoose.Document {
  content: string;
  author: string;
  stage: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    stage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
export const Link = mongoose.model<ILink>("Link", LinkSchema);