import { API_BOOKING } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";

export async function bookVenue(
  dateFrom: string,
  dateTo: string,
  guests: number,
  venueId: string
) {
  try {
    const data = await fetchWrapper(API_BOOKING, "POST", {
      dateFrom,
      dateTo,
      guests,
      venueId,
    });

    return data;
  } catch (e) {
    console.log("Titta här:", e);
    throw new Error("Failed to create booking");
  }
}
