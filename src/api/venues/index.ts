import { API_VENUES_URL } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";
import { Venue } from "@/api/types/venues";

type PaginatedVenueResponse = {
  data: Venue[];
  page: number;
  totalCount: number;
  totalPages: number;
};

export async function getVenues(
  page: number,
  limit: number
): Promise<PaginatedVenueResponse> {
  try {
    const response = await fetchWrapper(
      `${API_VENUES_URL}/?page=${page}&limit=${limit}&_owner=true&_bookings=true&sortOrder=asc&sort=created`,
      "GET"
    );
    return {
      data: response.data,
      page,
      totalCount: response.meta.totalCount,
      totalPages: response.meta.pageCount,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch venues");
  }
}

export async function getVenue(id: string): Promise<Venue> {
  try {
    const response = await fetchWrapper(
      `${API_VENUES_URL}/${id}?_owner=true&_bookings=true`,
      "GET"
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch venue");
  }
}
