import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../services/apiExpenses";

const useExpenses = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: getExpenses,
  });

  return { loadingExpenses: isLoading, expenses: data, errorExpenses: error };
};

export default useExpenses;
