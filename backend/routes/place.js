import express from "express";
import {
  addNewPlace,
  getAllPlaces,
  getSinglePLace,
  updatePlace,
} from "../controllers/place.js";

const router = express.Router();
router.get("/", getAllPlaces);
router.get("/:id", getSinglePLace);
router.put("/:id", updatePlace);
router.post("/", addNewPlace);
export default router;
