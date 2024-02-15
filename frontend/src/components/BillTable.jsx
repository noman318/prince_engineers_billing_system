import React from "react";
import { useGetAllBillsQuery } from "../slices/billsApiSlice";
import Loader from "./Loader";
import { Table, Badge } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatDate, formatIndianNumber } from "../utils/functions";

const BillTable = () => {
  const { data, isLoading, isError } = useGetAllBillsQuery();
  const navigate = useNavigate();

  // console.log("data", data[5]);

  //   console.log("data[5]", data[3]);

  return (
    <React.Fragment>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div>
          <h3>All Bills</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Invoice No.</th>
                <th>Client Name</th>
                <th>Invoice Date</th>
                <th>Grand Total</th>
                <th>Payment Status</th>
                <th>View</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((data, index) => (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>{data?.invoice_no}</td>
                  <td>{data?.client.name}</td>
                  <td>{formatDate(data?.invoice_date)}</td>
                  <td>Rs: {formatIndianNumber(data?.Grand_Total)}.00/-</td>
                  <td>
                    {data.isPaid ? (
                      <>
                        <Badge bg="success">Paid</Badge>
                      </>
                    ) : (
                      <>
                        <Badge size="sm" bg="danger">
                          Not Paid
                        </Badge>
                      </>
                    )}
                  </td>
                  <td>
                    <FaEye
                      style={{ margin: "10px", cursor: "pointer" }}
                      onClick={() => navigate(`/view/${data._id}`)}
                    />
                  </td>
                  <td>
                    <MdEdit
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => navigate(`/edit/${data._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};

export default BillTable;
