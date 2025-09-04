import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBooking";

const useBookings = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["booking"],
    queryFn: getBooking,
  });

  return { isLoading, data, error };
};

export default useBookings;
