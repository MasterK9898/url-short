import * as React from "react";

import { OverlayTrigger, Popover } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";

import { domain } from "../../utils/const";
import classNames from "classnames";

import "./index.scss";
import copy from "../../media/copy.svg";
import tick from "../../media/tick.svg";
import qrcode from "../../media/qrcode.svg";

import type { URLUnit } from "../../pages/Landing/interface";

interface CreateResultProps {
  data: URLUnit;
}

const CreateResult: React.FunctionComponent<CreateResultProps> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  const url = `${domain}${data.id}`;
  return (
    <div className={classNames("display")}>
      <div>Your short URL is: {url}</div>
      <OverlayTrigger
        trigger="hover"
        placement="top"
        overlay={
          <Popover>
            <div className={classNames("qrcode-holder")}>
              <QRCodeSVG className={classNames("qrcode")} value={url} />
            </div>
          </Popover>
        }
      >
        <img src={qrcode} className={classNames("operation")} />
      </OverlayTrigger>
      <img
        className={classNames("operation")}
        src={copy}
        onClick={() =>
          navigator.clipboard.writeText(data.id).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          })
        }
      />
      {copied && (
        <img
          className={classNames("operation", "success")}
          src={tick}
          onClick={() => navigator.clipboard.writeText(data.id)}
        />
      )}
    </div>
  );
};

export default CreateResult;
