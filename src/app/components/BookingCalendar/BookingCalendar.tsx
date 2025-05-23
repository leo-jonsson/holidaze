"use client";

import { format, isWithinInterval, parseISO } from "date-fns";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverFooter,
  PopoverSubmitButton,
} from "@/app/components/common/PopOver/PopOver";
import Calendar from "../common/Calendar";
import { DateRange } from "react-day-picker";

type Booking = {
  dateFrom: string;
  dateTo: string;
};

type Venue = {
  bookings: Booking[];
};

type Props = {
  venue: Venue;
  date: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
};

export default function BookingCalendar({ venue, date, onDateChange }: Props) {
  const today = new Date();

  const disabledIntervals = venue.bookings.map((booking) => ({
    start: parseISO(booking.dateFrom),
    end: parseISO(booking.dateTo),
  }));

  const isDateDisabled = (date: Date) => {
    if (date < today) return true;
    return disabledIntervals.some((interval) =>
      isWithinInterval(date, interval)
    );
  };

  return (
    <PopoverRoot>
      <div className="flex w-full">
        <PopoverTrigger
          fromDate={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
          toDate={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
        />
      </div>

      <PopoverContent className="max-w-2xl">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          numberOfMonths={2}
          pagedNavigation
          disabled={isDateDisabled}
          className="rounded-md border p-2"
        />
        <PopoverFooter>
          <PopoverSubmitButton label="Confirm" />
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  );
}
