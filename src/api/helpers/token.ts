import { store } from "@/redux/store";

export function getUserToken(): string | null {
  const state = store.getState();
  return state.app.user?.accessToken ?? null;
}
