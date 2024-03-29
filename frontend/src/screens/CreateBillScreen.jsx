import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
import { FaRegTrashAlt, FaPlusCircle } from "react-icons/fa";

import {
  useCreateBillMutation,
  useGetBillByIdQuery,
  useUpdateBillMutation,
  useUpdateBilltoDeliverMutation,
  useUpdateBilltoPaidMutation,
} from "../slices/billsApiSlice";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllClientsQuery } from "../slices/clientApiSlice";
import {
  amountInWordsIndian,
  changeText,
  convertNumericProperties,
  gstValue,
} from "../utils/functions";

const CreateBillScreen = () => {
  const { id } = useParams();
  const { data, refetch } = useGetBillByIdQuery(id);
  const { data: clientData } = useGetAllClientsQuery();
  // console.log("billData", data);
  const navigate = useNavigate();

  const [mode, setMode] = useState("create");
  const initialBillData = {
    name: "",
    GST_No: "",
    Our_GST_No: "27AWLPS1825L1ZZ",
    invoice_no: 0,
    // invoice_date: "",
    // our_date: "",
    our_challan_no: 0,
    total: 0.0,
    address: "",
    hsn_code: "",
    packaging_charges: 0.0,
    SGST: 0.0,
    CGST: 0.0,
    IGST: 0.0,
    Grand_Total: 0.0,
    amount_in_words: "",
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
  // eslint-disable-next-line no-unused-vars
  const [client, setClient] = useState("");

  useEffect(() => {
    if (id) {
      // If there is an id parameter, it means we are in update mode
      setMode("update");
    } else {
      // If there is no id parameter, it means we are in create mode
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
  //   console.log("orderItems", orderItems);
  //   console.log("orderArray", orderArray);
  const [createBill, { isLoading }] = useCreateBillMutation();
  const [updateToPaid, { isLoading: payLoading }] =
    useUpdateBilltoPaidMutation();
  const [updateToDeliverd, { isLoading: deliverLoading }] =
    useUpdateBilltoDeliverMutation();
  const [updateBillData, { isLoading: updateLoading }] =
    useUpdateBillMutation(id);
  let totalVal;
  totalVal = orderArray.reduce((acc, item) => {
    acc += Number(item.total);
    return acc;
  }, 0);

  //   console.log("gstValue", gstValue(totalVal, cgst));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevBillData) => ({
      ...prevBillData,
      [name]: value,
    }));
  };

  const wordsIndian = amountInWordsIndian(billData.Grand_Total);
  const newWords = changeText(wordsIndian);
  // console.log("newWords", newWords);
  // console.log("wordsIndian", wordsIndian);
  useEffect(() => {
    const cgst = Number(gstValue(totalVal, billData.CGST));
    const sgst = Number(gstValue(totalVal, billData.SGST));
    const igst = Number(gstValue(totalVal, billData.IGST));
    const newInvioceDate = JSON.stringify(invoiceDate);
    const newOurDate = JSON.stringify(ourDate);
    // console.log("newInvioceDate", newInvioceDate);
    const grandTotal =
      Number(totalVal) +
      Number(billData.packaging_charges) +
      Number(cgst) +
      Number(sgst) +
      Number(igst);
    setBillData((prevBillData) => ({
      ...prevBillData,
      client: client,
      total: totalVal,
      orderItems: orderArray,
      amount_in_words: newWords,
      invoice_date: newInvioceDate,
      our_date: newOurDate,
      Grand_Total: grandTotal.toFixed(2),
    }));
  }, [
    billData.CGST,
    billData.IGST,
    billData.SGST,
    billData.packaging_charges,
    newWords,
    orderArray,
    totalVal,
    invoiceDate,
    ourDate,
    client,
  ]);
  //   console.log("billData", billData);
  // console.log("invoiceDate", typeof invoiceDate);
  // console.log("ourDate", ourDate);

  const convertedData = convertNumericProperties(billData);
  //   console.log("convertedData", convertedData);
  const handleNewBill = async (e) => {
    e.preventDefault();
    // console.log("new Bill");
    // console.log("billData", convertedData);
    try {
      if (mode === "update") {
        const update = await updateBillData({
          id,
          data: convertedData,
        }).unwrap();
        refetch();
        console.log("update", update);
        toast.success("Bill Updated");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const newBill = await createBill(convertedData).unwrap();
        console.log("newBill", newBill);
        toast.success("Bill Created");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log("errr", error);
      toast.error(error?.data?.message || error?.message);
    }
  };
  const addItemsToBill = () => {
    // console.log("orderItemsInFunc", orderItems);
    const { name, qty, rate } = orderItems;
    const newItem = {
      name,
      qty,
      rate,
      total: Number(orderItems.qty) * Number(orderItems.rate),
    };
    console.log("newItem", newItem);
    setOrderArray([...orderArray, newItem]);
    setOrderItems(initialOrderItems);
  };
  const updateBillToPaidHandler = async (id) => {
    console.log("id", id);
    if (mode === "update" && data?.isPaid === false) {
      try {
        await updateToPaid(id).unwrap();
        // console.log("updateBill", updateBill);
        toast.success("Status Updated");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.log("error", error);
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  const updateBillToDeliverHandler = async (id) => {
    console.log("clicked ");
    if (mode === "update" && data?.isDelivered === false) {
      try {
        await updateToDeliverd(id).unwrap();
        // console.log("updateBill", updateBill);
        toast.success("Status Updated");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.log("error", error);
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  const removeItems = (id) => {
    const updateArray = orderArray?.filter((_, i) => id !== i);
    // console.log("updateArray", updateArray);
    setOrderArray(updateArray);
  };

  return (
    <Container>
      <h1> {mode === "update" ? "Update Bill" : "Create New Bill"} </h1>
      <Row>
        <Form onSubmit={handleNewBill} className="mb-4">
          <Col md={8} sm={12}>
            <h4>Items</h4>
            <Row>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={orderItems.name}
                    onChange={(e) =>
                      setOrderItems((prevOrderItems) => ({
                        ...prevOrderItems,
                        name: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={2} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Quantity"
                    value={orderItems.qty}
                    onChange={(e) =>
                      setOrderItems((prevOrderItems) => ({
                        ...prevOrderItems,
                        qty: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={2} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Rate"
                    value={orderItems.rate}
                    onChange={(e) =>
                      setOrderItems((prevOrderItems) => ({
                        ...prevOrderItems,
                        rate: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={2} sm={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Total</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Total"
                    value={orderItems.qty * orderItems.rate}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3">
                <Button className="m-3" onClick={addItemsToBill}>
                  <FaPlusCircle />
                </Button>
              </Col>
              {orderArray && orderArray.length > 0 && (
                <Table responsive="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderArray?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td>{item.total}</td>
                        <Button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            margin: "5% 30%",
                          }}
                          onClick={() => removeItems(index)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>
          </Col>

          <Col md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Date</Form.Label>
              <br />
              <DatePicker
                showIcon
                selected={invoiceDate}
                onChange={(date) => setInvoiceDate(date)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Our Challan Date</Form.Label>
              <br />
              <DatePicker
                showIcon
                selected={ourDate}
                onChange={(date) => setOurDate(date)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select
                onChange={(e) => setClient(e.target.value)}
                value={mode === "update" ? data?.client._id : client}
              >
                <option>Select Client</option>
                {clientData?.map((data) => (
                  <React.Fragment key={data?._id}>
                    <option value={data?._id}>{data?.name}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            </Form.Group>
            {Object.entries(initialBillData)?.map(([key, value]) => {
              return (
                <Form.Group key={key} className="mb-3">
                  <Form.Label>{changeText(key)}</Form.Label>
                  <Form.Control
                    type={typeof value === "number" ? "number" : "text"}
                    placeholder={changeText(key)}
                    name={key}
                    value={key === "total" ? totalVal : billData[key]}
                    onChange={handleChange}
                  />
                </Form.Group>
              );
            })}
          </Col>

          <Button type="submit" size="lg" disabled={isLoading || updateLoading}>
            {mode === "update" ? "Update" : "Create"}
          </Button>
          <br />
          <br />
        </Form>
        {mode === "update" ? (
          <div className="mb-4">
            <Button
              type="submit"
              size="sm"
              className="mx-4"
              disabled={payLoading || data?.isPaid === true}
              onClick={() => updateBillToPaidHandler(id)}
            >
              Mark as Paid
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={deliverLoading || data?.isDelivered === true}
              onClick={() => updateBillToDeliverHandler(id)}
            >
              Mark as Delivered
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default CreateBillScreen;
