import React from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import "./index.scss";
import type { URLPayload, URLUnit } from "./interface";
import CreateModal from "./CreateModal";

const mock = (payload: URLPayload): Promise<URLUnit> =>
  new Promise((r) =>
    setTimeout(() => {
      r({ id: "04fg65", ...payload, _id: "12345" });
    }, 1000)
  );

const Landing: React.FunctionComponent = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="App">
        <div>Well come to URL shorterner</div>
        <Button variant="primary" onClick={handleShow}>
          Start Now
        </Button>
      </div>
      {show && <CreateModal onClose={handleClose} />}
    </>
  );
};

export default Landing;
