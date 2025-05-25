import { getUserToken } from "./token";

export default function headers() {
  const headers = new Headers();
  const API_KEY = process.env.NEXT_API_KEY;
  const token = getUserToken();

  headers.append("Content-Type", "application/json");

  if (token) headers.append("Authorization", `Bearer ${token}`);

  if (API_KEY) headers.append("X-Noroff-API-Key", API_KEY);

  return headers;
}
