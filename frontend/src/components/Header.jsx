import React from "react";
import {
  Nav,
  // eslint-disable-next-line no-unused-vars
  NavDropdown,
  Navbar,
  Container,
  Form,
  Button,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>Prince Engg.</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
            <Nav className="ml-auto my-2 my-lg-0">
              <LinkContainer to={"/login"}>
                <Nav.Link href="#action2">Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/register"}>
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                
                <NavDropdown.Item href="#action4">Admin </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Register </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
