import { useQuery } from "@tanstack/react-query";
import { getbookingInfo } from "../services/apiBooking";

const useBookingInfo = (id) => {
  const { data, isLoading, error } = useQuery(
    ["bookingInfo", id],
    () => getbookingInfo(id),
    {
      enabled: !!id,
    }
  );

  return {
    bookingData: data,
    loadingBooking: isLoading,
    errorBookingInfo: error,
  };
};

export default useBookingInfo;
