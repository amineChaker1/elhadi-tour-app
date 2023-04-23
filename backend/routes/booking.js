import express from "express";
import { addNewBooking } from "../controllers/booking.js";

const router = express.Router();
router.post("/", addNewBooking);
export default router;
