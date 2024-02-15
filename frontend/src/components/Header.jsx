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
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [logoutCall] = useLogoutMutation();

  // console.log("userInfo", userInfo);
  const logoutHandler = async () => {
    await logoutCall().unwrap();
    toast.success("Logged Out");
    dispatch(logout());
  };
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
              {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            </Nav>
            {userInfo ? (
              <NavDropdown
                title={userInfo?.name}
                id="username"
                style={{ marginRight: "10px" }}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" className="m-3">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

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
