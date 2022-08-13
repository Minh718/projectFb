import express from "express";
import { User } from "../models/User.js";
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) res.status(404).json("không tìm thấy");
  else {
    if (user.password === req.body.password) {
      res.status(200).json(user);
    } else res.status(400).json("wrong password");
  }
});
authRouter.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  const user = await newUser.save();
  res.status(200).json(user);
});
export default authRouter;
