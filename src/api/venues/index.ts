import { API_VENUES_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";

export async function getVenues() {
  try {
    const data = await fetchWrapper(API_VENUES_URL, "GET");
    return data.data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch venues");
  }
}
