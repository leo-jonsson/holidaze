import { getVenue } from "@/api/venues";
import { useQuery } from "@tanstack/react-query";

const useVenue = (id: string | undefined) => {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: async () => {
      if (typeof id === "string") {
        return getVenue(id);
      }
      return null;
    },
  });
};

export default useVenue;
