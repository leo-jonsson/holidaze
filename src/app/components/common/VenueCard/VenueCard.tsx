import { Venue } from "@/api/types/venues";
import React from "react";
import Typography from "../Typography";
import VenueRating from "../VenueRating";
import Link from "next/link";
import { motion } from "motion/react";
import Skeleton from "../Skeleton";

type Props = {
  venue: Venue;
  loading?: boolean;
};

const VenueCard: React.FC<Props> = ({ venue, loading }) => {
  const media = venue.media?.[0];
  const url = media?.url ?? "/placeholder.jpg";
  const alt = media?.alt ?? "Venue image";

  if (loading) return <Skeleton />;

  return (
    <Link
      href={`/venues/${venue.id}`}
      className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3"
    >
      <motion.div
        className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3"
        initial={{ opacity: 0, translateY: "2rem" }}
        transition={{ duration: 0.3 }}
        whileInView={{
          translateY: 0,
          opacity: 1,
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={url}
          alt={alt}
          loading="lazy"
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
      </motion.div>
    </Link>
  );
};

export default VenueCard;
