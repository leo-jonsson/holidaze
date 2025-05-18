import { Venue } from "@/api/types/venues";
import React from "react";
import Typography from "../Typography";
import VenueRating from "../VenueRating";
import Link from "next/link";

type Props = {
  venue: Venue;
  loading?: boolean;
};

const VenueCard: React.FC<Props> = ({ venue }) => {
  const media = venue.media?.[0];
  const url = media?.url ?? "/placeholder.jpg";
  const alt = media?.alt ?? "Venue image";

  return (
    <Link
      href={`/venues/${venue.id}`}
      className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3"
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        className="rounded-lg aspect-square size-full object-cover"
      />

      <div className="w-full flex items-center justify-between">
        <Typography.Label
          label={`${venue.location.city}, ${venue.location.country}`}
        />
        <VenueRating venue={venue} />
      </div>
      <div className="flex items-center gap-1">
        <Typography.Body label={`${venue.price}$`} className="font-medium" />
        <Typography.Body label="/ night" />
      </div>
    </Link>
  );
};

export default VenueCard;
