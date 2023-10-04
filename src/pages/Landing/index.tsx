import React from "react";
import { Button } from "react-bootstrap";
import Create from "../../components/Create";
import Header from "../../components/Header";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";
import Manage from "../../components/Manage";

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
  return (
    <div className={classNames("landing")}>
      <Header />
      <div className={classNames("intro")}>
        <img src={logo} className={classNames("logo")} />
        <div className={classNames("title")}>URL Shortener</div>
        <div className={classNames("button-holder")}>
          <Create
            title="Create your short URL in 1 minute"
            text="Quick Start"
          />
          <Manage />
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
