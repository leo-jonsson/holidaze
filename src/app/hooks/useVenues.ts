import { getVenues } from "@/api/venues";
import { useQuery } from "@tanstack/react-query";

const useVenues = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["venues", page, limit],
    queryFn: () => getVenues(page, limit),
  });
};

export default useVenues;
