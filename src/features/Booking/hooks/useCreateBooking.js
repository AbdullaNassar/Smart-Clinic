import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../services/apiBooking";

const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("تمت اضافة حجز جديد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useCreateBooking;
