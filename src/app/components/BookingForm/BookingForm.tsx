import { Venue } from "@/api/types/venues";
import React, { useState } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import GuestInput from "../GuestInput";
import Button from "../common/Button";
import { DateRange } from "react-day-picker";
import { bookVenue } from "@/api/bookings";

type Props = {
  venue: Venue;
};

const BookingForm: React.FC<Props> = ({ venue }) => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const [guestCount, setGuestCount] = useState(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDateRange?.from || !selectedDateRange?.to) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const response = await bookVenue(
        selectedDateRange.from.toISOString(),
        selectedDateRange.to.toISOString(),
        guestCount,
        venue.id
      );

      alert("Booking successful!");
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Booking failed.");
    }
  };

  return (
    <form
      className="border py-5 px-2 rounded flex flex-col gap-4 w-full justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 max-w-[20rem] mx-auto">
        <BookingCalendar
          venue={venue}
          onDateChange={setSelectedDateRange}
          date={selectedDateRange}
        />
        <GuestInput
          maxGuest={venue.maxGuests}
          value={guestCount}
          onValueChange={setGuestCount}
        />
        <Button
          label="Book now"
          className="rounded-full py-7 w-full"
          type="submit"
        />
      </div>
    </form>
  );
};

export default BookingForm;
