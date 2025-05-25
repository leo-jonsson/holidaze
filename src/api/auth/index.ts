import { API_LOGIN_URL, API_REGISTER_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";
import { clearUser, setUser } from "@/redux/slice";
import { AppDispatch } from "@/redux/store";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
  avatar?: {
    url: string;
    alt: string;
  };
}

export async function register(payload: RegisterPayload) {
  try {
    const data = await fetchWrapper(API_REGISTER_URL, "POST", payload);

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

export async function signOut(dispatch: AppDispatch) {
  try {
    dispatch(clearUser());
    return true;
  } catch (error) {
    console.error("Failed to sign out user:", error);
    throw new Error("Sign out failed");
  }
}
