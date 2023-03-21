import express from "express";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getFeaturedProperties,
  getOneProperty,
  getTypeProerty,
  getTypesProperties,
  updateProperty,
} from "../controllers/property.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/getAll", getAllProperties);
router.get("/find/featured", getFeaturedProperties);
router.get("/find", getTypeProerty);
router.get("/find/types", getTypesProperties);
router.get("/find/:id", getOneProperty);
router.post("/", createProperty);
router.put("/:id", verifyToken, updateProperty);
router.put("/:id", verifyToken, deleteProperty);
export default router;
