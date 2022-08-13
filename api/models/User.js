import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    friends: {
      type: Array,
      default: [],
    },
    giveRequests: {
      type: Array,
      default: [],
    },
    getRequests: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", UserSchema);
