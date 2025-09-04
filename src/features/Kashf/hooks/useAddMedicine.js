import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewMedicine } from "../services/apiMedicine";

const useAddMedicine = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewMedicine,
    onSuccess: () => {
      toast.success("تمت اضافه دواء جديد الي القائمه");
      queryClient.invalidateQueries({ queryKey: ["medicine", "medicines"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddMedicine;
