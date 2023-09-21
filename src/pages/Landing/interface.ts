/**
 * The data of each shortened url
 */
export interface URLUnit {
  _id: string; // mongoDB id
  id: string; // the shortened url name
  url: string; // the original url
}

/**
 * payload to create shorterned url
 */
export interface URLPayload {
  id?: string; // prefered shortened url name
  url: string; // the original url
}
