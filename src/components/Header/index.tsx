import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";

const Header: React.FunctionComponent = () => {
  const [overflow, setOverflow] = React.useState(false);
  const userRaw = localStorage.getItem('user'); // Temporaryly call from localstorage for demo use
  const user = userRaw ? JSON.parse(userRaw) : null;

  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setOverflow(window.scrollY > 0);
    });
  }, []);

  const handleUserStatus = () => {
    if (user) {
      localStorage.removeItem('user');
      window.location.reload();
    } else {
      navigate('/membership-login');
    }
  }

  return (
    <div className={classNames("header", overflow && "overflow")}>
      <img src={logo} alt="logo" className={classNames("logo")} />
      <div className={classNames("title")}>URL Shortener</div>
      <Button className={classNames("link")} href="/landing">Home</Button>
      <Button className={classNames("link")}>Learn</Button>
      <Button className={classNames("link")}>Community</Button>
      <Button className={classNames("link")}>About Us</Button>
      {/* put any other component(s) before this line */}
      <Button className={classNames("link")} onClick={handleUserStatus}>
        {user ? user.username : "Membership"}
      </Button>
    </div>
  );
};

export default Header;
