import express from "express";
import { addNewBooking, getAllBookings } from "../controllers/booking.js";

const router = express.Router();
router.post("/", addNewBooking);
router.post("/get", getAllBookings);
export default router;
