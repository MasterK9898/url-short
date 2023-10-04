import React from "react";

import { Button, Modal } from "react-bootstrap";
import Form from "./Form";

import "./index.scss";
import classNames from "classnames";

interface CreateProps {
  title?: string;
  text: string;
  className?: string;
}

const Create: React.FunctionComponent<CreateProps> = ({
  title,
  text,
  className,
}) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      {show && (
        <Modal
          show
          onHide={() => setShow(false)}
          className={classNames("create-form")}
        >
          {title && (
            <Modal.Header className={classNames("header")}>
              {title}
            </Modal.Header>
          )}
          <Modal.Body>
            <Form />
          </Modal.Body>
        </Modal>
      )}

      <Button className={classNames("create")} onClick={() => setShow(true)}>
        {text}
      </Button>
    </>
  );
};

export default Create;
