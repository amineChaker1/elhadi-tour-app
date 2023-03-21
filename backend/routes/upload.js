import express from "express";
import { imageUploader } from "../controllers/upload.js";

const router = express.Router();

router.post("/image", imageUploader);
export default router;
