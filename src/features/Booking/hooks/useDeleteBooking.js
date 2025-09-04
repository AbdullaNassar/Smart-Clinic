import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../services/apiBooking";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("تم حذف الحجز بنجاح");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting: isLoading, mutate };
};

export default useDeleteBooking;
