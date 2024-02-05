import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createNewBill,
  deleteBill,
  getAllBills,
  getBillByID,
  updateExistingBill,
} from "../controllers/bill.controller.js";
const router = express.Router();

router.route("/").post(protect, createNewBill).get(protect, getAllBills);
router
  .route("/:id")
  .put(protect, updateExistingBill)
  .get(protect, getBillByID)
  .delete(protect, deleteBill);

export default router;
