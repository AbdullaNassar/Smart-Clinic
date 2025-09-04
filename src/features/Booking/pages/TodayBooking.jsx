import classes from "./TodayBooking.module.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDays, FaPrint, FaRegFolderOpen } from "react-icons/fa6";
import { isSameDay } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";

import DeleteConfirmationModal from "../../../shared/components/ui/Modal";
import Tag from "../../../shared/components/ui/Tag";
import Pagination from "../../../shared/components/ui/Pagnition";
import { TbUserEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import NoBookingsMessage from "../components/NoBookingMessage";
import useDeleteBooking from "../hooks/useDeleteBooking";
import useBookings from "../hooks/useBookings";
import useUpdateBooking from "../hooks/useUpdateBooking";
import Spinner from "../../../shared/components/ui/Spinner";
import {
  formatCurrency,
  formatNumber,
  formatTime,
} from "../../../shared/utils/helper";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

const optionss = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  locale: "ar",
};
const formattedDate = new Intl.DateTimeFormat("ar", optionss).format(
  new Date()
);

function TodayBooking() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const navigate = useNavigate();

  /// Data fetching layer
  const { isDeleting, mutate } = useDeleteBooking();
  let { data: bookings, isLoading, error } = useBookings();
  const mutation = useUpdateBooking();

  // Loading/error/empty handling
  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error?.message} />;
  if (!bookings?.length) return <NoBookingsMessage />;

  if (bookings !== undefined) {
    bookings = bookings.filter((obj) =>
      isSameDay(new Date(obj.date), new Date())
    );
  }
  let bookingsList = bookings;
  let bookingsCount = 0;
  if (bookingsList !== undefined) {
    bookingsCount = bookingsList.length;
    bookingsList.sort((a, b) => a.id - b.id);
    let x = [];
    for (
      let from = (page - 1) * 10, count = 0;
      from < bookingsList.length && count < 10;
      count++, from++
    ) {
      x.push(bookingsList[from]);
    }
    bookingsList = x;
  }
  searchParams.set("openReservation", false);

  return (
    <div className={classes.all}>
      <div className={classes.header}>
        <div className={classes.date}>
          <h3>{formattedDate}</h3>
          <span style={{ color: "#1b7bc2" }}>
            <FaCalendarDays />
          </span>
        </div>

        <div onClick={() => window.print()} className={classes.print}>
          {/* <label>طباعة</label> */}
          <span>
            <FaPrint />
          </span>
        </div>
      </div>
      <div>
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>الاسم</th>
            <th>الوقت</th>
            <th>نوع الحجز</th>
            <th>حاله الحجز</th>
            <th>المبلغ</th>
            <th>الخصم</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>ملاحظات</th>
            <th></th>
          </tr>
          {!isLoading &&
            bookingsList.map((item, idx) => (
              <tr key={item.id}>
                <td>{formatNumber(idx + 1)}</td>
                <td>{item.patients.name}</td>
                <p>{formatTime(new Date(item.date))}</p>
                <td>{item.type}</td>
                <td>
                  {item.status === "تم الدخول والخروج" ? (
                    <Tag type="green">تمت الزيارة</Tag>
                  ) : item.status === "لم يتم الدخول للدكتور" ? (
                    <Tag type="blue">انتظار</Tag>
                  ) : (
                    <Tag type="red">عند الطبيب</Tag>
                  )}{" "}
                </td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.discount)}</td>
                <td>{formatCurrency(item.paidAmount)}</td>
                <td>
                  {formatCurrency(item.price - item.paidAmount - item.discount)}
                </td>
                <td>{item.notes}</td>
                <div className={classes.btns}>
                  {item.status !== "تم الدخول والخروج" && (
                    <button
                      onClick={() => {
                        const id = item.id;
                        const columnName = "status";
                        const columnValue = "بالداخل عند الدكتور";
                        const params = [id, columnName, columnValue];
                        mutation.mutate(params);
                        navigate(
                          `/newReservations?patID=${item.patientID}&bokID=${item.id}`
                        );
                      }}
                    >
                      {item.status === "بالداخل عند الدكتور" ? "فتح " : "بدء "}
                    </button>
                  )}
                  {item.status === "تم الدخول والخروج" && (
                    <button
                      onClick={() => {
                        navigate(
                          `/ReservationDetails?patID=${item.patientID}&bokID=${item.id}`
                        );
                      }}
                    >
                      <FaRegFolderOpen />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      navigate(`/updateBooking/${item.id}`);
                    }}
                  >
                    <TbUserEdit />
                  </button>
                  {item.status !== "تم الدخول والخروج" && (
                    <button
                      className={classes.hoverElement}
                      onClick={() => {
                        setIsOpenModal(true);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>

                <DeleteConfirmationModal
                  isOpen={isOpenModal}
                  isDisabled={isDeleting}
                  onCancel={() => setIsOpenModal(false)}
                  onConfirm={() => {
                    mutate(item.id);
                    setIsOpenModal(false);
                  }}
                />
              </tr>
            ))}
        </table>
      </div>
      {bookingsList !== undefined && <Pagination count={bookingsCount} />}
    </div>
  );
}
export default TodayBooking;
