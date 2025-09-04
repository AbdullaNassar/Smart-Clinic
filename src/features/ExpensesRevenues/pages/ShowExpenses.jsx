import classes from "./ShowExpenses.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaMoneyBill1, FaPrint } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { eachDayOfInterval, isSameDay, subDays } from "date-fns";

import MyFilter from "../../../shared/components/ui/MyFilter";
import Pagination from "../../../shared/components/ui/Pagnition";
import useMyExpenses from "../hooks/useMyExpenses";
import useExpenses from "../hooks/useExpenses";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatTime,
} from "../../../shared/utils/helper";

function ShowExpenses() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [type, setType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  /// Data fetching layer
  const { loadingExpenses, expenses, errorExpenses } = useMyExpenses();
  const {
    expenses: expensesType,
    loadingExpenses: loadingExpensesType,
    errorExpenses: errorExpensesType,
  } = useExpenses();

  //  Loading/error handling
  if (loadingExpenses || loadingExpensesType) return <Spinner />;
  if (errorExpenses || errorExpensesType) return <ErrorFallback />;

  const order = !searchParams.get("last") ? "all" : searchParams.get("last");
  let expensesList = [];
  if (expenses !== undefined)
    switch (order) {
      case "all": {
        const newList = expenses; // Create a copy of the original list
        newList.sort((a, b) => new Date(b.date) - new Date(a.date));

        expensesList = newList;
        break;
      }
      case "week": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 7 - 1),
          end: new Date(),
        });

        const filteredData = expenses.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);

        break;
      }
      case "month": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 30 - 1),
          end: new Date(),
        });

        const filteredData = expenses.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
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

        const filteredData = expenses.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 90);

        break;
      }
      case "year": {
        const allDates = eachDayOfInterval({
          start: subDays(new Date(), 90 - 1),
          end: new Date(),
        });

        const filteredData = expenses.filter((obj) =>
          allDates.some((date) => isSameDay(new Date(obj.date), date))
        );

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 365);

        break;
      }
      case "specfic": {
        const filteredData = expenses.filter((obj) =>
          isSameDay(new Date(obj.date), new Date())
        );
        expensesList = filteredData;

        break;
      }

      default:
        console.log("cant find order way");
    }

  if (expensesList !== undefined && type !== "all" && type !== "") {
    const newList = expensesList.filter((item) => item.expenseType === type);
    expensesList = newList;
  }
  if (expensesList !== undefined && searchQuery !== null) {
    expensesList = expensesList.filter((item) =>
      item.expenseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  let expensesCount = 0;
  if (expensesList !== undefined) {
    expensesCount = expensesList.length;
    let x = [];
    for (
      let from = (page - 1) * 10, count = 0;
      from < expensesList.length && count < 10;
      count++, from++
    ) {
      x.push(expensesList[from]);
    }
    expensesList = x;
  }

  let allPrices = 0,
    allDiscounts = 0,
    allPaid = 0;
  if (expensesList) {
    for (let i = 0; i < expensesList.length; i++) {
      allPrices += expensesList[i].price - expensesList[i].discount;
      allDiscounts += expensesList[i].discount;
      allPaid += expensesList[i].paidAmount;
    }
  }
  return (
    <div className={classes.all}>
      <div className="heading">
        <div className="title">
          <h2 className="heading__title textAnimation">المصروفات</h2>
          <span style={{ color: "#6A994E" }}>
            <FaMoneyBill1 />
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
          {/* <span>
            <FaSistrix />
          </span> */}
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
            backgroundColor="#6A994E"
            hoverBackgroundColor="#6A994E"
          />
        </div>

        <div>
          <select
            value={type}
            onChange={(e) => {
              searchParams.set("page", 1);
              setSearchParams(searchParams);
              setType(e.target.value);
            }}
            className={classes.type}
          >
            <option value="" disabled selected>
              اسم المصروف
            </option>
            <option value="all">all</option>
            {expensesType !== undefined &&
              expensesType.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
          </select>
        </div>

        {/* <div className={classes.date}>
          <button
            onClick={() => {
              const newDate = new Date(startDate);
              newDate.setDate(newDate.getDate() - 1);
              setStartDate(newDate);
              searchParams.set("page", 1);
              searchParams.set("last", "specfic");

              setSearchParams(searchParams);
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
            }}
          >
            +
          </button>
        </div> */}

        <div className={classes.print}>
          {/* <label>طباعة</label> */}
          <span onClick={() => window.print()}>
            <FaPrint />
          </span>
        </div>
      </div>
      <div>
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>اسم المصروف</th>
            <th>المورد</th>
            <th>الهاتف</th>
            {/* <th>اسم المصروف</th> */}
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
          {expensesList !== undefined &&
            expensesList.map((item, idx) => (
              <tr key={item.id}>
                <td>{formatNumber(idx + 1)}</td>
                <td>{item.expenseType}</td>
                <td>{item.supplierName}</td>
                <td>{item.supplierPhone}</td>
                <td>
                  <time>{formatDate(new Date(item.date))}</time>
                </td>
                <td>
                  <p>{formatTime(new Date(item.date))}</p>
                </td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.discount)}</td>
                <td>{formatCurrency(item.price - item.discount)}</td>
                <td>{formatCurrency(item.paidAmount)}</td>
                <td>
                  {formatCurrency(item.price - item.discount - item.paidAmount)}
                </td>
                <td>{item.notes}</td>
              </tr>
            ))}
        </table>
      </div>
      {expensesList !== undefined && <Pagination count={expensesCount} />}
    </div>
  );
}
export default ShowExpenses;
