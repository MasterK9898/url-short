import * as React from "react";
import { Modal } from "react-bootstrap";
import { URLUnit } from "../../../interface";
import DisplayUnit from "./DisplayUnit";
import classNames from "classnames";

interface DisplayProps {
  show: boolean;
  urls: Array<URLUnit>;
  handleClose: () => void;
}

const Display: React.FunctionComponent<DisplayProps> = ({
  urls,
  show,
  handleClose,
}) => {
  const header = urls.length > 1 ? "Your short URLS" : "Your short URL";

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={classNames("display-modal")}
      dialogClassName={classNames("display-modal-dialog")}
    >
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classNames("display-modal-body")}>
        {urls.map((url) => (
          <>
            <DisplayUnit key={url.shortURL} data={url} />
            <br />
          </>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default Display;
