import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, login as loginAction } from "../../store";
import { getUser, login } from "../../utils/api";
import { handleError } from "../../utils/error";

const Login: React.FunctionComponent = () => {
  const { value } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (value) {
      navigate("/landing");
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password })
      .then(() => getUser())
      .then((res) => {
        dispatch(loginAction(res));
      })
      .catch((e) => {
        handleError(e);
      });
  };

  return (
    <div className={classNames("login-container")}>
      <Card className={classNames("login-card")}>
        <Card.Body>
          <Card.Title className={classNames("login-title")}>
            Member Login
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className={classNames("label-text")}>
                Email
              </Form.Label>
              <Form.Control
                type="text"
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
            <Button
              variant="primary"
              type="submit"
              className={classNames("login-btn", "dashbord")}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className={classNames("member-purchase-prompt")}>
        Don't have membership?{" "}
        <span
          className={classNames("member-purchase")}
          onClick={() => navigate("/membership-register")}
        >
          Register here!
        </span>
      </div>
    </div>
  );
};

export default Login;
