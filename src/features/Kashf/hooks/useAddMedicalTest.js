import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addNewMedicalTest } from "../services/apiMedicalTest";

const useAddMedicalTest = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addNewMedicalTest,
    onSuccess: () => {
      toast.success("تمت اضافه تحليل جديد الي القائمة");
      queryClient.invalidateQueries({ queryKey: ["medicalTests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useAddMedicalTest;
