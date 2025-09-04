import classes from "./AllBookings.module.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint, FaRegCalendarCheck, FaRegFolderOpen } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { eachDayOfInterval, isSameDay, subDays } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";

import Pagination from "../../../shared/components/ui/Pagnition";
import MyFilter from "../../../shared/components/ui/MyFilter";
import DeleteConfirmationModal from "../../../shared/components/ui/Modal";
import Tag from "../../../shared/components/ui/Tag";
import useRevenues from "../../ExpensesRevenues/hooks/useRevenues";
import useBookings from "../hooks/useBookings";
import useDeleteBooking from "../hooks/useDeleteBooking";
import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "../../../shared/utils/helper";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function AllBookings() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const order = !searchParams.get("last") ? "all" : searchParams.get("last");
  const [type, setType] = useState("");

  /// Data fetching layer
  const {
    data: revenueType,
    error: errorRevenues,
    loading: loadingRevenues,
  } = useRevenues();
  let { isLoading, data: bookings, error } = useBookings();
  const { isDeleting, mutate } = useDeleteBooking();

  // handle loading and error states
  if (loadingRevenues || isLoading) return <Spinner />;
  if (errorRevenues || error)
    return <ErrorFallback error={errorRevenues?.message || error?.message} />;

  let bookingsList = [];
  if (bookings !== undefined)
    switch (order) {
      case "all": {
        const newList = bookings; // Create a copy of the original list
        newList.sort((a, b) => new Date(b.date) - new Date(a.date));
        bookingsList = newList;
        break;
      }
      case "week": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 7 - 1),
          end: new Date(),
        });

        const filteredData = bookings.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        bookingsList = filteredData;
        bookingsList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 8);

        break;
      }
      case "month": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 30 - 1),
          end: new Date(),
        });
        const filteredData = bookings.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        bookingsList = filteredData;
        bookingsList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 30);

        break;
      }
      case "3month": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 90 - 1),
          end: new Date(),
        });
        const filteredData = bookings.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );
        bookingsList = filteredData;
        bookingsList.sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 90);

        // Filter the original list based on the date
        const newList = bookings.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        // bookingsList=newList;
        break;
      }
      case "year": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 365 - 1),
          end: new Date(),
        });
        const filteredData = bookings.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        bookingsList = filteredData;
        bookingsList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 365);

        break;
      }
      case "specfic": {
        const filteredData = bookings.filter((obj) =>
          isSameDay(new Date(obj.date), new Date())
        );

        bookingsList = filteredData;

        break;
      }

      default:
    }

  if (bookingsList !== undefined && type !== "all" && type !== "") {
    const newList = bookingsList.filter((item) => item.type === type);
    bookingsList = newList;
  }

  if (bookingsList !== undefined && searchQuery !== null) {
    bookingsList = bookingsList.filter((item) =>
      item.patients.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  let bookingsCount = 0;
  if (bookingsList !== undefined) {
    bookingsCount = bookingsList.length;
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

  return (
    <div className={classes.all}>
      <div className="heading">
        <div className="title">
          <h2 className="heading__title textAnimation">جميع الحجوزات</h2>
          <span color={{ color: "#04AA6D;" }}>
            <FaRegCalendarCheck />
          </span>
        </div>
        <div style={{ color: "black" }}>
          🚀 نتائج البحث: <span className="spn">{bookingsCount}</span>{" "}
        </div>
      </div>
      <div className={classes.header}>
        <div>
          <input
            className={classes.search}
            placeholder="بحث..."
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          />
        </div>

        <div>
          <MyFilter
            filterField="last"
            options={[
              { value: "all", label: "الكل" },
              { value: "week", label: "اخر اسبوع" },
              { value: "month", label: "اخر شهر" },
              { value: "3month", label: "اخر 3 شهور" },
              { value: "year", label: "اخر سنه" },
            ]}
            backgroundColor="#67a8d8"
            hoverBackgroundColor="#67a8d8"
          />
        </div>

        <div>
          <select
            className={classes.type}
            onChange={(e) => {
              searchParams.set("page", 1);
              setSearchParams(searchParams);
              setType(e.target.value);
            }}
          >
            <option value="" disabled selected>
              نوع الحجز
            </option>
            <option value="all">all</option>
            {revenueType !== undefined &&
              revenueType.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className={classes.print}>
          <span onClick={() => window.print()}>
            <FaPrint />
          </span>
        </div>
      </div>

      <div>
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>الاسم</th>
            <th>الهاتف</th>
            <th>النوع</th>
            <th>الحاله</th>
            <th>التاريخ</th>
            <th>المبلغ</th>
            <th>الخصم</th>
            <th>المدفوع</th>
            <th>ملاحظات</th>
            <th></th>
          </tr>
          {!isLoading &&
            bookingsList !== undefined &&
            bookingsList.map((item, idx) => (
              <tr key={item.id}>
                <td>{formatNumber((page - 1) * 10 + idx + 1)}</td>
                <td>{item.patients.name}</td>
                <td>{formatNumber(item.patients.phone)}</td>
                <td>{item.type}</td>
                <td>
                  {item.status === "تم الدخول والخروج" ? (
                    <Tag type="green"> تمت الزيارة</Tag>
                  ) : item.status === "لم يتم الدخول للدكتور" ? (
                    <Tag type="blue">موعد قادم</Tag>
                  ) : (
                    <Tag type="red">عند الطبيب</Tag>
                  )}{" "}
                </td>
                <td>
                  <time>{formatDate(item.date)}</time>
                </td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.discount)}</td>
                <td>{formatCurrency(item.paidAmount)}</td>

                <td>{item.notes}</td>
                <td>
                  {item.status == "تم الدخول والخروج" && (
                    <button
                      className={classes.folderIcon}
                      onClick={() => {
                        navigate(
                          `/ReservationDetails?patID=${item.patients.id}&bokID=${item.id}`
                        );
                      }}
                    >
                      {/* فتح الكشف */}
                      <FaRegFolderOpen />
                    </button>
                  )}
                  {item.status !== "تم الدخول والخروج" && (
                    <button
                      className={classes.folderIcon}
                      onClick={() => {
                        setIsOpenModal(true);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </td>
                <DeleteConfirmationModal
                  isOpen={isOpenModal}
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
export default AllBookings;
