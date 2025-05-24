import { Venue } from "@/api/types/venues";
import React, { useState, useMemo } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import GuestInput from "../GuestInput";
import Button from "../common/Button";
import { DateRange } from "react-day-picker";
import { bookVenue, getBookingsByProfileName } from "@/api/bookings";
import Typography from "../common/Typography";
import { useDispatch } from "react-redux";
import Toaster from "../common/Toaster";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import { bookingSchema } from "@/api/zod";
import { z } from "zod";
import { differenceInDays } from "date-fns";

type Props = {
  venue: Venue;
};

// The tax and fee amounts are vibe-coded just to mock some nice UI (i don't do math lol)

const SERVICE_FEE_PERCENTAGE = 0.15;
const TAX_FEE_AMOUNT = 20;

const BookingForm: React.FC<Props> = ({ venue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useUser();

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();
  const [guestCount, setGuestCount] = useState<number>(1);

  const numberOfDays = useMemo(() => {
    if (selectedDateRange?.from && selectedDateRange?.to) {
      return differenceInDays(selectedDateRange.to, selectedDateRange.from) + 1;
    }
    return 0;
  }, [selectedDateRange]);

  const nightTotal = useMemo(() => {
    if (numberOfDays > 0) {
      return venue.price * numberOfDays;
    }
    return 0;
  }, [venue.price, numberOfDays]);

  const serviceFeeTotal = useMemo(() => {
    return nightTotal * SERVICE_FEE_PERCENTAGE;
  }, [nightTotal]);

  const taxFeeTotal = useMemo(() => {
    return TAX_FEE_AMOUNT;
  }, []);

  const totalPrice = useMemo(() => {
    return nightTotal + serviceFeeTotal + taxFeeTotal;
  }, [nightTotal, serviceFeeTotal, taxFeeTotal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDateRange?.from || !selectedDateRange?.to) {
      toast.error("Please select a valid date range.");
      return;
    }

    if (!user) {
      toast.error("You must be signed in to book a venue");
      return;
    }

    const formData = {
      dateFrom: selectedDateRange.from.toISOString(),
      dateTo: selectedDateRange.to.toISOString(),
      guests: guestCount,
      venueId: venue.id,
    };

    try {
      bookingSchema.parse(formData);

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
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error(error);
        toast.error("Booking failed. Please try again.");
      }
    }
  };

  return (
    <>
      <form
        className="py-3 md:py-10 px-2 rounded-xl flex flex-col gap-4 w-fulljustify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 max-w-[20rem] mx-auto">
          <div className="items-center gap-1 md:flex hidden">
            <span className="text-xl font-medium">{venue.price}$</span>
            <span className="self-end">night</span>
          </div>
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

          {numberOfDays > 0 && (
            <>
              <div className="h-0.5 w-full bg-muted-foreground/20" />
              <div className="flex justify-between">
                <Typography.Body
                  label={`${venue.price}$ x ${numberOfDays} nights`}
                />
                <span>{nightTotal}$</span>
              </div>
              <div className="flex justify-between">
                <Typography.Body label="Holidaze service fee" />
                <span>{serviceFeeTotal.toFixed(2)}$</span>{" "}
                {/* Format to 2 decimal places */}
              </div>
              <div className="flex justify-between">
                <Typography.Body label="Tax fee" />
                <span>{taxFeeTotal}$</span>
              </div>
              <div className="h-0.5 w-full bg-muted-foreground/20" />
              <div className="flex justify-between font-semibold">
                <Typography.Body label="Total" />
                <span>{totalPrice.toFixed(2)}$</span>{" "}
                {/* Format to 2 decimal places */}
              </div>
            </>
          )}

          <Button
            label="Book now"
            className="rounded-full py-7 w-full"
            type="submit"
            disabled={
              !selectedDateRange?.from ||
              !selectedDateRange?.to ||
              guestCount <= 0 ||
              !user?.accessToken
            }
          />
        </div>
      </form>
      <Toaster theme="light" />
    </>
  );
};

export default BookingForm;
