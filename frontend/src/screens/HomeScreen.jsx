import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Container>
        <h1>Home Screen</h1>
        <Button onClick={() => navigate("/create-bill")}>Create Bill</Button>
      </Container>
    </main>
  );
};

export default HomeScreen;
