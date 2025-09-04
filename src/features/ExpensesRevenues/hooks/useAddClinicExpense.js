import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewClinicExpenses } from "../services/apiMyExpenses";

const useAddClinicExpense = (resetCallback) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewClinicExpenses,
    onSuccess: () => {
      toast.success("تمت اضافه عمليه شراء جديده بنجاح");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      if (resetCallback) resetCallback();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAddingExpense: isLoading, mutateMyExpense: mutate };
};

export default useAddClinicExpense;
