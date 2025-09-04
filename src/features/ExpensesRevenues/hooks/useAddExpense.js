import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewExpense } from "../services/apiExpenses";

const useAddExpense = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewExpense,
    onSuccess: () => {
      toast.success("تمت الاضافه");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddExpense;
