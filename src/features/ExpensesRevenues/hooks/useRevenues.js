import { useQuery } from "@tanstack/react-query";
import { getRevenues } from "../services/apiRevenues";

const useRevenues = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Revenues"],
    queryFn: getRevenues,
  });

  return {
    loading: isLoading,
    revenue: data,
    error,
  };
};

export default useRevenues;
