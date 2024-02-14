/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useGetBillByIdQuery } from "../slices/billsApiSlice";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

const EditBillScreen = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBillByIdQuery(id);
  const [mode, setMode] = useState("create");

  console.log("dataInEdit", data);
  const initialBillData = {
    client: data?.client._id,
    name: data?.name,
    GST_No: data?.GST_No,
    Our_GST_No: "27AWLPS1825L1ZZ",
    invoice_no: data?.invoice_no,
    // invoice_date: "",
    // our_date: "",
    our_challan_no: data?.our_challan_no,
    total: data?.total,
    address: data?.address,
    hsn_code: data?.hsn_code,
    packaging_charges: data?.packaging_charges,
    SGST: data?.SGST,
    CGST: data?.CGST,
    IGST: data?.IGST,
    Grand_Total: data?.Grand_Total,
    amount_in_words: data?.amount_in_words,
  };
  const initialOrderItems = {
    name: "",
    qty: 0,
    total: 0.0,
    rate: 0.0,
  };

  const [billData, setBillData] = useState(initialBillData);
  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [orderArray, setOrderArray] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [ourDate, setOurDate] = useState(null);

  useEffect(() => {
    if (id) {
      setMode("update");
    } else {
      setMode("create");
    }
  }, [id]);

  useEffect(() => {
    if (mode === "update" && data) {
      // Set initial data for updating
      setBillData(data);
      setOrderArray(data.orderItems || []); // Assuming orderItems is an array
      setInvoiceDate(
        invoiceDate ||
          (data && data.invoice_date
            ? new Date(JSON.parse(data.invoice_date))
            : null)
      );
      setOurDate(
        ourDate ||
          (data && data.our_date ? new Date(JSON.parse(data.our_date)) : null)
      );
    }
  }, [mode, data, invoiceDate, ourDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevBillData) => ({
      ...prevBillData,
      [name]: value,
    }));
  };
  return (
    <Container>
      <h1>Edit Bill</h1>
      <DatePicker
        showIcon
        selected={
          invoiceDate ||
          (data && data.invoice_date
            ? new Date(JSON.parse(data.invoice_date))
            : null)
        }
        onChange={(date) => setInvoiceDate(date)}
      />
      <br />
      <p>Our Date</p>
      <DatePicker
        showIcon
        selected={
          ourDate ||
          (data && data.our_date ? new Date(JSON.parse(data.our_date)) : null)
        }
        onChange={(date) => {
          setOurDate(date);
        }}
      />
    </Container>
  );
};

export default EditBillScreen;
