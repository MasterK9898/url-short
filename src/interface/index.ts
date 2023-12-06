/**
 * The data of each shortened url
 */
export interface URLUnit {
  longURL: string; // the original url
  shortURL: string; // the shortened url
  expire: Date; // the expiration timestamp
  create: Date; // the creation timestamp
  id: string; // the id of the shortened url
}

/**
 * payload to create shorterned url
 */
export interface URLPayload {
  id?: string; // prefered shortened url name
  url: string; // the original url
}

/**
 * filter for searching
 */
export interface Filter {
  keyword: string;
  sort: number;
  pageSize: number;
  pageNum: number;
}
