import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewdisease } from "../services/apiDiseases";

const useAddDisease = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewdisease,
    onSuccess: () => {
      toast.success("تمت اضافه مرض جديد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddDisease;
