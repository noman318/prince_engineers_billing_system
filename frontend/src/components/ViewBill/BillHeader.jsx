import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { formatDate } from "../../utils/functions";

const BillHeader = ({ data }) => {
  //   console.log("data", data);
  const { hsn_code } = data;
  return (
    <Container className="mb-4">
      <Row className="px-4">
        <Col md={6}>
          <h6>Name: {data?.name}</h6>
          <h6>Address: {data?.address}</h6>
          <h6>GST No.: {data?.GST_No}</h6>
        </Col>
        <Col md={3}>
          <h6>GR./RR/No. : {data?.GR_RR_No ? data?.GR_RR_No : " "}</h6>
          <h6>Your Challan No. : {data?.our_challan_no}</h6>
          <h6>Your Challan No. : {data?.our_challan_no}</h6>
        </Col>
        <Col md={3}>
          <h6>Date: {data?.GR_RR_No ? data?.GR_RR_No : " "}</h6>
          <h6>Date: {formatDate(data?.invoice_date)}</h6>
          <h6>Date: {formatDate(data?.our_date)}</h6>
        </Col>
      </Row>
      <br />
      <Table bordered>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Description of Goods</th>
            <th>HSN Code</th>
            <th>Quantity</th>
            <th>
              Rate <br /> <sub>(per item)</sub>
            </th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data?.orderItems?.map((data, index) => (
              <tr key={data?._id}>
                <td>{index + 1}</td>
                <td>{data?.name}</td>
                <td>{hsn_code}</td>
                <td>{data?.qty}</td>
                <td>{data?.rate}</td>
                <td>{data?.total}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BillHeader;
