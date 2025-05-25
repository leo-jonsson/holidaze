import { useInfiniteQuery } from "@tanstack/react-query";
import { getVenuesByUser } from "@/api/user";

const useUserVenues = (username: string) => {
  return useInfiniteQuery({
    queryKey: ["venues", username],
    queryFn: ({ pageParam }) => getVenuesByUser(username, pageParam),
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

export default useUserVenues;
