import classes from "./AllReservations.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPatientInfo } from "../../patient/services/apiPatients";
import { getbookingInfo } from "../../Booking/services/apiBooking";
import useReservations from "../hooks/useReservetions";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function AllReservations() {
  // Data fetching layer
  const {
    loadingRevenues: isLoading,
    revenues: reservations,
    errorRevenues: error,
  } = useReservations();
  const {
    data: patients,
    isLoading: loading,
    isError,
  } = useQuery(["data"], async () => {
    const promises = reservations.map((item) => getPatientInfo(item.patientID));
    return Promise.all(promises);
  });
  const {
    data: booking,
    isLoading: load,
    isError: errorr,
  } = useQuery(["booking"], async () => {
    const promises = reservations.map((item) => getbookingInfo(item.bookingID));
    return Promise.all(promises);
  });

  // Loading/error handling
  if (load || loading || isLoading) return <Spinner />;
  if (errorr || isError || error) return <ErrorFallback />;

  return (
    <div>
      <table className={classes.customers}>
        <tr>
          <th>الاسم</th>
          <th>رقم الحجز</th>
          <th>نوع الحجز</th>
          <th>المبلغ</th>
          <th>تاريخ الحجز</th>
        </tr>
        {(isLoading || load || loading) && <h2>Loading...</h2>}
        {!isLoading &&
          !loading &&
          !load &&
          booking !== undefined &&
          patients !== undefined &&
          reservations.map((item, idx) => (
            <tr key={item.id}>
              <td>{patients[idx].name}</td>
              <td>{item.id}</td>
              <td>{booking[idx].type}</td>
              <td>{booking[idx].price}</td>
              <td>{booking[idx].created_at}</td>
              <button> تعديل</button>
            </tr>
          ))}
      </table>
    </div>
  );
}
export default AllReservations;
