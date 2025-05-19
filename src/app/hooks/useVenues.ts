import { useInfiniteQuery } from "@tanstack/react-query";
import { getVenues } from "@/api/venues";

const useVenues = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["venues"],
    queryFn: ({ pageParam = 1 }) => getVenues(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      } else {
        return null;
      }
    },
  });
};

export default useVenues;
