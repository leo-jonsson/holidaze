"use client";

import { format, isWithinInterval, parseISO } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/common/Sheet";
import Calendar from "../common/Calendar";
import { DateRange } from "react-day-picker";
import Typography from "../common/Typography";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";

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
    <div className="flex w-full flex-col gap-1">
      <Typography.Body label="Add dates for your stay" />
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2 w-full">
            <Input
              readOnly
              value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
              placeholder="From"
              className="cursor-pointer w-full"
            />
            <Input
              readOnly
              value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
              placeholder="To"
              className="cursor-pointer w-full"
            />
          </div>
        </SheetTrigger>

        <SheetTitle className="sr-only">
          Add check-in and check-out dates
        </SheetTitle>

        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto p-4"
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            pagedNavigation
            disabled={isDateDisabled}
            className="p-2"
          />
          <SheetFooter className="mt-4">
            <SheetTrigger asChild>
              <Button label="Confirm" className="w-full" />
            </SheetTrigger>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
