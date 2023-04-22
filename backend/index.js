import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
//import placeRouter from "./routes/place.js";
import path from "path";
import { fileURLToPath } from "url";
import imageDownloader from "image-downloader";
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
//app.use("/place", placeRouter);
app.post("/upload", async (req, res) => {
  const { link } = req.body;
  try {
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    /*const url = await uploadToS3(
      "/tmp/" + newName,
      newName,
      mime.lookup("/tmp/" + newName)
    );*/
    res.json(newName);
  } catch (error) {
    res.status(500).json({
      location: error.location,
      message: error.message,
    });
  }
});
app.use("/uploads", express.static(__dirname + "/uploads"));
/*app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});*/
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log(" connected to DB");
});
app.listen(4321, () => {
  console.log("server started ");
});
