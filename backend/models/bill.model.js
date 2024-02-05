import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    name: {
      type: String,
      required: true,
    },
    invoice_no: {
      type: Number,
      required: true,
      unique: true,
    },
    invoice_date: {
      type: String,
      required: true,
    },
    our_date: {
      type: String,
      required: true,
    },
    our_challan_no: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    packaging_charges: {
      type: Number,
      default: 0,
    },
    SGST: {
      type: Number,
      default: 0,
    },
    CGST: {
      type: Number,
      default: 0,
    },
    IGST: {
      type: Number,
      default: 0,
    },
    Grand_Total: {
      type: Number,
      required: true,
      default: 0,
    },
    GST_No: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    hsn_code: {
      type: String,
      required: true,
    },
    amount_in_words: {
      type: String,
      required: true,
    },
    Our_GST_No: {
      type: String,
      required: true,
      default: "27AWLPS1825L1ZZ",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        total: { type: Number, required: true },
        rate: { type: Number, required: true },
      },
    ],
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", BillSchema);

export default Bill;
