"use client";

import {
  format,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
} from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/common/Sheet";
import Calendar from "../common/Calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
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
  today.setHours(0, 0, 0, 0);

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

  const handleDateSelect: SelectRangeEventHandler = (range) => {
    if (!range) {
      onDateChange(range);
      return;
    }

    if (range.from && range.to) {
      const selectedDates = eachDayOfInterval({
        start: range.from,
        end: range.to,
      });

      const hasOverlap = selectedDates.some(isDateDisabled);

      if (hasOverlap) {
        return;
      }
    }

    onDateChange(range);
  };

  const dateFormat = "dd/MM/yyyy";

  return (
    <div className="flex w-full flex-col gap-1">
      <Typography.Body label="Add dates for your stay" />
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2 w-full">
            <Input
              readOnly
              value={date?.from ? format(date.from, dateFormat) : ""} // Use the defined format
              placeholder="From"
              className="cursor-pointer w-full"
            />
            <Input
              readOnly
              value={date?.to ? format(date.to, dateFormat) : ""} // Use the defined format
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
          className="max-h-[90vh] overflow-y-auto p-4 flex justify-center flex-col"
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            pagedNavigation
            disabled={isDateDisabled}
            className="p-2 mx-auto"
          />
          <SheetFooter className="mt-4">
            <SheetTrigger asChild>
              <Button
                label="Confirm"
                className="w-full max-w-[30rem] mx-auto"
              />
            </SheetTrigger>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
