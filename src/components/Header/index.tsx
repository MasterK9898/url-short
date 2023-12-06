import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, logout as logoutAction } from "../../store";
import { logout } from "../../utils/api";

const Header: React.FunctionComponent = () => {
  const [overflow, setOverflow] = React.useState(false);
  const { value } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setOverflow(window.scrollY > 0);
    });
  }, []);

  const handleUserStatus = () => {
    if (value) {
      logout().then(() => {
        dispatch(logoutAction());
        navigate("/landing");
      });
    } else {
      navigate("/membership-login");
    }
  };

  return (
    <div className={classNames("header", overflow && "overflow")}>
      <img src={logo} alt="logo" className={classNames("logo")} />
      <div className={classNames("title")}>URL Shortener</div>
      <Button className={classNames("link")} href="/landing">
        Home
      </Button>
      <Button className={classNames("link")}>Learn</Button>
      <Button className={classNames("link")}>Community</Button>
      <Button className={classNames("link")}>About Us</Button>
      {/* put any other component(s) before this line */}
      {/* <Button className={classNames("link")} onClick={handleUserStatus}>
        {value ? value.email : "Membership"}
      </Button> */}
      {value ? (
        <Dropdown>
          <Dropdown.Toggle className={classNames("link")}>
            {value.email}
          </Dropdown.Toggle>

          <Dropdown.Menu className={classNames("user-dropdown-menu")}>
            <Dropdown.Item
              onClick={() =>
                logout().then(() => {
                  dispatch(logoutAction());
                  navigate("/landing");
                })
              }
            >
              Log out
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/membership")}>
              Membership
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          className={classNames("link")}
          onClick={() => navigate("/membership-login")}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Header;
