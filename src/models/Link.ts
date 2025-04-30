import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    stage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const Link = mongoose.model("Link", LinkSchema);