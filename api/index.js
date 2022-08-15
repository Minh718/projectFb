import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import path from "path";
import multer from "multer";
import postRouter from "./routes/posts.js";
const __dirname = path.resolve();
dotenv.config();

const app = express();
const port = 8000;

app.use("/images", express.static(path.join(__dirname, "/public/images")));
// app.use("/images", express.static("/public/images"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/person");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploadAvatar = multer({ storage: storageAvatar });
app.post("/api/uploadAvatar", uploadAvatar.single("avatar"), (req, res) => {
  try {
    res.status(200).json("file uploaded");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.listen(port, () => {
  console.log("Backend server is running!");
});
