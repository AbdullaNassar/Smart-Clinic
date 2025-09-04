import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { creteReservation } from "../services/apiReservation";

const useCreateReservation = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: creteReservation,
    onSuccess: () => {
      toast.success("تمت اضافة حجز جديد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding: isLoading, mutate };
};

export default useCreateReservation;
