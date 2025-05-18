import { API_VENUES_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";

export async function getVenues(page: number, limit: number) {
  try {
    const data = await fetchWrapper(
      `${API_VENUES_URL}/?page=${page}&limit=${limit}&_owner=true&_bookings=true`,
      "GET"
    );
    return data.data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch venues");
  }
}
