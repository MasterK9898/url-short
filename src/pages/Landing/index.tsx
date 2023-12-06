import React from "react";
import { Button } from "react-bootstrap";
import Create from "../../components/Create";
import Header from "../../components/Header";

import classNames from "classnames";

import logo from "../../media/logo.svg";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { URLUnit } from "../../interface";
import Display from "./Display";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const navigate = useNavigate();

  const [urls, setURLs] = React.useState<Array<URLUnit>>([]);

  const [showModal, setShowModal] = React.useState(false);

  const { value } = useSelector((state: RootState) => state.user);

  return (
    <div className={classNames("landing")}>
      <Header />
      <Display
        urls={urls}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
      <div className={classNames("intro")}>
        <img src={logo} className={classNames("logo")} />
        <div className={classNames("title")}>URL Shortener</div>
        <div className={classNames("holder")}>
          <Create
            onCreated={(data) => {
              setURLs(data);
              setShowModal(true);
            }}
          />
          {value && (
            <Button
              className={classNames("dashbord")}
              onClick={() => navigate("/mine")}
            >
              Dashboard
            </Button>
          )}
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
