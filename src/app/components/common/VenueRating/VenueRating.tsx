import { Star } from "lucide-react";
import React from "react";
import Typography from "../Typography";
import { Venue } from "@/api/types/venues";

const VenueRating = ({ venue }: { venue: Venue }) => {
  return (
    <span className="flex gap-1 items-center">
      <Star className="size-4" />
      <Typography.Body label={venue.rating.toString()} />
    </span>
  );
};

export default VenueRating;
