import { useQuery } from "@tanstack/react-query";
import { getDiseases } from "../services/apiDiseases";

const useDiseases = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["diseases"],
    queryFn: getDiseases,
  });

  return { loadingDiseases: isLoading, diseases: data, errorDiseases: error };
};

export default useDiseases;
