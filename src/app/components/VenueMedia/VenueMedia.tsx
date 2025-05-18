import { Venue } from "@/api/types/venues";
import React from "react";

type Props = {
  venue: Venue;
};

const VenueMedia: React.FC<Props> = ({ venue }) => {
  const media = venue.media;

  switch (media.length) {
    case 0:
      return (
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
          No image available
        </div>
      );

    case 1:
      return (
        <img
          src={media[0].url}
          alt={media[0].alt || "Venue image"}
          className="aspect-square w-full rounded-lg object-cover"
        />
      );

    default:
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-square rounded-lg overflow-hidden">
          {media.slice(0, 4).map((item, index) => {
            const isLast = index === 3 && media.length > 4;
            return (
              <div key={index} className="relative">
                <img
                  src={item.url}
                  alt={item.alt || `Venue image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-medium text-sm">
                    +{media.length - 4} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
  }
};

export default VenueMedia;
