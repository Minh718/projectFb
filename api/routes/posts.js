import { Post } from "../models/Post.js";
import express from "express";
const postRouter = express.Router();
postRouter.get("/oke", async (req, res) => {
  res.send("oke");
});
export default postRouter;
