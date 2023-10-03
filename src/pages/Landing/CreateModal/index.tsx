import React from "react";

import { Modal } from "react-bootstrap";
import CreateForm from "./CreateForm";

import "./index.scss";

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FunctionComponent<CreateModalProps> = ({
  onClose,
}) => {
  return (
    <Modal show onHide={onClose} className="create-form">
      <Modal.Header>Get started</Modal.Header>
      <Modal.Body>
        <CreateForm />
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
