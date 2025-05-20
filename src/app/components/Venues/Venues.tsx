"use client";

import { Venue } from "@/api/types/venues";
import VenueCard from "@/app/components/common/VenueCard/VenueCard";
import useVenues from "@/app/hooks/useVenues";
import InfiniteScroll from "@/app/components/InfiniteScroll";
import { Loader } from "lucide-react";
import ScrollToTopButton from "@/app/components/ScrollToTopButton";

export default function Venues() {
  const { data, fetchNextPage, hasNextPage, isPending } = useVenues(12);

  const venues = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.data) || []).map((venue) => [
        venue.id,
        venue,
      ])
    ).values()
  );

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-5">
        {venues.map((venue: Venue) => (
          <VenueCard key={venue.id} venue={venue} loading={isPending} />
        ))}
      </div>

      {hasNextPage && (
        <InfiniteScroll
          hasMore={hasNextPage}
          isLoading={isPending}
          next={fetchNextPage}
          threshold={0.5}
        >
          <Loader className="size-5 animate-spin " />
        </InfiniteScroll>
      )}
      <div className="h-[15rem]" />
      <ScrollToTopButton />
    </>
  );
}
