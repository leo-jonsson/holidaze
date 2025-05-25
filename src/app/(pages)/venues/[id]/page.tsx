"use client";

import BookingForm from "@/app/components/BookingForm/BookingForm";
import { buttonVariants } from "@/app/components/common/Button/Button";
import ProfilePicture from "@/app/components/common/ProfilePicture/ProfilePicture";
import Section from "@/app/components/common/Section";
import Skeleton from "@/app/components/common/Skeleton";
import Typography from "@/app/components/common/Typography";
import VenueMap from "@/app/components/common/VenueMap/VenueMap";
import Recommendations from "@/app/components/Recommendations/Recommendations";
import VenueMedia from "@/app/components/VenueMedia/VenueMedia";
import useUser from "@/app/hooks/useUser";
import useVenue from "@/app/hooks/useVenue";
import { Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const SingleVenuePage = () => {
  const params = useParams();
  const user = useUser();
  const venueId = typeof params.id === "string" ? params.id : undefined;

  const { data, isPending, isLoading } = useVenue(venueId);

  if (!venueId) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>No venue found</h1>
      </div>
    );
  }

  console.log(data);

  const isVenueOwner = user?.venueManager && data?.owner?.name === user?.name;

  if (data)
    return (
      <Section className="pb-10">
        {isPending ||
          (isLoading && (
            <div className="w-full">
              <Skeleton className="w-full aspect-video" />
            </div>
          ))}
        <div className="flex flex-col gap-4 relative ">
          <VenueMedia media={data.media} />
          <div className="grid md:grid-cols-2 gap-4 relative w-full">
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
                    label={`${data.maxGuests.toString()} beds`}
                  />
                </div>
                <Typography.H1
                  label={data.name}
                  className="text-2xl font-bold"
                />
                <Typography.Body label={data.description} />
              </div>
              <div className="flex w-full justify-between items-center py-4 border-b border-muted-foreground/20">
                <div className="grid">
                  <span className="font-semibold">
                    Hosted by {data.owner.name}
                  </span>
                  <span className="text-sm">{data.owner.email}</span>
                </div>
                <ProfilePicture user={data.owner} size={8} />
              </div>

              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Where you&apos;ll be:</h3>
                <VenueMap
                  lat={data.location.lat}
                  lng={data.location.lng}
                  city={data.location.city}
                  country={data.location.country}
                />
              </div>
              <div className="grid">
                <Typography.Label label="What's included" />
                <div className="flex gap-4 flex-wrap">
                  {Object.entries(data.meta).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1 text-sm text-muted-foreground"
                    >
                      <span className="capitalize">{key}</span>
                      {value && <Check className="size-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>
              <Recommendations
                city={data.location.city}
                country={data.location.country}
              />
            </div>
            <div className="md:hidden h-[20rem]" />
            <div className="fixed max-w-full md:max-w-[30rem] mx-auto rounded-lg left-0 md:left-auto bottom-0 w-full bg-background z-50 md:z-0 md:sticky md:top-[15rem] self-start md:shadow-lg md:border">
              {!isVenueOwner && <BookingForm venue={data} />}
              {isVenueOwner && (
                <div className="flex flex-col justify-between gap-4 p-4 md:min-h-[150px]">
                  <Typography.Label label="Wanna change something?" />
                  <Link
                    href={`/venues/edit/${data.id}`}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Edit Venue
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    );
};

export default SingleVenuePage;
