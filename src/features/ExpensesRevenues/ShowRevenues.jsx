import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaMoneyBill1,
  FaMoneyBillTrendUp,
  FaPrint,
  FaSistrix,
} from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import classes from "./ShowRevenues.module.css";
import { getRevenues } from "../../services/apiRevenues";
import { getReservations } from "../../services/apiReservation";
import Pagination from "../../UI/Pagnition";
import { useSearchParams } from "react-router-dom";
import MyFilter from "../../UI/MyFilter";
import { formatCurrency } from "../../utils/helper";
// #198dc1 blue color
// #198dc1 blue dark
function ShowRevenues() {
  const [searchQuery, setSearchQuery] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: revenues,
    error,
  } = useQuery({
    queryKey: ["revenues"],
    queryFn: getReservations,
  });
  console.log(revenues);

  const {
    isLoading: loadingExpensesType,
    data: revenueType,
    error: errorExpensesType,
  } = useQuery({
    queryKey: ["Revenues"],
    queryFn: getRevenues,
  });
  console.log(revenueType);
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
  const [startDate, setStartDate] = useState(new Date());

  const order = !searchParams.get("last") ? "all" : searchParams.get("last");

  // const[order,setOrder]=useState('all');
  const [type, setType] = useState("all");

  let RevenuesList = [];

  if (revenues !== undefined)
    switch (order) {
      case "all": {
        const newList = revenues; // Create a copy of the original list
        newList.sort(
          (a, b) => new Date(b.bookings.date) - new Date(a.bookings.date)
        );

        RevenuesList = newList;
        break;
      }
      case "week": {
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);

        // Filter the original list based on the date
        const newList = revenues.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.bookings.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        RevenuesList = newList;
        break;
      }
      case "month": {
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 30);

        // Filter the original list based on the date
        const newList = revenues.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.bookings.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        RevenuesList = newList;
        break;
      }
      case "3month": {
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 90);

        // Filter the original list based on the date
        const newList = revenues.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.bookings.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        RevenuesList = newList;
        break;
      }
      case "year": {
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 365);

        // Filter the original list based on the date
        const newList = revenues.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.bookings.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        RevenuesList = newList;
        break;
      }
      case "specfic": {
        const currentDate = new Date(startDate);
        const currentDateString = currentDate.toISOString().split("T")[0];

        // Filter the original list based on the date
        const newList = revenues.filter((obj) => {
          // Extract the date part from the 'date' string
          const objDate = obj.bookings.date.split("T")[0];

          // Return true if the object's date is today
          return objDate === currentDateString;
        });
        RevenuesList = newList;
        break;
      }

      default:
        console.log("cant find order way");
    }

  if (RevenuesList !== undefined && type !== "all") {
    console.log("here");
    const newList = RevenuesList.filter((item) => item.bookings.type === type);
    RevenuesList = newList;

    console.log(newList);
  }
  console.log(RevenuesList);
  if (RevenuesList !== undefined && searchQuery !== null) {
    // console.log(searchQuery);
    RevenuesList = RevenuesList.filter((item) =>
      item.patients.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  // console.log(RevenuesList);

  let expensesCount = 0;
  if (RevenuesList !== undefined) {
    expensesCount = RevenuesList.length;
    let x = [];
    for (
      let from = (page - 1) * 10, count = 0;
      from < RevenuesList.length && count < 10;
      count++, from++
    ) {
      x.push(RevenuesList[from]);
    }
    RevenuesList = x;
  }

  let allPrices = 0,
    allDiscounts = 0,
    allPaid = 0;
  if (RevenuesList) {
    for (let i = 0; i < RevenuesList.length; i++) {
      allPrices +=
        RevenuesList[i].bookings.price - RevenuesList[i].bookings.discount;
      allDiscounts += RevenuesList[i].bookings.discount;
      allPaid += RevenuesList[i].bookings.paidAmount;
    }
  }
  console.log(RevenuesList);
  return (
    <div>
      <div className="heading">
        <div className="title">
          <h2 className="heading__title">الايرادات</h2>
          <span style={{ color: "#04aa6d" }}>
            <FaMoneyBillTrendUp />
          </span>
        </div>
        <div style={{ color: "black" }}>
          🚀 نتائج البحث: <span className="spn">{expensesCount}</span>{" "}
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
          <span>
            <FaSistrix />
          </span>
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
            backgroundColor="#04aa6d"
            hoverBackgroundColor="#04aa6d"
          />
        </div>

        <div>
          <label>نوع المصروف</label>
          <select
            value={type}
            onChange={(e) => {
              searchParams.set("page", 1);
              setSearchParams(searchParams);
              setType(e.target.value);
            }}
          >
            <option value="all">all</option>
            {revenueType !== undefined &&
              revenueType.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
          </select>
        </div>

        <div className={classes.date}>
          {/* {order==='specfic'&& <time>{formatDate(startDate)} </time>} */}
          <button
            onClick={() => {
              const newDate = new Date(startDate);
              newDate.setDate(newDate.getDate() - 1);
              setStartDate(newDate);
              searchParams.set("page", 1);
              searchParams.set("last", "specfic");

              setSearchParams(searchParams);
              // setOrder('specfic');
            }}
          >
            -
          </button>

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              searchParams.set("page", 1);
              searchParams.set("last", "specfic");
              setSearchParams(searchParams);

              // setOrder('specfic');
            }}
          />
          <button
            onClick={() => {
              const newDate = new Date(startDate);
              newDate.setDate(newDate.getDate() + 1);
              setStartDate(newDate);
              searchParams.set("page", 1);
              searchParams.set("last", "specfic");
              setSearchParams(searchParams);
              // setOrder('specfic');
            }}
          >
            +
          </button>
        </div>

        <div className={classes.print}>
          {/* <label>طباعة</label> */}
          <span onClick={() => window.print()} style={{ color: "#04aa6d" }}>
            <FaPrint />
          </span>
        </div>
      </div>
      <div>
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>اسم المريض</th>
            <th>نوع الايراد</th>
            <th>التاريخ</th>
            <th>الوقت</th>
            <th> المبلغ</th>
            <th>الخصم</th>
            <th>المبلغ بعد الخصم</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>ملاحظات</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className={classes.results}>
              {formatCurrency(allDiscounts + allPrices)}
            </td>
            <td className={classes.results}>{formatCurrency(allDiscounts)}</td>
            <td className={classes.results}>{formatCurrency(allPrices)}</td>
            <td className={classes.results}>{formatCurrency(allPaid)}</td>
            <td className={classes.results}>
              {formatCurrency(allPrices - allPaid)}
            </td>
          </tr>
          {RevenuesList !== undefined &&
            RevenuesList.map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.patients.name}</td>
                <td>{item.bookings.type}</td>
                <td>
                  <time>{formatDate(new Date(item.bookings.date))}</time>
                </td>
                <td>
                  <p>{formatTime(new Date(item.bookings.date))}</p>
                </td>
                <td>{formatCurrency(item.bookings.price)}</td>
                <td>{formatCurrency(item.bookings.discount)}</td>
                <td>
                  {formatCurrency(item.bookings.price - item.bookings.discount)}
                </td>
                <td>{formatCurrency(item.bookings.paidAmount)}</td>
                <td>
                  {formatCurrency(
                    item.bookings.price -
                      item.bookings.discount -
                      item.bookings.paidAmount
                  )}
                </td>
                <td>{item.bookings.notes}</td>
              </tr>
            ))}
        </table>
      </div>
      {RevenuesList !== undefined && <Pagination count={expensesCount} />}
    </div>
  );
}
export default ShowRevenues;
