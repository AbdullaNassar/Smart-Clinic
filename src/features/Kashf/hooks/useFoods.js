import { useQuery } from "@tanstack/react-query";
import { getFood } from "../services/apiFood";

const useFoods = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getFood,
  });

  return { loadingFoods: isLoading, foods: data, errorFoods: error };
};

export default useFoods;
