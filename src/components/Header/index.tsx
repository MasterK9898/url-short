import React from "react";
import { Button } from "react-bootstrap";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";

const Header: React.FunctionComponent = () => {
  const [overflow, setOverflow] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setOverflow(window.scrollY > 0);
    });
  }, []);

  return (
    <div className={classNames("header", overflow && "overflow")}>
      <img src={logo} className={classNames("logo")} />
      <div className={classNames("title")}>URL Shortener</div>
      <Button className={classNames("link")}>Learn</Button>
      <Button className={classNames("link")}>Community</Button>
      <Button className={classNames("link")}>About Us</Button>
    </div>
  );
};

export default Header;
