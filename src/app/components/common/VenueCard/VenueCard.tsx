import { Venue } from "@/api/types/venues";
import React, { useState } from "react";
import Typography from "../Typography";
import VenueRating from "../VenueRating";
import Link from "next/link";
import { motion } from "motion/react";
import Skeleton from "../Skeleton";
import { SkeletonVariant } from "../Skeleton/Skeleton";

type Props = {
  venue: Venue;
  loading?: boolean;
};

const VenueCard: React.FC<Props> = ({ venue, loading }) => {
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

  if (loading) return <Skeleton variant={SkeletonVariant.CARD} />;

  const locationString = venue.location.city
    ? `${venue.location.city || ""}, ${venue.location.country || ""}`
    : "Somewhere";

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
          <Typography.Body label={`${venue.price}$`} className="font-medium" />
          <Typography.Body label="/ night" />
        </div>
      </motion.div>
    </Link>
  );
};

export default VenueCard;
