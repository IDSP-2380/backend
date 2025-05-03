import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  clerkId: string;
  username: string;
}

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  username: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);
