import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClient,
} from "../controllers/client.controller.js";
const router = express.Router();

router.route("/").post(protect, createClient).get(protect, getAllClients);
router
  .route("/:id")
  .get(protect, getClientById)
  .put(protect, updateClientById)
  .delete(protect, deleteClient);

export default router;
