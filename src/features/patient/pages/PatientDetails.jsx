import classes from "./PatientDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPrint, FaSquareWhatsapp } from "react-icons/fa6";

import { getPatientInfo } from "../services/apiPatients";
import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "../../../shared/utils/helper";
import useBookings from "../../Booking/hooks/useBookings";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data fetching layer
  const { data, isLoading, error } = useQuery(["patientInfo", id], () =>
    getPatientInfo(id)
  );
  const {
    isLoading: loadingBooking,
    data: bookings,
    error: errorBooking,
  } = useBookings();

  // Loading/error handling
  if (isLoading || loadingBooking) return <Spinner />;
  if (error || errorBooking) return <ErrorFallback />;

  let filteredList = bookings;
  if (bookings !== undefined) {
    filteredList = bookings.filter((item) => item.patientID == id);
  }
  filteredList = filteredList?.filter(
    (item) => item.status === "تم الدخول والخروج"
  );

  return (
    <div className={classes.all}>
      {isLoading || filteredList === undefined ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.info}>
          <img
            src="https://res.cloudinary.com/deuxt0stn/image/upload/v1756951470/download_vggpl3_1_rmakmk.png"
            alt="Patient Picture"
          />
          <h3>{data?.name}</h3>
          <label>{data?.gender === "male" ? "ذكر" : "انثى"}</label>
          <label>{formatNumber(data?.age)} عام</label>
          <label>{formatNumber(data?.phone)}</label>
          <label>عدد الزيارات: {formatNumber(filteredList.length)}</label>
          <Link to={`https://wa.me/+20${data?.phone}`} target="_blank">
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
                <div key={item.id} className={classes.card}>
                  <div className={classes.cardNO}>{formatNumber(idx + 1)}</div>
                  <div style={{ fontWeight: "500" }}>
                    {/* <label>تاريخ الزياره: </label> */}
                    <time>{formatDate(item.date)}</time>
                  </div>
                  <label>{item.type}</label>
                  {/* <label>السعر:{item.price}</label> */}
                  <label>{formatCurrency(item.price)}</label>
                  <button
                    className={classes.button}
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
