import { Bookings } from "./venues";

export type Avatar = {
  url: string;
  alt: string;
};

export type Banner = {
  url: string;
  alt: string;
};

export interface User {
  name: string;
  email?: string;
  avatar?: Avatar;
  banner?: Banner;
  accessToken?: string;
  venueManager?: boolean;
  bookings?: Bookings[];
}
