"use client";

import { getVenues } from "@/api/venues";
import Button from "./components/common/Button";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";
import { useQuery } from "@tanstack/react-query";
import { Venue } from "@/api/types/venues";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />
      <Button label="hej" />

      <div className="mt-4 space-y-2">
        {data?.map((venue: Venue) => (
          <p key={venue.id}>{venue.name}</p>
        ))}
      </div>
    </Section>
  );
}
