import { API_HOLIDAZE_USER } from "../constants";
import fetchWrapper from "../helpers/fetchWrapper";
import { Venue } from "../types/venues";

type Avatar = {
  url: string;
  alt: string;
};

type PaginatedVenueResponse = {
  data: Venue[];
  page: number;
  totalCount: number;
  totalPages: number;
};

export async function updateUserAvatar(avatarData: Avatar, username: string) {
  const apiUrl = `${API_HOLIDAZE_USER}/${username}`;

  const data = await fetchWrapper(apiUrl, "PUT", {
    avatar: avatarData,
  });

  return data;
}

export async function getVenuesByUser(
  username: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedVenueResponse> {
  const apiUrl = `${API_HOLIDAZE_USER}/${username}/venues?_bookings=true&_owner=true&page=${page}&limit=${limit}`;

  const response = await fetchWrapper(apiUrl, "GET");

  return {
    data: response.data,
    page: response.meta.currentPage,
    totalCount: response.meta.totalCount,
    totalPages: response.meta.pageCount,
  };
}
