import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useLoginMutation } from "../slices/usersApiSLice";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.auth);

  const [login, { isLoading }] = useLoginMutation();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("res", res);
      dispatch();
      toast.success("Logged In");
    } catch (error) {
      console.log("errr", error);
      toast.error(error?.data?.message || error?.message);
    }
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleTogglePassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
        <Row>
          <Col>
            <Link to={"/register"}>New User?</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
