import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNewPatient } from "../services/apiPatients";

const useAddPatient = (resetCallback) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: createNewPatient,
    onSuccess: () => {
      toast.success("تمت اضافة المريض بنجاح");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      if (resetCallback) resetCallback();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddPatient;
