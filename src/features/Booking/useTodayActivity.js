import { useQuery } from "@tanstack/react-query";
import { getTodayBooking } from "../../services/apiBooking";


export function useTodayActivity() {
    const {isLoading, data:activities, error}= useQuery({
        queryKey:['booking'],
        queryFn: getTodayBooking,
    })

//   const { isLoading, data: activities } = useQuery({
//     queryFn: getStaysTodayActivity,
//     queryKey: ["today-activity"],
//   });

  return { activities, isLoading };
}