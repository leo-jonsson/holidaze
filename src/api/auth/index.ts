import { API_LOGIN_URL, API_REGISTER_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";
import { setUser } from "@/redux/slice";
import { AppDispatch } from "@/redux/store";

export async function register(
  username: string,
  email: string,
  password: string,
  venueManager: boolean = false
) {
  try {
    const data = await fetchWrapper(API_REGISTER_URL, "POST", {
      email,
      username,
      password,
      venueManager,
    });

    return data;
  } catch (e) {
    console.log("Titta här:", e);
    throw new Error("Failed to register a new account");
  }
}

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(credentials: LoginPayload, dispatch: AppDispatch) {
  try {
    const data = await fetchWrapper(API_LOGIN_URL, "POST", credentials);
    dispatch(setUser(data.data));
    return data;
  } catch (e) {
    console.log("Titta här:", e);
    throw new Error("Failed to sign in user");
  }
}
