import { useQuery } from "@tanstack/react-query";
import classes from "./PatientDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPatientInfo } from "../../services/apiPatients";
import { getBooking } from "../../services/apiBooking";
import { FaPrint, FaSquareWhatsapp } from "react-icons/fa6";
function PatientDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["patientInfo", id], () =>
    getPatientInfo(id)
  );
  console.log(data);
  const {
    isLoading: loadingBooking,
    data: bookings,
    errorBooking,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: getBooking,
  });

  let filteredList = bookings;
  console.log(id);
  console.log(bookings);
  if (bookings !== undefined) {
    filteredList = bookings.filter((item) => item.patientID == id);
  }
  console.log(filteredList);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  const navigate = useNavigate();
  return (
    <div className={classes.all}>
      {isLoading || filteredList === undefined ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.info}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxsbOPDiffgD6Nas-dZu_3s6nsRWW8lmPgg&usqp=CAU" />
          <h3>{data?.name}</h3>
          <label>النوع: {data?.gender}</label>
          <label>السن {data?.age}</label>
          <label>رقم الهاتف: {data.phone}</label>
          <label>عدد الزيارات: {filteredList.length}</label>
          <Link to={`https://wa.me/+20${data.phone}`} target="_blank">
            <span style={{ color: "green", fontSize: "30px" }}>
              <FaSquareWhatsapp />
            </span>
          </Link>
        </div>
      )}
      <div className={classes.details}>
        <div className={classes.title}>
          <h2>الزيارات</h2>
          <span
            onClick={() => {
              window.print();
            }}
          >
            <FaPrint />
          </span>
        </div>
        {!loadingBooking && (
          <div className={classes.allBookings}>
            {filteredList !== undefined &&
              filteredList.map((item, idx) => (
                <div className={classes.card}>
                  <div>{idx + 1}</div>
                  <div>
                    {/* <label>تاريخ الزياره: </label> */}
                    <time>{formatDate(item.date)}</time>
                  </div>
                  <label>{item.type}</label>
                  <label>السعر: {item.price}</label>
                  <button
                    onClick={() => {
                      navigate(
                        `/ReservationDetails?patID=${id}&bokID=${item.id}`
                      );
                    }}
                  >
                    فتح الكشف
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default PatientDetails;
