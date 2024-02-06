import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createNewBill,
  deleteBill,
  getAllBills,
  getBillByID,
  updateExistingBill,
  updateBillToPaid,
  updateOrderToDelivered,
} from "../controllers/bill.controller.js";
const router = express.Router();

router.route("/").post(protect, createNewBill).get(protect, getAllBills);
router
  .route("/:id")
  .put(protect, updateExistingBill)
  .get(protect, getBillByID)
  .delete(protect, deleteBill);
router.route("/:id/pay").put(protect, admin, updateBillToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
