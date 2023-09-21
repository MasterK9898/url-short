import React from "react";
import { Button } from "react-bootstrap";
import "./index.scss";
import CreateModal from "./CreateModal";

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
