"use client";

import { Venue } from "@/api/types/venues";
import VenueCard from "@/app/components/common/VenueCard/VenueCard";
import useVenues from "@/app/hooks/useVenues";
import InfiniteScroll from "@/app/components/InfiniteScroll";
import Skeleton from "@/app/components/common/Skeleton";

export default function Venues() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useVenues(12);

  const venues = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-5">
        {venues.map((venue: Venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={`skeleton-${i}`}
              className="flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3"
            />
          ))}
      </div>

      {hasNextPage && (
        <InfiniteScroll
          hasMore={hasNextPage}
          isLoading={isPending}
          threshold={0.5}
          next={fetchNextPage}
        ></InfiniteScroll>
      )}
    </>
  );
}
