// import axios from "axios";

import type { URLPayload, URLUnit } from "../pages/Landing/interface";

export const createShortURL = (payload: URLPayload): Promise<URLUnit> =>
  new Promise((r) =>
    setTimeout(() => {
      const res = { ...payload, _id: "12345" };
      if (!res.id) {
        res.id = "04fg65";
      }
      r(res as URLUnit);
    }, 1000)
  );

export const getShortURLs = (): Promise<Array<URLUnit>> =>
  new Promise((r) =>
    setTimeout(() => {
      const res: Array<URLUnit> = [
        { url: "www.google.com", id: "04fg65", _id: "12345" },
        { url: "www.amazon.com", id: "za53b3", _id: "34567" },
        { url: "react.dev", id: "0a24md", _id: "23456" },
      ];
      r(res);
    }, 1000)
  );
