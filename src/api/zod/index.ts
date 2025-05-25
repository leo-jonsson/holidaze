import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(/^[\w\-.]+@(stud\.)?noroff\.no$/, {
      message:
        "Email must be a valid Noroff email (e.g., test@noroff.no or test@stud.noroff.no)",
    }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const bookingSchema = z.object({
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
  guests: z.number().min(1, "At least one guest"),
  venueId: z.string().min(1),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Username is required" })
      .regex(/^[\w]+$/, { message: "No special characters allowed" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[\w\-.]+@(stud\.)?noroff\.no$/, {
        message:
          "Email must be a valid Noroff email (e.g., test@noroff.no or test@stud.noroff.no)",
      }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
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
