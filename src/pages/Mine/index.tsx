import classNames from "classnames";
import * as React from "react";
import Header from "../../components/Header";
import Create from "../../components/Create";
import "./index.scss";
import { URLUnit } from "../../interface";
import { getShortURLs } from "../../utils/api";
import { domain } from "../../utils/const";
import { format, set } from "date-fns";
import { OverlayTrigger, Popover, Table } from "react-bootstrap";

import copy from "../../media/copy.svg";
import tick from "../../media/tick.svg";
import qrcode from "../../media/qrcode.svg";
import bin from "../../media/bin.svg";
import stat from "../../media/stat.svg";
import { QRCodeSVG } from "qrcode.react";

const Mine: React.FunctionComponent = () => {
  const [urls, setUrls] = React.useState<Array<URLUnit>>([]);

  React.useEffect(() => {
    getShortURLs().then(setUrls);
  }, []);
  return (
    <div className={classNames("mine")}>
      <Header />
      <Create text="Create Short URL" />
      <Table striped bordered hover className={classNames("table-display")}>
        <thead>
          <tr>
            <th>#</th>
            <th>Origin URL</th>
            <th>Short URL</th>
            <th>Expiration</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => {
            const short = `${domain}${url.id}`;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={classNames("url")}>{url.url}</td>
                <td>{short}</td>
                <td>{format(url.expire, "MM-dd-yyyy")}</td>
                <td>
                  <img className={classNames("operation")} src={bin} />
                  <OverlayTrigger
                    trigger="hover"
                    placement="top"
                    overlay={
                      <Popover>
                        <div className={classNames("qrcode-holder")}>
                          <QRCodeSVG
                            className={classNames("qrcode")}
                            value={short}
                          />
                        </div>
                      </Popover>
                    }
                  >
                    <img src={qrcode} className={classNames("operation")} />
                  </OverlayTrigger>
                  <img className={classNames("operation")} src={stat} />
                  <img
                    className={classNames("operation")}
                    src={copy}
                    onClick={(event) =>
                      navigator.clipboard.writeText(url.id).then(() => {
                        //@ts-ignore
                        const target = event.target?.nextElementSibling;
                        target?.classList.add("show");
                        setTimeout(() => {
                          target?.classList.remove("show");
                        }, 3000);
                      })
                    }
                  />
                  <img className={classNames("success")} src={tick} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Mine;
