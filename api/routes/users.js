import express from "express";
const userRouter = express.Router();
import { User } from "../models/User.js";
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json("not find it");
    else res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.put("/:id/request", async (req, res) => {
  try {
    const userCurrent = await User.findById(req.body.userId);
    const user = await User.findById(req.params.id);
    if (!userCurrent && !user) res.status(404).json("not find");
    else {
      await user.updateOne({ $push: { getRequests: req.body.userId } });
      await userCurrent.updateOne({ $push: { giveRequests: req.params.id } });
      res.status(200).json("Request sended");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.put("/:id/unRequest", async (req, res) => {
  try {
    const userCurrent = await User.findById(req.body.userId);
    const user = await User.findById(req.params.id);
    if (!userCurrent || !user) res.status(404).json("not find");
    else {
      await user.updateOne({ $pull: { getRequests: req.body.userId } });
      await userCurrent.updateOne({ $pull: { giveRequests: req.params.id } });
      res.status(200).json("Request sended");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.get("/:id/getRequests", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json("not find");
    else {
      const userReqs = await Promise.all(
        user.getRequests.map((getRequest) => {
          return User.findById(getRequest);
        })
      );
      res.status(200).json(userReqs);
    }
  } catch (err) {
    res.status(500).json("not find");
  }
});
userRouter.put("/:id/confirmReq", async (req, res) => {
  try {
    const userCurrent = await User.findById(req.body.id);
    const user = await User.findById(req.params.id);
    if (!user || !userCurrent) res.status(404).json("not find");
    else {
      await userCurrent.updateOne({ $push: { friends: req.params.id } });
      await userCurrent.updateOne({ $pull: { getRequests: req.params.id } });
      await user.updateOne({ $push: { friends: req.body.id } });
      await user.updateOne({ $pull: { giveRequests: req.body.id } });
      res.status(200).json("oke");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
userRouter.get("/:id/friends", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json("not find");
    else {
      const friends = await Promise.all(
        user.friends.map((friend) => {
          return User.findById(friend);
        })
      );
      res.status(200).json(friends);
    }
  } catch (err) {
    res.status(500).json("lỗi rồi");
  }
});
userRouter.put("/:id/rejectReq", async (req, res) => {
  try {
    const userCurrent = await User.findById(req.body.id);
    const user = await User.findById(req.params.id);
    if (!userCurrent || !user) res.status(404).json("not find");
    else {
      await userCurrent.updateOne({ $pull: { getRequests: req.params.id } });
      await user.updateOne({ $pull: { giveRequests: req.body.id } });
      res.status(200).json("oke con dê");
    }
  } catch (err) {
    res.status(500).json("error");
  }
});
userRouter.put("/:id/delete", async (req, res) => {
  try {
    const userCurrent = await User.findById(req.body.id);
    const user = await User.findById(req.params.id);
    if (!userCurrent || !user) res.status(404).json("not find");
    else {
      await user.updateOne({ $pull: { friends: req.body.id } });
      await userCurrent.updateOne({ $pull: { friends: req.params.id } });
      res.status(200).json("oke con dê");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//ổn thôi
export default userRouter;
