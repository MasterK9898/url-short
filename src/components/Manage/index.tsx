import classNames from "classnames";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import "./index.scss";
import { URLUnit } from "../../pages/Landing/interface";
import { getShortURLs } from "../../utils/api";
import URLDisplay from "../URLDisplay";

interface ManageProps {}

const Manage: React.FunctionComponent<ManageProps> = () => {
  const [show, setShow] = React.useState(false);

  const [urls, setUrls] = React.useState<Array<URLUnit>>([]);

  React.useEffect(() => {
    getShortURLs().then(setUrls);
  }, []);

  return (
    <>
      {show && (
        <Modal
          show
          onHide={() => setShow(false)}
          className={classNames("create-form")}
        >
          <Modal.Body>
            {urls.map((url, index) => {
              return (
                <div key={index} className={classNames("display-holder")}>
                  <div className={classNames("url")}>{url.url}</div>
                  <URLDisplay data={url} />
                </div>
              );
            })}
          </Modal.Body>
        </Modal>
      )}

      <Button className={classNames("manage")} onClick={() => setShow(true)}>
        Manage My URLs
      </Button>
    </>
  );
};

export default Manage;
