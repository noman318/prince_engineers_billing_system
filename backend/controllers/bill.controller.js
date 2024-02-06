import Bill from "../models/bill.model.js";
import Client from "../models/client.model.js";

const createNewBill = async (req, res, next) => {
  const {
    name,
    invoice_no,
    invoice_date,
    our_date,
    our_challan_no,
    total,
    packaging_charges,
    SGST,
    CGST,
    IGST,
    Grand_Total,
    GST_No,
    address,
    hsn_code,
    amount_in_words,
    orderItems,
    client,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      throw new Error("No Order Items");
    } else {
      const newBill = await Bill.create({
        orderItems,
        client,
        name,
        invoice_no,
        invoice_date,
        our_date,
        our_challan_no,
        total,
        packaging_charges,
        SGST,
        CGST,
        IGST,
        Grand_Total,
        GST_No,
        address,
        hsn_code,
        amount_in_words,
      });

      return res.status(201).json(newBill);
      // console.log("newBill", newBill);
    }
  } catch (error) {
    next(error);
  }
};

const getAllBills = async (req, res, next) => {
  try {
    const allBills = await Bill.find({}).populate({
      path: "client",
      model: Client,
      select: "name email GST_No address",
    });
    return res.json(allBills);
  } catch (error) {
    next(error);
  }
};

const getBillByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id).populate({
      path: "client",
      model: Client,
      select: "name email GST_No address",
    });
    if (!bill) {
      throw new Error("Bill not Found");
    }
    return res.json(bill);
  } catch (error) {
    next(error);
  }
};

const updateExistingBill = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    invoice_no,
    invoice_date,
    our_date,
    our_challan_no,
    total,
    packaging_charges,
    SGST,
    CGST,
    IGST,
    Grand_Total,
    GST_No,
    address,
    hsn_code,
    amount_in_words,
    orderItems,
  } = req.body;
  try {
    const bill = await Bill.findById(id);
    // console.log("bill", bill);
    if (!bill) {
      throw new Error("No Bill Found");
    } else {
      const updateBill = await Bill.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            invoice_no,
            invoice_date,
            our_date,
            our_challan_no,
            total,
            packaging_charges,
            SGST,
            CGST,
            IGST,
            Grand_Total,
            GST_No,
            address,
            hsn_code,
            amount_in_words,
            orderItems,
          },
        },
        { new: true }
      );
      return res.status(201).json(updateBill);
    }
  } catch (error) {
    next(error);
  }
};

const updateBillToPaid = async (req, res, next) => {};

const updateOrderToDelivered = async (req, res, next) => {};

const deleteBill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    // console.log("bill", bill);
    if (!bill) {
      throw new Error("No Bill Found");
    }
    const deletedBill = await Bill.findByIdAndDelete(id);
    return res.json(deletedBill);
  } catch (error) {
    next(error);
  }
};

export {
  createNewBill,
  updateExistingBill,
  getAllBills,
  getBillByID,
  deleteBill,
  updateBillToPaid,
  updateOrderToDelivered,
};
