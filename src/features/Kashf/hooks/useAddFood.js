import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewFood } from "../services/apiFood";

const useAddFood = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewFood,
    onSuccess: () => {
      toast.success("تمت الاضافه الي القائمه بنجاح");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddFood;
