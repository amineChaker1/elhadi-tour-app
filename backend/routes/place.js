import express from "express";
import {
  addNewPlace,
  getAllPlaces,
  getSinglePLace,
} from "../controllers/place.js";

const router = express.Router();
router.get("/", getAllPlaces);
router.get("/:id", getSinglePLace);
router.post("/", addNewPlace);
export default router;
