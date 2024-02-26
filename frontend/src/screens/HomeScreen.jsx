import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BillTable from "../components/BillTable";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state?.auth);

  const navigate = useNavigate();
  console.log("userInfo", userInfo);
  return (
    <main>
      <Container>
        <h1>Home Screen</h1>
        <Button onClick={() => navigate("/create-bill")} className="mb-4">
          Create Bill
        </Button>
        {userInfo ? (
          <BillTable />
        ) : (
          <>
            <h2 className="text-center">Please Authorize yourself</h2>
          </>
        )}
      </Container>
    </main>
  );
};

export default HomeScreen;
