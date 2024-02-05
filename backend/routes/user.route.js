import express from "express";
import {
  getAllUsers,
  getUserByID,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getAllUsers).post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").get(protect, getUserByID);

export default router;
