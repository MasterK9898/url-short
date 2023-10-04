import React from "react";
import { Button } from "react-bootstrap";
import CreateModal from "./CreateModal";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";

type LandingSection = {
  title: string;
  desc: string;
  img?: string;
};

const sections: Array<LandingSection> = [
  {
    title: "Shorten Your URL",
    desc: "Transform lengthy links into concise, shareable URLs with our platform. Elevate your branding and simplify sharing with intuitive alias URLs.",
  },
  {
    title: "Low Latency & Planetwise Consistency",
    desc: "Use a global database service that supports data replication across different geographic regions.",
  },
];

const Landing: React.FunctionComponent = () => {
  const [show, setShow] = React.useState(false);

  const [overflow, setOverflow] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setOverflow(window.scrollY > 0);
    });
  }, []);

  return (
    <div className={classNames("landing")}>
      {show && <CreateModal onClose={() => setShow(false)} />}
      <div className={classNames("header", overflow && "overflow")}>
        <img src={logo} className={classNames("logo")} />
        <div className={classNames("title")}>URL Shortener</div>
        <Button className={classNames("link")}>Learn</Button>
        <Button className={classNames("link")}>Community</Button>
        <Button className={classNames("link")}>About Us</Button>
      </div>
      <div className={classNames("intro")}>
        <img src={logo} className={classNames("logo")} />
        <div className={classNames("title")}>URL Shortener</div>
        <div className={classNames("button-holder")}>
          <Button className={classNames("start")} onClick={() => setShow(true)}>
            Quick Start
          </Button>
          <Button className={classNames("dashbord")} href="/mine">
            Dashboard
          </Button>
        </div>
      </div>
      {sections.map((section, index) => (
        <div key={index} className={classNames("section")}>
          <div className="title">{section.title}</div>
          <div className="desc">{section.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default Landing;
