"use client";

import { getBookingsByProfileName } from "@/api/bookings";
import Section from "@/app/components/common/Section";
import React, { useEffect, useState } from "react";
import { Bookings } from "@/api/types/venues";
import useUser from "@/app/hooks/useUser";

const MyBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const user = useUser();

  useEffect(() => {
    const fetchBookings = async (profileName: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const d = await getBookingsByProfileName(profileName);
        if (d) setBookings(d);
      } catch (e) {
        console.error("Error fetching bookings:", e);
        setError("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.name) {
      fetchBookings(user.name);
    } else {
      setIsLoading(false);
    }
  }, [user?.name]);

  if (!user) return null;

  return (
    <Section>
      <div className="flex flex-col mt-5 w-full">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        {isLoading && <p>Loading bookings...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading &&
          !error &&
          (bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id} className="border-b py-2">
                  <p>Venue: {booking.venue?.name || "Unknown Venue"}</p>
                  <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Guests: {booking.guests}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no bookings yet.</p>
          ))}
      </div>
    </Section>
  );
};

export default MyBookings;
