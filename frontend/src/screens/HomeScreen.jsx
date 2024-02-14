import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BillTable from "../components/BillTable";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Container>
        <h1>Home Screen</h1>
        <Button onClick={() => navigate("/create-bill")} className="mb-4">
          Create Bill
        </Button>
        <BillTable />
      </Container>
    </main>
  );
};

export default HomeScreen;
