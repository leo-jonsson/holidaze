import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const bookingSchema = z.object({
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
  guests: z.number().min(1, "At least one guest"),
  venueId: z.string().min(1),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const venueSchema = z.object({
  name: z.string().min(1, { message: "Venue name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  media: z
    .array(z.object({ url: z.string().url(), alt: z.string() }))
    .min(1, { message: "At least one image is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  maxGuests: z
    .number()
    .int()
    .positive({ message: "Max guests must be a positive integer" }),
  rating: z.number().min(0).max(5).optional(),
  meta: z.object({
    wifi: z.boolean(),
    parking: z.boolean(),
    breakfast: z.boolean(),
    pets: z.boolean(),
  }),
  location: z.object({
    address: z.string().default("Unknown"),
    city: z.string().default("Unknown"),
    zip: z.string().default("Unknown"),
    country: z.string().default("Unknown"),
    lat: z.number().default(0),
    lng: z.number().default(0),
  }),
});
