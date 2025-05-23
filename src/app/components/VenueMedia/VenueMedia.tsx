/* eslint-disable @next/next/no-img-element */
import { Venue } from "@/api/types/venues";
import React from "react";

type Props = {
  venue: Venue;
};

const FALLBACK_IMAGE = "/placeholder.jpg"; // Define fallback image path

const VenueMedia: React.FC<Props> = ({ venue }) => {
  const media = venue.media;

  // Function to get image URL or fallback
  const getImageUrl = (index: number) => {
    return media && media.length > index && media[index]?.url
      ? media[index].url
      : FALLBACK_IMAGE;
  };

  // Function to get image alt text or a default
  const getImageAlt = (index: number) => {
    return media && media.length > index && media[index]?.alt
      ? media[index].alt
      : `Image for ${venue.name}`; // Provide a more informative alt text
  };

  return (
    <div className="w-full grid md:grid-cols-2 rounded-lg gap-4 md:aspect-[16/8] mt-10 overflow-hidden">
      <div className="overflow-hidden">
        <img
          src={getImageUrl(0)}
          alt={getImageAlt(0)}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {" "}
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={getImageUrl(index)}
              alt={getImageAlt(index)}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueMedia;
