import axios from "axios";

import type { Filter, URLPayload, URLUnit } from "../interface";
import { Tier, type LoginPayload, type User } from "../interface/user";

// TODO configure proxy

export const login = (payload: LoginPayload): Promise<User> =>
  axios.post("/api/login", { ...payload }).then(() => ({
    email: payload.email,
    tier: Tier.Gold,
  }));

export const logout = (): Promise<void> => axios.put("/logout");

export const register = (payload: LoginPayload): Promise<User> =>
  axios.post("/api/user", { ...payload }).then(() => ({
    email: payload.email,
    tier: Tier.Bronze,
  }));

export const createShortURL = (target: string): Promise<URLUnit> =>
  axios.post("/api/shortenurl", { url: target }).then(({ data }) => ({
    expire: new Date(data.expireDate),
    longURL: data.longUrl,
    shortURL: data.shortUrl,
    create: new Date(),
    id: data.shortUrl.split("/").pop() as string,
  }));

export const bulkCreateShortURL = (
  targets: Array<string>
): Promise<Array<URLUnit>> =>
  axios
    .post(
      "/api/bulk/shortenurl",
      targets.map((target) => ({ url: target }))
    )
    .then(({ data }) =>
      data.map((item: any) => ({
        expire: new Date(item.expireDate),
        longURL: item.longUrl,
        shortURL: item.shortUrl,
        create: new Date(),
        id: item.shortUrl.split("/").pop() as string,
      }))
    );

// backend doesn't support filtering, we can do it locally
export const getShortURLs = (
  filter: Filter,
  signal?: AbortSignal
): Promise<{ data: Array<URLUnit>; total: number }> => {
  console.trace();
  return axios.get("/api/shortenurls", { signal }).then(
    ({ data }) => {
      const res: Array<URLUnit> = data.map((item: any) => ({
        expire: new Date(item.expireDate),
        longURL: item.longUrl,
        shortURL: "http://team4-539.com/shortenurl/" + item.shortUrl,
        create: new Date(item.createDate),
        id: item.shortUrl,
      }));
      const { keyword, sort, pageSize, pageNum } = filter;

      // we first filter, then sort, then paginate

      const filtered = keyword
        ? res.filter(
            (url) =>
              url.longURL.includes(keyword) || url.shortURL.includes(keyword)
          )
        : res;

      const sorted = filtered.sort((a, b) => {
        if (sort === 1) {
          return a.create.getTime() - b.create.getTime();
        } else if (sort === 2) {
          return b.create.getTime() - a.create.getTime();
        } else if (sort === 3) {
          return a.expire.getTime() - b.expire.getTime();
        } else {
          return b.expire.getTime() - a.expire.getTime();
        }
      });

      const start = pageSize * (pageNum - 1);
      const end = pageSize * pageNum;

      return { data: sorted.slice(start, end), total: data.length };
    }
    // {
    //   console.log(data);
    //   return [];
    // }
  );
};

export const deleteShortURL = (url: string): Promise<void> =>
  axios.delete("/api/shortenurl", { params: { url } });

export const bulkDeleteShortURL = (urls: Array<string>): Promise<void> =>
  axios.delete("/api/bulk/url", { data: urls });

export const getUser = (): Promise<User> =>
  axios.get("/api/user").then(({ data }) => ({
    email: data.email,
    tier: data.tier,
  }));

export const subscribe = (tier: Tier): Promise<void> =>
  axios.put("/api/subscribe", { tier });
