import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { gstValue } from "../../utils/functions";
import "./ViewBillHeader.css";

const AmountData = ({ data }) => {
  //   console.log("data", data);
  const totalAfterPackage = Number(data?.total + data?.packaging_charges);
  return (
    <Container className="p-4">
      <Row>
        <Col md={8}>
          <span style={{ display: "flex", gap: "1rem" }}>
            <h5>Amount (In Words): {"  "}</h5>
            <p
              style={{
                textDecoration: "underline",
                textTransform: "capitalize",
                fontWeight: "bolder",
              }}
            >
              {data?.amount_in_words}
            </p>
          </span>
        </Col>
        <Col md={4}>
          <Table bordered>
            <tbody className="tableData">
              <tr>
                <td>Total</td>
                <td>{data?.total}</td>
              </tr>
              <tr>
                <td>Packing Charges</td>
                <td>{data?.packaging_charges}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{totalAfterPackage}</td>
              </tr>
              <tr>
                <td>SGST @ {data?.SGST}%</td>
                <td>{gstValue(totalAfterPackage, data?.SGST)}</td>
              </tr>
              <tr>
                <td>CGST @ {data?.CGST}%</td>
                <td>{gstValue(totalAfterPackage, data?.CGST)}</td>
              </tr>
              <tr>
                <td>IGST @ {data?.IGST}%</td>
                <td>{gstValue(totalAfterPackage, data?.IGST)}</td>
              </tr>
              <tr>
                <td>Grand Total</td>
                <td>{data?.Grand_Total}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AmountData;
