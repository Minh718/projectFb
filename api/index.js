import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
dotenv.config();
// import cors from "cors";
const app = express();
const port = 8000;

// app.use(cors());
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
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log("Backend server is running!");
});
