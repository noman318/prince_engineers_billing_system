import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ViewBillFooter = () => {
  return (
    <Container>
      <footer className="p-4">
        <Row>
          <Col md={8}>
            <h4>GSTIN NO.: 27AWLPS1825L1ZZ</h4>
            <h5>E & O.E</h5>
            <ul>
              <li>All Rates are net cash.</li>
              <li>Goods sold will not be taken back.</li>
              <li>All Disputes will only be settled in Mumbai juridiction.</li>
            </ul>
          </Col>
          <Col md={4} className="text-end mt-4">
            <h4>For Prince Engineers</h4>
            <br />
            <br />
            <h6>Signatory</h6>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default ViewBillFooter;
