"use client";

import { Venue } from "@/api/types/venues";
import React, { useState } from "react";
import Typography from "../Typography";
import VenueRating from "../VenueRating";
import Link from "next/link";
import { motion } from "motion/react";
import Skeleton from "../Skeleton";
import { SkeletonVariant } from "../Skeleton/Skeleton";
import useUser from "@/app/hooks/useUser";
import { Button, buttonVariants } from "../Button/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../Dialog/Dialog";

type Props = {
  venue: Venue;
  loading?: boolean;
  showBookings?: boolean;
};

const VenueCard: React.FC<Props> = ({ venue, loading, showBookings }) => {
  console.log(venue);
  const user = useUser();
  const media = venue.media?.[0];
  const defaultImageUrl = "/placeholder.jpg";
  const defaultAltText = "Venue image";

  const [imageError, setImageError] = useState(false);

  const imageUrl = media?.url ?? defaultImageUrl;
  const imageAlt = media?.alt ?? defaultAltText;

  const titleCharacterLimit = 30;
  const locationCharacterLimit = 25;

  const truncateText = (
    text: string | null | undefined,
    limit: number
  ): string => {
    if (!text) return "";
    if (text.length <= limit) {
      return text;
    }
    return `${text.substring(0, limit)}...`;
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <Skeleton variant={SkeletonVariant.CARD} />;

  const locationString = venue.location.city
    ? `${venue.location.city || ""}, ${venue.location.country || ""}`
    : "Somewhere";

  return (
    <div className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3 relative z-0">
      {user && venue.owner.name === user.name && (
        <Link
          href={`/venues/edit/${venue.id}`}
          className={buttonVariants({ variant: "outline" })}
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          Edit Venue
        </Link>
      )}
      <Link
        href={`/venues/${venue.id}`}
        className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3 w-full"
      >
        <motion.div
          className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3"
          initial={{ opacity: 0, translateY: "2rem" }}
          transition={{ duration: 0.3 }}
          whileInView={{
            translateY: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
        >
          <img
            src={imageError ? defaultImageUrl : imageUrl}
            alt={imageAlt}
            loading="lazy"
            className="rounded-lg aspect-square size-full object-cover"
            onError={() => setImageError(true)}
          />

          <div className="grid gap-0">
            <div className="w-full flex items-center justify-between">
              <Typography.Label
                label={truncateText(venue.name, titleCharacterLimit)}
                className="font-semibold"
              />
              <VenueRating venue={venue} />
            </div>

            <Typography.Label
              className="text-sm"
              label={truncateText(locationString, locationCharacterLimit)}
            />
          </div>

          <div className="flex items-center gap-1">
            <Typography.Body
              label={`${venue.price}$`}
              className="font-medium"
            />
            <Typography.Body label="/ night" />
          </div>
        </motion.div>
      </Link>
      {showBookings && venue.bookings && venue.bookings.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button label="Show bookings" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Upcoming Bookings</DialogTitle>
            <ul className="mt-2 space-y-2">
              {venue.bookings.map((booking) => (
                <li key={booking.id} className="border p-2 rounded-md">
                  <Typography.Body
                    label={`Booked by: ${
                      booking.customer.name || "Unknown User"
                    }`}
                    className="font-medium"
                  />
                  <Typography.Body
                    label={`Guests: ${booking.guests}`}
                    className="text-sm"
                  />
                  <Typography.Body
                    label={`From: ${formatDate(booking.dateFrom)}`}
                    className="text-sm"
                  />
                  <Typography.Body
                    label={`To: ${formatDate(booking.dateTo)}`}
                    className="text-sm"
                  />
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}
      {showBookings && venue.bookings && venue.bookings.length === 0 && (
        <div className="mt-4">
          <Typography.Body
            label="No upcoming bookings for this venue."
            className="text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default VenueCard;
