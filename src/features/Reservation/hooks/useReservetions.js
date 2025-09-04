import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/apiReservation";

const useReservations = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  return { loadingRevenues: isLoading, revenues: data, errorRevenues: error };
};

export default useReservations;
