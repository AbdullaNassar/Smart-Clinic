import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaBell,
  FaCalendarDays,
  FaPrint,
  FaRegFolderOpen,
} from "react-icons/fa6";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./TodayBooking.module.css";
import {
  deleteBooking,
  getBooking,
  getTodayBooking,
  updateBooking,
} from "../../services/apiBooking";
import NewReservation from "../Kashf/NewReservation";
import { isSameDay } from "date-fns";
// import s1 from "../../sounds/Recording.m4a";
// import s2 from "../../sounds/Recording(2).m4a";
// import s3 from "../../sounds/Recording(3).m4a";
// import s4 from "../../sounds/Recording(4).m4a";
// import s5 from "../../sounds/Recording(5).m4a";
// import s6 from "../../sounds/Recording(6).m4a";
// import s7 from "../../sounds/Recording(7).m4a";
// import s8 from "../../sounds/Recording(8).m4a";
// import s9 from "../../sounds/Recording(9).m4a";
// import s10 from "../../sounds/Recording(10).m4a";
// import ring from "../../sounds/ring.mp3";
import DeleteConfirmationModal from "../../UI/Modal";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTodayActivity } from "./useTodayActivity";
import Tag from "../../UI/Tag";
import Pagination from "../../UI/Pagnition";
import { formatCurrency } from "../../utils/helper";
import { TbUserEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
function TodayBooking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // console.log(new Date());

  const optionss = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    // timeZone: 'UTC',
    // timeZoneName: 'short',
    locale: "ar",
  };

  const formattedDate = new Intl.DateTimeFormat("ar", optionss).format(
    new Date()
  );

  const currentDate = new Date();

  const options = { timeZone: "Africa/Cairo", dateStyle: "full" };
  const arabicLocale = "ar-EG";
  const dateString = currentDate.toLocaleDateString(arabicLocale, options);
  // console.log(dateString);

  const audioRef = useRef(null);

  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cur, setCur] = useState(1);
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("booking deleting succsfuly");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log(new Date());

  let {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: getBooking,
  });

  // const { activities, isLoading:loadingActivity } = useTodayActivity();
  // console.log(activities);
  // console.log(bookings);
  const mutation = useMutation((params) => updateBooking(...params), {
    onSuccess: () => {
      // toast.success('Column updated successfully!');
    },
    onError: (error) => {
      // toast.error('Error updating column: ' + error.message);
    },
  });

  //  useEffect(function(){
  //   if(bookings!==undefined){
  //   for(let i=0;i<bookings.length;i++){
  //     if(bookings[i].status!=='تم الدخول والخروج'){
  //       setCur(i+1);
  //       break;
  //     }
  //     setCur(bookings.length);
  //   }
  //   }
  //  },[bookings])

  //  const generateRingSound = () => {

  // let audio = new Audio(ring);
  // audio.onended = handleSoundEnded;
  // audioRef.current = audio;
  // audio.play();

  //   };
  //   const handleSoundEnded = () => {
  //     let audio = new Audio(ring);
  // audio.onended = funcAudio;
  // audioRef.current = audio;
  // audio.play();
  //   };

  //   function funcAudio(){
  //     let audio;

  //     switch(cur){
  //       case 1:{
  //         audio = new Audio(s1);
  //         break;
  //       }
  //       case 2:{
  //         audio = new Audio(s2);
  //         break;
  //       }
  //       case 3:{
  //         audio = new Audio(s3);
  //         break;
  //       }
  //       case 4:{
  //         audio = new Audio(s4);
  //         break;
  //       }
  //       case 5:{
  //         audio = new Audio(s5);
  //         break;
  //       }
  //       case 6:{
  //         audio = new Audio(s6);
  //         break;
  //       }
  //       case 7:{
  //         audio = new Audio(s7);
  //         break;
  //       }
  //       case 8:{
  //         audio = new Audio(s8);
  //         break;
  //       }
  //       case 9:{
  //         audio = new Audio(s9);
  //         break;
  //       }
  //       case 10:{
  //         audio = new Audio(s10);
  //         break;
  //       }
  //       default:
  //     }
  //       audio.play();
  //   }

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      // month: "short",
      // year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }).format(date);
  }

  // console.log(formatTime(new Date()));

  if (bookings !== undefined) {
    bookings = bookings.filter((obj) =>
      isSameDay(new Date(obj.date), new Date())
    );
  }
  let bookingsList = bookings;
  // let now = 0;
  // if (bookings !== undefined) {
  //   for (let i = 0; i < bookings.length; i++) {
  //     if (bookings[i].status === "تم الدخول والخروج") {
  //       bookingsList.push(bookings[i]);
  //     }
  //   }
  //   bookings = bookings.filter((item) => item.status !== "تم الدخول والخروج");

  //   for (let i = 0; i < bookings.length; i++) {
  //     if (bookings[i].type === "حجز مستعجل") {
  //       bookingsList.push(bookings[i]);
  //     }
  //   }
  //   bookings = bookings.filter((item) => item.type !== "حجز مستعجل");

  //   for (let i = 0; i < bookings.length; i++) {
  //     bookingsList.push(bookings[i]);
  //   }

  //   now = 1;
  //   for (let i = bookingsList.length - 1; i >= 0; i--) {
  //     if (bookingsList[i].status === "تم الدخول والخروج") {
  // console.log("ok", i + 2);
  //       now = i + 2;
  //       break;
  //     }

  //     if (bookingsList[i].status === "بالداخل عند الدكتور") {
  // console.log("here", i + 1);
  //       now = i + 1;
  //       break;
  //     }
  //   }
  // }

  let bookingsCount = 0;
  if (bookingsList !== undefined) {
    bookingsCount = bookingsList.length;
    bookingsList.sort((a, b) => a.id - b.id);
    console.log(bookingsList);
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

  // const [searchParams, setSearchParams] = useSearchParams();
  searchParams.set("openReservation", false);

  return (
    <div className={classes.all}>
      <div className={classes.header}>
        <div className={classes.date}>
          <h3>{formattedDate}</h3>
          {/* <h3>{dateString}</h3> */}
          {/* <time>{formatDate(new Date())} </time> */}
          <span style={{ color: "#1b7bc2" }}>
            <FaCalendarDays />
          </span>
        </div>
        {/* <div className={classes.ring}>
            <span className={classes.spn}>
              <FaBell />
            </span>
            <button
              onClick={() => {
                setCur((p) => p + 1);
                // generateRingSound();
              }}
            >
              التالي
            </button>

            <label>
              الرقم الحالي: <span style={{ fontWeight: "bold" }}>{now}</span>
            </label>
          </div> */}

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
            {/* <th>تاريخ الحجز</th> */}
            <th>الاسم</th>
            {/* <th>رقم الحجز</th> */}
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
              <tr>
                <td>{idx + 1}. </td>
                {/* <td>{formatDate(new Date(item.date))} </td> */}
                <td>{item.patients.name}</td>
                {/* <td>{idx + 1}</td> */}
                {/* <p>{item.date}</p> */}
                <p>{formatTime(new Date(item.date))}</p>
                {/* <td><p>{formatTime(item.date)}</p></td> */}
                <td>{item.type}</td>
                <td>
                  {" "}
                  {item.status === "تم الدخول والخروج" ? (
                    <Tag type="green">تم الدخول والخروج</Tag>
                  ) : item.status === "لم يتم الدخول للدكتور" ? (
                    <Tag type="blue">انتظار</Tag>
                  ) : (
                    <Tag type="red">بالداخل عند الدكتور</Tag>
                  )}{" "}
                </td>
                {/* <td>{item.status === "لم يتم الدخول للدكتور" && <Tag type="blue">انتظار</Tag>}</td> */}
                {/* <td>{item.status === "بالداخل عند الدكتور" && <Tag type="red">بالداخل عند الدكتور</Tag>}</td> */}
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
