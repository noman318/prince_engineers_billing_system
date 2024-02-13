import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
import { FaRegTrashAlt, FaPlusCircle } from "react-icons/fa";
import numberToWords from "number-to-words";
import indianNumberFormat from "indian-number-format";
import { useCreateBillMutation } from "../slices/billsApiSlice";
import { toast } from "react-toastify";

const CreateBillScreen = () => {
  const initialBillData = {
    client: "",
    name: "",
    GST_No: "",
    Our_GST_No: "27AWLPS1825L1ZZ",
    invoice_no: 0,
    invoice_date: "",
    our_date: "",
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
  const amountInWordsIndian = (number) => {
    const words = numberToWords.toWords(number);
    return indianNumberFormat.format(words);
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
  //   console.log("orderItems", orderItems);
  //   console.log("orderArray", orderArray);
  const [createBill, { isLoading }] = useCreateBillMutation();

  let totalVal;
  totalVal = orderArray.reduce((acc, item) => {
    acc += Number(item.total);
    return acc;
  }, 0);

  const changeText = (str) => {
    const splitStr = str?.split("_");
    const capitalize = splitStr?.map(
      (item) => item?.charAt(0)?.toUpperCase() + item.slice(1)
    );
    const finalText = capitalize.join(" ");
    return finalText;
  };
  const gstValue = (total, gstType) => {
    // console.log("gstType", gstType);
    // console.log("total", total);
    return Math.round(Number((total * gstType) / 100));
  };
  //   console.log("gstValue", gstValue(totalVal, cgst));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevBillData) => ({
      ...prevBillData,
      [name]: value,
    }));
  };

  const wordsIndian = amountInWordsIndian(billData.Grand_Total);
  // console.log("wordsIndian", wordsIndian);
  useEffect(() => {
    const cgst = Number(gstValue(totalVal, billData.CGST));
    const sgst = Number(gstValue(totalVal, billData.SGST));
    const igst = Number(gstValue(totalVal, billData.IGST));
    const grandTotal =
      Number(totalVal) +
      Number(billData.packaging_charges) +
      Number(cgst) +
      Number(sgst) +
      Number(igst);
    setBillData((prevBillData) => ({
      ...prevBillData,
      total: totalVal,
      orderItems: orderArray,
      amount_in_words: wordsIndian,

      Grand_Total: grandTotal.toFixed(2),
    }));
  }, [
    billData.CGST,
    billData.IGST,
    billData.SGST,
    billData.packaging_charges,
    wordsIndian,
    orderArray,
    totalVal,
  ]);
  //   console.log("billData", billData);
  const convertNumericProperties = (data) => {
    const convertProperty = (propValue) => {
      if (typeof propValue === "string" && !isNaN(propValue)) {
        return Number(propValue);
      } else if (typeof propValue === "object") {
        if (Array.isArray(propValue)) {
          return propValue.map(convertProperty);
        } else {
          return convertNumericProperties(propValue);
        }
      }
      return propValue;
    };

    const convertedData = { ...data };

    Object.keys(convertedData).forEach((prop) => {
      convertedData[prop] = convertProperty(convertedData[prop]);
    });

    return convertedData;
  };

  const convertedData = convertNumericProperties(billData);
  //   console.log("convertedData", convertedData);
  const handleNewBill = async (e) => {
    e.preventDefault();
    // console.log("new Bill");
    // console.log("billData", convertedData);
    try {
      const newBill = await createBill(convertedData).unwrap();
      console.log("newBill", newBill);
      toast.success("Bill Created");
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
      total: orderItems.qty + orderItems.rate,
    };
    console.log("newItem", newItem);
    setOrderArray([...orderArray, newItem]);
    setOrderItems(initialOrderItems);
  };
  const removeItems = (id) => {
    // console.log("id", id);
    const updateArray = orderArray?.filter((_, i) => id !== i);
    // console.log("updateArray", updateArray);
    setOrderArray(updateArray);
  };

  return (
    <Container>
      <h1>Create New Bill</h1>
      <Row>
        <Form onSubmit={handleNewBill}>
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
                <Table responsive="sm">
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
                          style={{ backgroundColor: "red", color: "white" }}
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

          <Button type="submit" size="lg" disabled={isLoading}>
            Create
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CreateBillScreen;
