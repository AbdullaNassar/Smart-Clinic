import { useQuery } from "@tanstack/react-query";
import { getMyExpenses } from "../services/apiMyExpenses";

const useMyExpenses = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getMyExpenses,
  });

  return { loadingExpenses: isLoading, expenses: data, errorExpenses: error };
};

export default useMyExpenses;
