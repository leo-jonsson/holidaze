"use client";

import Button from "./components/common/Button";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

import { Venue } from "@/api/types/venues";
import useVenues from "./hooks/useVenues";
import { useState } from "react";
import VenueCard from "./components/common/VenueCard/VenueCard";

export default function Home() {
  const [page, setPage] = useState(1);

  const onClick = () => {
    setPage((prev) => prev + 1);
  };

  const { isPending, isError, data, error } = useVenues(page, 12);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />

      <div className="mt-4 flex items-center flex-wrap gap-5">
        {data?.map((venue: Venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      <Button label="NEXT" onClick={onClick} />
    </Section>
  );
}
