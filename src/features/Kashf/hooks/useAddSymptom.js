import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewSymptom } from "../services/apiSymptoms";

const useAddSymptom = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewSymptom,
    onSuccess: () => {
      toast.success("تمت اضافة عرض مرضي جديد");
      queryClient.invalidateQueries({ queryKey: ["symptoms"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddSymptom;
