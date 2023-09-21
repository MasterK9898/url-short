// import axios from "axios";

import type { URLPayload, URLUnit } from "../interface";

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
