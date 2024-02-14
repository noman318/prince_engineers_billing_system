import React from "react";
// eslint-disable-next-line no-unused-vars
import { Container, Button } from "react-bootstrap";
import { useGetBillByIdQuery } from "../slices/billsApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";

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
          <div>
            <h6>Company No. {data?.GST_No}</h6>
            <br />
            <p>Invoice Date</p>
            <DatePicker showIcon selected={JSON?.parse(data?.invoice_date)} />
            <br />
            <p>Our Date</p>
            <DatePicker showIcon selected={JSON?.parse(data?.our_date)} />
          </div>
        </>
      )}
    </Container>
  );
};

export default ViewBillScreen;
