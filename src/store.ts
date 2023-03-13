import { proxy, subscribe } from "valtio";

export interface Authentication {
  username: string;
  password: string;
  url: string;
  expires: number;
}

export const store = proxy<{ authentication: Authentication }>(
  JSON.parse(localStorage.getItem("authentication")) || {
    authentication: { username: "", password: "", url: "", expires: 0 },
  }
);

subscribe(store, (state) => {
  console.log("state changed", state);
  localStorage.setItem("authentication", JSON.stringify(store.authentication));
});
