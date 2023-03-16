import { proxy, subscribe } from "valtio";

export interface Authentication {
  username: string;
  password: string;
  url: string;
  expires: number;
}

export const store = proxy<{
  authentication: Authentication | null;
}>({
  authentication: JSON.parse(localStorage.getItem("authentication")!),
});

subscribe(store, (state) => {
  localStorage.setItem("authentication", JSON.stringify(store.authentication));
});
