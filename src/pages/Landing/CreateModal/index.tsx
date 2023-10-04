import React from "react";

import { Modal } from "react-bootstrap";
import CreateForm from "./CreateForm";

import "./index.scss";
import classNames from "classnames";

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FunctionComponent<CreateModalProps> = ({
  onClose,
}) => {
  return (
    <Modal show onHide={onClose} className={classNames("create-form")}>
      <Modal.Header className={classNames("header")}>
        Create your short URL in 1 minute
      </Modal.Header>
      <Modal.Body>
        <CreateForm />
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
