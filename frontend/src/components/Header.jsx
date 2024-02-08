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
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Prince Engg.</Navbar.Brand>
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
                <Link to={"/login"}>
                  <Nav.Link href="#action2">Login</Nav.Link>
                </Link>
                <Nav.Link href="#action2">Register</Nav.Link>
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
      </Container>
    </header>
  );
};

export default Header;
