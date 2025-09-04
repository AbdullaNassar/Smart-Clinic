import { useQuery } from "@tanstack/react-query";
import { getSymptoms } from "../services/apiSymptoms";

const useSymptoms = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["symptoms"],
    queryFn: getSymptoms,
  });

  return { loadingSymptoms: isLoading, symptoms: data, errorSymptoms: error };
};

export default useSymptoms;
