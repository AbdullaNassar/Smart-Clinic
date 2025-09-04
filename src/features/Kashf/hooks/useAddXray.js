import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewXray } from "../services/apiXrays";

const useAddXray = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    onSuccess: () => {
      toast.success("تمت اضافه اشعه جديده للقائمه");
      queryClient.invalidateQueries({ queryKey: ["xrays"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddXray;
