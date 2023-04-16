import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/user.js";

const router = express.Router();
router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", loginUser);
export default router;
