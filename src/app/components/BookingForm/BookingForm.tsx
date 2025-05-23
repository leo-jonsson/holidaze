import { Venue } from "@/api/types/venues";
import React, { useState } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import GuestInput from "../GuestInput";
import Button from "../common/Button";
import { DateRange } from "react-day-picker";
import { bookVenue, getBookingsByProfileName } from "@/api/bookings";
import Typography from "../common/Typography";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "../common/Toaster";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

type Props = {
  venue: Venue;
};

const BookingForm: React.FC<Props> = ({ venue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.app.user);

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const [guestCount, setGuestCount] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDateRange?.from || !selectedDateRange?.to) {
      toast.error("Please select a valid date range.");
      return;
    }

    if (!user?.name) {
      toast.error("User not logged in or profile name missing.");
      return;
    }

    try {
      const response = await bookVenue(
        selectedDateRange.from.toISOString(),
        selectedDateRange.to.toISOString(),
        guestCount,
        venue.id
      );

      await getBookingsByProfileName(user.name, dispatch);

      toast.success(`Successfully reserved ${venue.name}!`, {
        description: `From ${selectedDateRange.from.toLocaleDateString()} to ${selectedDateRange.to.toLocaleDateString()}`,
        action: {
          label: "See booking",
          onClick: () => router.push("/bookings"),
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <form
        className="border py-3 md:py-10 px-2 rounded-xl flex flex-col gap-4 w-fulljustify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 max-w-[20rem] mx-auto">
          <BookingCalendar
            venue={venue}
            onDateChange={setSelectedDateRange}
            date={selectedDateRange}
          />
          <div className="grid gap-1">
            <div className="flex gap-1">
              <Typography.Body label="Guests" />
              <span className="text-xs self-stretch">{`(Max ${venue.maxGuests})`}</span>
            </div>
            <GuestInput
              maxGuest={venue.maxGuests}
              value={guestCount}
              onValueChange={setGuestCount}
            />
          </div>
          <Button
            label="Book now"
            className="rounded-full py-7 w-full"
            type="submit"
            disabled={
              !selectedDateRange?.from ||
              !selectedDateRange?.to ||
              guestCount <= 0 ||
              !user?.accessToken
            } // Disable if not logged in
          />
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default BookingForm;
