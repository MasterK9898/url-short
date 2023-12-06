export interface User {
  email: string;
  tier: Tier;
}

export enum Tier {
  Bronze = "BRONZE",
  Silver = "SILVER",
  Gold = "GOLD",
  // reserved for later use
  // Platinum = "PLATINUM",
}

export interface LoginPayload {
  email: string;
  password: string;
}
