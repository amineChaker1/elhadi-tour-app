import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log(" connected to DB");
});
app.listen(4321, () => {
  console.log("server started ");
});
