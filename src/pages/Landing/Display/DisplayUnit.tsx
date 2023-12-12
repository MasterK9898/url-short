import * as React from "react";

import { OverlayTrigger, Popover } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";

import classNames from "classnames";

import "./index.scss";
import copy from "../../../media/copy.svg";
import qrcode from "../../../media/qrcode.svg";

import type { URLUnit } from "../../../interface";

interface DisplayUnitProps {
  data: URLUnit;
}

const DisplayUnit: React.FunctionComponent<DisplayUnitProps> = ({ data }) => {
  return (
    <div className={classNames("display")}>
      <div>
        <div>originURL: {data.longURL}</div>
        <div>shortURL: {data.shortURL}</div>
      </div>
      <div style={{ minWidth: 60 }}>
        <OverlayTrigger
          trigger="hover"
          placement="top"
          overlay={
            <Popover>
              <div className={classNames("qrcode-holder")}>
                <QRCodeSVG
                  className={classNames("qrcode")}
                  value={data.shortURL}
                />
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
            navigator.clipboard.writeText(data.shortURL).then(() => {
              alert("URL copied to clipboard!");
            })
          }
        />
      </div>
    </div>
  );
};

export default DisplayUnit;
