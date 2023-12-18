import { useQuery } from "@tanstack/react-query";
import classes from "./AllReservations.module.css";
import { getReservations } from "../../services/apiReservation";
import { getPatientInfo } from "../../services/apiPatients";
import { useState } from "react";
import { getbookingInfo } from "../../services/apiBooking";
import { Link } from "react-router-dom";
import { usePatient } from "../../contexts/PatientContext";
function AllReservations() {
  const { handlePatientID, handleBookingID, handleReservationID } =
    usePatient();

  const [x, setX] = useState();
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });
  console.log(reservations);
  const {
    data: patients,
    isLoading: loading,
    isError,
  } = useQuery(["data"], async () => {
    const promises = reservations.map((item) => getPatientInfo(item.patientID));
    // console.log('yarab')
    // console.log(promises);
    return Promise.all(promises);
  });
  //   console.log('here');
  if (!loading) console.log(patients);

  const {
    data: booking,
    isLoading: load,
    isError: errorr,
  } = useQuery(["booking"], async () => {
    const promises = reservations.map((item) => getbookingInfo(item.bookingID));
    // console.log('yarab')
    // console.log(promises);
    return Promise.all(promises);
  });
  //   console.log('here');
  if (!load) console.log(booking);
  // console.log('all ');
  // function funct(){
  //     const { data, isLoading:loadingPatient, error:errorPatient } = useQuery(['patientInfo', reservations[0].patientID], () => getPatientInfo(reservations[0].patientID));
  // }

  // function fetchData(id){
  //     async function func(){
  //         const data= await getPatientInfo(id);
  //         // const res= await data.json();
  //         // console.log(data);
  //         return data.name;
  //     }
  //     return func();
  // }
  // fetchData();
  // console.log(fetchData(2));
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
            <tr>
              <td>{patients[idx].name}</td>
              <td>{item.id}</td>
              <td>{booking[idx].type}</td>
              <td>{booking[idx].price}</td>
              <td>{booking[idx].created_at}</td>
              <button> تعديل</button>
            </tr>
          ))}

        {/* {!isLoading &&bookings.map((item,idx)=>
                <tr>
                    <td>{patientNames[idx]}</td>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td>{item.notes}</td>
                    {item.status==='لم يتم الدخول للدكتور'&&<button onClick={()=>{
                      setIsStart(true)
                      const ids={
                        "bookingID":item.id,
                        "patientID":item.patientID,
                      }
                      setIDs(ids);
                    }}> بدء الكشف</button>}
                    <button>تعديل</button>
                    {item.status!=='تم الدخول والخروج' &&
                     <button >
                        حذف
                     </button>}
                </tr>)}
                */}
      </table>
    </div>
  );
}
export default AllReservations;
