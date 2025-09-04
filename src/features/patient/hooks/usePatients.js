import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../services/apiPatients";

const usePatients = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return { isLoading, patients: data, error };
};

export default usePatients;
