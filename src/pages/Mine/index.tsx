import classNames from "classnames";
import * as React from "react";
import Header from "../../components/Header";
import Create from "../../components/Create";
import "./index.scss";
import { URLUnit } from "../Landing/interface";
import { getShortURLs } from "../../utils/api";
import { domain } from "../../utils/const";
import URLDisplay from "../../components/URLDisplay";

const Mine: React.FunctionComponent = () => {
  const [urls, setUrls] = React.useState<Array<URLUnit>>([]);

  React.useEffect(() => {
    getShortURLs().then(setUrls);
  }, []);
  return (
    <div className={classNames("mine")}>
      <Header />
      <Create text="Create Short URL" />
      {urls.map((url, index) => {
        return (
          <div key={index} className={classNames("display")}>
            <div className={classNames("url")}>{url.url}</div>
            <URLDisplay data={url} />
          </div>
        );
      })}
    </div>
  );
};

export default Mine;
