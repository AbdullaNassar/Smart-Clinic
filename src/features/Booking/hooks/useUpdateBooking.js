import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBooking";
import toast from "react-hot-toast";

const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((params) => updateBooking(...params), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", "patients"] });
      toast.success("تم تعديل بيانات الكشف بنجاح!");
    },
    onError: (error) => {
      toast.error(`خطأ في تعديل بيانات الكشف: ${error.message}`);
    },
  });

  return mutation;
};

export default useUpdateBooking;
