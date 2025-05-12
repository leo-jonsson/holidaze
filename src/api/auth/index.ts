import { API_LOGIN_URL, API_REGISTER_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const data = await fetchWrapper(API_REGISTER_URL, "POST", {
      email,
      username,
      password,
    });
    return data;
  } catch (e) {
    console.log("Titta här:", e);
    throw new Error("Failed to register a new account");
  }
}

export async function login(email: string, password: string) {
  try {
    const data = await fetchWrapper(API_LOGIN_URL, "POST", {
      email,
      password,
    });
    return data;
  } catch (e) {
    console.log("Titta här:", e);
    throw new Error("Failed to sign in user");
  }
}
