import mongoose from "mongoose";
import { LinkSchema, ILink } from "./Link";

export interface IChain extends mongoose.Document {
    isComplete: boolean
    links: ILink[]
}

export const ChainSchema = new mongoose.Schema({
    isComplete: {type: Boolean, default: false},
    links: {type: [LinkSchema], default: []}
  });
  
  export const Chain = mongoose.model<IChain>("Chain", ChainSchema);