import React from "react";
import "./ViewBillHeader.css";
import DatePicker from "react-datepicker";

const ViewBillHeader = ({ data }) => {
  // console.log("data", data);
  return (
    <header>
      <div className="header_parent">
        <div className="brand_name">
          <div className="brandClass">
            <img src="../Gate_Valve.jpg" alt="valve_logo" />
            <h1>Prince Engineers</h1>
          </div>
        </div>
        <div className="dates">
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "10%",
            }}
          >
            <h6>Invoice No.: </h6>
            <h6>{data?.invoice_no}</h6>
          </div>
          <br />
          <div
            className="d-flex justify-content-center align-items-center gap-4"
            style={{ marginLeft: "-12%" }}
          >
            <h6>Invoice Date: </h6>
            <DatePicker selected={JSON?.parse(data?.invoice_date)} />
          </div>
          <br />
        </div>
      </div>
    </header>
  );
};

export default ViewBillHeader;
