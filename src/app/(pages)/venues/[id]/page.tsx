"use client";

import Button from "@/app/components/common/Button";
import Section from "@/app/components/common/Section";
import Skeleton from "@/app/components/common/Skeleton";
import Typography from "@/app/components/common/Typography";
import VenueMedia from "@/app/components/VenueMedia/VenueMedia";
import useVenue from "@/app/hooks/useVenue";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";

const SingleVenuePage = () => {
  const params = useParams();
  const venueId = typeof params.id === "string" ? params.id : undefined;

  const { data, isPending, isLoading } = useVenue(venueId);

  if (!venueId) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>No venue found</h1>
      </div>
    );
  }

  if (data)
    return (
      <Section className="">
        {isPending ||
          (isLoading && (
            <div className="w-full">
              <Skeleton className="w-full aspect-video" />
            </div>
          ))}
        <div className="flex flex-col gap-4 relative min-h-[12030px]">
          <VenueMedia venue={data} />
          <div className="grid md:grid-cols-2">
            <div className="grid gap-10">
              <div className="grid gap-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Typography.H2
                    className="text-lg"
                    label={`${data.location.city}, ${data.location.country}`}
                  />
                  <span className="size-1 rounded-full bg-muted-foreground" />
                  <Typography.H2
                    className="text-lg"
                    label={`${data.maxGuests.toString()} guests`}
                  />
                </div>
                <Typography.H1 label={data.name} className="text-4xl" />
                <Typography.Body label={data.description} />
              </div>
              <div className="grid">
                <Typography.Label label="What's included" />
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(data.meta).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1 text-sm text-muted-foreground"
                    >
                      <span className="capitalize">{key}</span>
                      {!value && <Check className="w-4 h-4 text-green-600" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button label="test" className="sticky top-0" />
          </div>
        </div>
      </Section>
    );
};

export default SingleVenuePage;
