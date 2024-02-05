import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.route("/login").post(loginUser);

export default router;
