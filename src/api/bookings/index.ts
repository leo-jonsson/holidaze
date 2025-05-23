import { AppDispatch } from "@/redux/store";
import { API_BOOKING, API_SINGLE_BOOKING } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";
import { Bookings } from "../types/venues";
import { setBookings } from "@/redux/slice";

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
    console.error("Failed to create booking:", e);
    throw new Error("Failed to create booking");
  }
}

export async function getBookingsByProfileName(
  profileName: string,
  dispatch: AppDispatch
): Promise<Bookings[]> {
  try {
    const url = `${API_SINGLE_BOOKING}/${profileName}/bookings`;
    const response = await fetchWrapper(url, "GET");
    const bookings: Bookings[] = response.data;

    dispatch(setBookings(bookings));

    return bookings;
  } catch (error) {
    console.error(
      `Failed to get bookings for profile "${profileName}":`,
      error
    );
    throw new Error("Could not retrieve user bookings");
  }
}
