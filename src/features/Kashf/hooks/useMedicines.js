import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "../services/apiMedicine";

const useMedicines = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["medicine"],
    queryFn: getMedicines,
  });

  return {
    loadingMedicines: isLoading,
    medicines: data,
    errorMedicines: error,
  };
};

export default useMedicines;
