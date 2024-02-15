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
            <img
              src="https://www.instrumentation-fittings.com/wp-content/uploads/2016/06/Gate-Valve-Bar-Stock.jpg"
              alt=""
            />
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
          <h6>Invoice Date</h6>
          <DatePicker selected={JSON?.parse(data?.invoice_date)} />
          <br />
        </div>
      </div>
    </header>
  );
};

export default ViewBillHeader;
