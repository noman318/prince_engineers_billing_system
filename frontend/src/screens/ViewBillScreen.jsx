import React from "react";
import { useGetBillByIdQuery } from "../slices/billsApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Container } from "react-bootstrap";
import ViewBillHeader from "../components/ViewBill/ViewBillHeader";
import BillHeader from "../components/ViewBill/BillHeader";
import AmountData from "../components/ViewBill/AmountData";
import ViewBillFooter from "../components/ViewBill/ViewBillFooter";
import "../components/ViewBill/ViewBillHeader.css";

const ViewBillScreen = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetBillByIdQuery(id);
  // console.log("data", data);
  return (
    <Container className="mt-4">
      <h4>Bill No. {data?.invoice_no}</h4>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <>
          <Container className="border border-2 p-4">
            <p className="text-center">Tax Invoice</p>
            <hr />
            <ViewBillHeader data={data} />
            <p
              style={{ width: "50%", marginLeft: "12%", marginTop: "2%" }}
              className="description"
            >
              SPECIALIST IN: GATE VALVE, SAFETY VALVE, NEEDLE VALVE, BALL VALVE,
              CHACK VALVE, HYDROLIC PUMP, ELBOW, TEE, FLANGE, TUBE FITTING OR
              PIPE FITTING & ALL KINDS OF MACHINERY PARTS.
            </p>
            <hr />
            <div className="other_data">
              ADDRESS : 11, Ashok Nagar Rahivashi Sngh, Near Petrol Pump, Cama
              Estate, Goregaon (East) MUMBAI-400063
              <h6>TEL: 9323021396</h6>
            </div>
            <br />
            <BillHeader data={data} />
            <hr />
            <AmountData data={data} />
            <hr />
            <ViewBillFooter />
          </Container>
        </>
      )}
    </Container>
  );
};

export default ViewBillScreen;
