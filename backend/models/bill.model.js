import Mongoose from "mongoose";

const BillSchema = new Mongoose.Schema(
  {
    client: {
      type: Mongoose.Schema.Types.ObjectId,
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
      default: 0,
    },
    GST_No: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hsn_code: {
      type: String,
      required: true,
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

const Bill = Mongoose.model("Bill", BillSchema);

export default Bill;
