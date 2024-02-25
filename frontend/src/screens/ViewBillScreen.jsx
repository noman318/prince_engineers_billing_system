import React, { useState } from "react";
import { useGetBillByIdQuery } from "../slices/billsApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Container, Button } from "react-bootstrap";
import ViewBillHeader from "../components/ViewBill/ViewBillHeader";
import BillHeader from "../components/ViewBill/BillHeader";
import AmountData from "../components/ViewBill/AmountData";
import ViewBillFooter from "../components/ViewBill/ViewBillFooter";
import "../components/ViewBill/ViewBillHeader.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewBillScreen = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetBillByIdQuery(id);
  const [loading, setLoading] = useState(false);
  // console.log("data", data);
  const downloadPdf = async () => {
    try {
      setLoading(true);
      const capture = document.querySelector(".bill-pdf");
      // console.log("capture", capture);
      setLoading(true);
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoading(false);
        doc.save(`${data?.invoice_no}.pdf`);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container className="mt-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Bill No. {data?.invoice_no}</h4>
        <Button variant="secondary mb-3" onClick={downloadPdf}>
          {loading ? "Downloading Bill" : "Download Bill"}
        </Button>
      </div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="bill-pdf">
          <Container className="border border-2" style={{ padding: "2.5rem" }}>
            <p className="text-center">Tax Invoice</p>
            <hr />
            <ViewBillHeader data={data} />
            <p
              style={{ width: "50%", marginLeft: "9%", marginTop: "2%" }}
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
        </div>
      )}
    </Container>
  );
};

export default ViewBillScreen;
