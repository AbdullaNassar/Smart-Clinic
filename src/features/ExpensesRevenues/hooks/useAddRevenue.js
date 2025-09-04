import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewRevenue } from "../services/apiRevenues";

const useAddRevenue = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewRevenue,
    onSuccess: () => {
      toast.success("تمت اضافة ايراد جديد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["Revenues"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding: isLoading, mutate };
};

export default useAddRevenue;
