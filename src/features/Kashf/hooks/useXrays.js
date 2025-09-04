import { useQuery } from "@tanstack/react-query";
import { getXrays } from "../services/apiXrays";

const useXrays = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["xrays"],
    queryFn: getXrays,
  });

  return { loadingXrays: isLoading, xrays: data, errorXrays: error };
};

export default useXrays;
