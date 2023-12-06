import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./auth.scss";
import { register } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState, login as loginAction } from "../../store";
import { handleError } from "../../utils/error";

const Register: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { value } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (value) {
      navigate("/landing");
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    register({ email, password })
      .then((res) => {
        dispatch(loginAction(res));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  return (
    <div className={classNames("register-container")}>
      <Card className={classNames("register-card")}>
        <Card.Body>
          <Card.Title className={classNames("register-title")}>
            Step 1: Create an account
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className={classNames("label-text")}>
                Email
              </Form.Label>
              <Form.Control
                type="email" // changed to email type
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={classNames("input-field")}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className={classNames("label-text")}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={classNames("input-field")}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label className={classNames("label-text")}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={classNames("input-field")}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={classNames("register-btn")}
            >
              Register Now
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className={classNames("member-purchase-prompt", "section")}>
        Have an account?{" "}
        <span
          className={classNames("member-purchase")}
          onClick={() => navigate("/membership-login")}
        >
          Back to login
        </span>
      </div>
    </div>
  );
};

export default Register;
