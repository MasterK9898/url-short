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

const generateFakeId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < 6; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }
  return res;
};

export const getShortURLs = (): Promise<Array<URLUnit>> =>
  new Promise((r) =>
    setTimeout(() => {
      const res: Array<URLUnit> = [
        {
          url: "www.google.com/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "www.amazon.com/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "react.dev/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "chat.openai.com/c/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "stackoverflow.com/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "steamcommunity.com/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
        {
          url: "npmjs.com/supersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersupersuperlongurl",
          id: generateFakeId(),
          _id: generateFakeId(),
          expire: new Date(),
        },
      ];
      r(res);
    }, 1000)
  );
