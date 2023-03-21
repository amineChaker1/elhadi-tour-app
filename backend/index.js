import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/auth.js";
import propertyRouter from "./routes/property.js";
import uploaadRouter from "./routes/upload.js";
dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/auth", userRouter);
app.use("/property", propertyRouter);
app.use("/upload", uploaadRouter);
app.listen(3000, () => {
  console.log("Server Started At Port 3000 ");
});
