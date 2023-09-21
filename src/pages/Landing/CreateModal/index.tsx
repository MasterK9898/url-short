import React from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
// import "./index.scss";
import type { URLPayload, URLUnit } from "../interface";

const mock = (payload: URLPayload): Promise<URLUnit> =>
  new Promise((r) =>
    setTimeout(() => {
      r({ id: "04fg65", ...payload, _id: "12345" });
    }, 1000)
  );
interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FunctionComponent<CreateModalProps> = ({
  onClose,
}) => {
  const [validated, setValidated] = React.useState(false);

  const [data, setData] = React.useState<URLPayload>({ url: "", id: "" });

  // const handleClose = () => {
  //   setData({ url: "", id: "" });
  //   // setShow(false);
  //   setValidated(false);
  // };
  // const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await mock(data);

    console.log(res);

    setValidated(true);
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header>Get started</Modal.Header>
      <Modal.Body>
        <Form
          // remount the form every time to refresh validation
          // key={show ? "1" : "0"}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <InputGroup className="mb-3">
            <Form.Control
              required
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="Target URL"
              aria-label="URL"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              http://short.ly/
            </InputGroup.Text>
            <Form.Control
              minLength={6}
              maxLength={8}
              value={data.id}
              placeholder="Customized Name (Optional)"
              aria-label="Id"
              aria-describedby="basic-addon1"
              onChange={(e) => setData({ ...data, id: e.target.value })}
            />
          </InputGroup>
          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
