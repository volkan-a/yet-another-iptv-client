import { proxy } from "valtio";

export interface Authentication {
  username: string;
  password: string;
  url: string;
  expires: number;
}

export const store = proxy<{ authentication: Authentication | null }>({
  authentication: null,
});
