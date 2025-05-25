import React from "react";

type Props = {
  media: {
    url: string;
    alt: string;
  }[];
};

const FALLBACK_IMAGE = "/placeholder.jpg";

const VenueMedia: React.FC<Props> = ({ media }) => {
  const getImageUrl = (index: number) => {
    return media && media.length > index && media[index]?.url
      ? media[index].url
      : FALLBACK_IMAGE;
  };

  const getImageAlt = (index: number) => {
    return media && media.length > index && media[index]?.alt
      ? media[index].alt
      : "alt text";
  };

  return (
    <div className="w-full grid md:grid-cols-2 rounded-lg gap-3 md:aspect-[16/8] mt-10 overflow-hidden mb-7">
      <div className="overflow-hidden">
        <img
          src={getImageUrl(0)}
          alt={getImageAlt(0)}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {" "}
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={getImageUrl(index)}
              alt={getImageAlt(index)}
              className="size-full object-cover aspect-square"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueMedia;
