import express from "express";
import { addNewPlace, getAllPlaces } from "../controllers/place.js";

const router = express.Router();
router.get("/", getAllPlaces);
router.post("/", addNewPlace);
export default router;
