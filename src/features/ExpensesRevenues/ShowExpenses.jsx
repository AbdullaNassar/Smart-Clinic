import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMoneyBill1, FaPrint, FaSistrix } from "react-icons/fa6";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./ShowExpenses.module.css";
import { getMyExpenses } from "../../services/apiMyExpenses";
import { getExpenses } from "../../services/apiExpenses";
import MyFilter from "../../UI/MyFilter";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../UI/Pagnition";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatCurrency } from "../../utils/helper";
function ShowExpenses() {
  const [searchQuery, setSearchQuery] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: expenses,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getMyExpenses,
  });
  // console.log(expenses);

  const {
    isLoading: loadingExpensesType,
    data: expensesType,
    error: errorExpensesType,
  } = useQuery({
    queryKey: ["Expenses"],
    queryFn: getExpenses,
  });
  console.log(expensesType);
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

  //     const[order,setOrder]=useState('all');
  //     const[type,setType]=useState('all');
  //     let expensesList;
  //     // const[expensesList, setExpensesList]=useState(expenses);

  //   if(expenses!==undefined)switch(order){
  //     case "all":{
  //       expensesList = expenses; // Create a copy of the original list
  //       expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
  //       // expensesList=newList;
  //       // setExpensesList(newList);
  //       break;
  //     }
  //     case "week":{
  //       const currentDate = new Date();

  //       // Calculate the date 7 days ago
  //       const sevenDaysAgo = new Date();
  //       sevenDaysAgo.setDate(currentDate.getDate() - 7);

  //       // Filter the original list based on the date
  //       const newList = expenses.filter(obj => {
  //         // Convert the 'date' string to a Date object
  //         const objDate = new Date(obj.date);

  //         // Return true if the object's date is within the last 7 days
  //         const newDate = new Date();
  //         newDate.setDate(newDate.getDate() + 1);
  //         return objDate >= sevenDaysAgo && objDate<newDate ;
  //       });
  //       expensesList=newList;
  //       // setExpensesList(newList);
  //       break;
  //     }
  //     case "month":{
  //       const currentDate = new Date();

  //       // Calculate the date 7 days ago
  //       const sevenDaysAgo = new Date();
  //       sevenDaysAgo.setDate(currentDate.getDate() - 30);

  //       // Filter the original list based on the date
  //       const newList = expenses.filter(obj => {
  //         // Convert the 'date' string to a Date object
  //         const objDate = new Date(obj.date);

  //         // Return true if the object's date is within the last 7 days
  //         const newDate = new Date();
  //         newDate.setDate(newDate.getDate() + 1);
  //         return objDate >= sevenDaysAgo && objDate<newDate ;
  //       });
  //       expensesList=newList;
  //       // setExpensesList(newList);
  //       break;
  //     }
  //     case "3month":{
  //       const currentDate = new Date();

  //       // Calculate the date 7 days ago
  //       const sevenDaysAgo = new Date();
  //       sevenDaysAgo.setDate(currentDate.getDate() - 90);

  //       // Filter the original list based on the date
  //       const newList = expenses.filter(obj => {
  //         // Convert the 'date' string to a Date object
  //         const objDate = new Date(obj.date);

  //         // Return true if the object's date is within the last 7 days
  //         const newDate = new Date();
  //         newDate.setDate(newDate.getDate() + 1);
  //         return objDate >= sevenDaysAgo && objDate<newDate ;
  //       });
  //       expensesList=newList;
  //       // setExpensesList(newList);
  //       break;
  //     }
  //     case "year":{
  //       const currentDate = new Date();

  //       // Calculate the date 7 days ago
  //       const sevenDaysAgo = new Date();
  //       sevenDaysAgo.setDate(currentDate.getDate() - 365);

  //       // Filter the original list based on the date
  //       const newList = expenses.filter(obj => {
  //         // Convert the 'date' string to a Date object
  //         const objDate = new Date(obj.date);

  //         // Return true if the object's date is within the last 7 days
  //         const newDate = new Date();
  //         newDate.setDate(newDate.getDate() + 1);
  //         return objDate >= sevenDaysAgo && objDate<newDate ;
  //       });
  //       expensesList=newList;
  //       // setExpensesList(newList);
  //       break;
  //     }
  //     case "specfic":{
  //       const currentDate = new Date(startDate);
  //       const currentDateString = currentDate.toISOString().split('T')[0];

  //       // Filter the original list based on the date
  //       const newList = expenses.filter(obj => {
  //         // Extract the date part from the 'date' string
  //         const objDate = obj.date.split('T')[0];

  //         // Return true if the object's date is today
  //         return objDate === currentDateString;
  //       });
  //       expensesList=newList;
  //       // setExpensesList(newList)
  //       break;
  //     }

  //     default: console.log('cant find order way');
  //   }

  //  console.log(type);
  //  console.log(expensesList);

  //     if(expensesList!==undefined&&type!=='all'){
  //         const newList=expensesList.filter(item=>item.expenseType===type);
  //         expensesList=newList;
  //         // setExpensesList(newList);
  //         // console.log(newList);
  //     }

  const order = !searchParams.get("last") ? "all" : searchParams.get("last");

  // const[order,setOrder]=useState('all');
  const [type, setType] = useState("all");

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
        console.log(filteredData);

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);

        // Filter the original list based on the date
        const newList = expenses.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        // expensesList=newList;
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
        console.log(filteredData);

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 30);

        // Filter the original list based on the date
        const newList = expenses.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        // expensesList=newList;
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
        console.log(filteredData);

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 90);

        // Filter the original list based on the date
        const newList = expenses.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        // expensesList=newList;
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
        console.log(filteredData);

        expensesList = filteredData;
        expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));

        const currentDate = new Date();

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 365);

        // Filter the original list based on the date
        const newList = expenses.filter((obj) => {
          // Convert the 'date' string to a Date object
          const objDate = new Date(obj.date);

          // Return true if the object's date is within the last 7 days
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + 1);
          return objDate >= sevenDaysAgo && objDate < newDate;
        });
        // expensesList=newList;
        break;
      }
      case "specfic": {
        const filteredData = expenses.filter((obj) =>
          isSameDay(new Date(obj.date), new Date(startDate))
        );
        expensesList = filteredData;

        const currentDate = new Date(startDate);
        const currentDateString = currentDate.toISOString().split("T")[0];

        // Filter the original list based on the date
        const newList = expenses.filter((obj) => {
          // Extract the date part from the 'date' string
          const objDate = obj.date.split("T")[0];

          // Return true if the object's date is today
          return objDate === currentDateString;
        });
        // expensesList=newList
        break;
      }

      default:
        console.log("cant find order way");
    }

  if (expensesList !== undefined && type !== "all") {
    console.log("here");
    const newList = expensesList.filter((item) => item.expenseType === type);
    expensesList = newList;

    console.log(newList);
  }
  console.log(expensesList);
  if (expensesList !== undefined && searchQuery !== null) {
    // console.log(searchQuery);
    expensesList = expensesList.filter((item) =>
      item.expenseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  // console.log(expensesList);

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
  console.log(expensesList);
  return (
    <div>
      <div className="heading">
        <div className="title">
          <h2 className="heading__title">المصروفات</h2>
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
            backgroundColor="#6A994E"
            hoverBackgroundColor="#6A994E"
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
            {expensesType !== undefined &&
              expensesType.map((item) => (
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
          <span onClick={() => window.print()}>
            <FaPrint />
          </span>
        </div>
      </div>
      {/* <div className={classes.header}>
                <div>
                    <time>{formatDate(startDate)} </time>
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setStartDate(newDate);
                    }}>-</button>
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setStartDate(newDate);
                    }}>+</button>
                    <DatePicker selected={startDate} onChange={(date) => {
                      setStartDate((date))
                      setOrder('specfic');
                    }} />
                    <button onClick={(e)=>setOrder('all')}>الكل</button>
                    <button onClick={(e)=>setOrder('week')}>اخر اسبوع</button>
                    <button onClick={(e)=>setOrder('month')}>اخر شهر </button>
                    <button onClick={(e)=>setOrder('3month')}>اخر 3 شهور </button>
                    <button onClick={(e)=>setOrder('year')}>اخر سنه</button>
                    <div>
                        <label>نوع المصروف</label>
                        <select value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="all">all</option>
                            {expensesType!==undefined&&expensesType.map(item=><option value={item.name}>
                                {item.name}
                            </option>)}
                        </select>
                    </div>
                </div>
                
                <div onClick={()=>{
                    window.print();
                }} className={classes.print}>
                    <label>طباعة</label>
                    <span ><FaPrint/></span>
                </div>
            </div> */}
      <div>
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>نوع المصروف</th>
            <th>اسم المصروف</th>
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
          {expensesList !== undefined &&
            expensesList.map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.expenseType}</td>
                <td>{item.expenseName}</td>
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
