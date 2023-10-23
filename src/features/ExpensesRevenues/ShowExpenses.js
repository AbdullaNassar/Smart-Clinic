import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./ShowExpenses.module.css";
import { getMyExpenses } from "../../services/apiMyExpenses";
import { getExpenses } from "../../services/apiExpenses";
function ShowExpenses(){

    const {isLoading, data:expenses, error}= useQuery({
        queryKey:['expenses'],
        queryFn: getMyExpenses,
    })
    // console.log(expenses);

    const {isLoading: loadingExpensesType, data:expensesType, error:errorExpensesType}= useQuery({
        queryKey:['Expenses'],
        queryFn: getExpenses,
    })
    console.log(expensesType);
    const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

    function formatTime(date) {
        return new Intl.DateTimeFormat("en", {
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(date);
      }
    const [startDate, setStartDate] = useState(new Date());
   
    const[order,setOrder]=useState('all');
    const[type,setType]=useState('all');
    let expensesList;
    // const[expensesList, setExpensesList]=useState(expenses);
 
  if(expenses!==undefined)switch(order){
    case "all":{
      expensesList = expenses; // Create a copy of the original list
      expensesList.sort((a, b) => new Date(b.date) - new Date(a.date));
      // expensesList=newList;
      // setExpensesList(newList);
      break;
    }
    case "week":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      
      // Filter the original list based on the date
      const newList = expenses.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      expensesList=newList;
      // setExpensesList(newList);
      break;
    }
    case "month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 30);
      
      // Filter the original list based on the date
      const newList = expenses.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      expensesList=newList;
      // setExpensesList(newList);
      break;
    }
    case "3month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 90);
      
      // Filter the original list based on the date
      const newList = expenses.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      expensesList=newList;
      // setExpensesList(newList);
      break;
    }
    case "year":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 365);
      
      // Filter the original list based on the date
      const newList = expenses.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      expensesList=newList;
      // setExpensesList(newList);
      break;
    }
    case "specfic":{
      const currentDate = new Date(startDate);
      const currentDateString = currentDate.toISOString().split('T')[0];

      // Filter the original list based on the date
      const newList = expenses.filter(obj => {
        // Extract the date part from the 'date' string
        const objDate = obj.date.split('T')[0];

        // Return true if the object's date is today
        return objDate === currentDateString;
      });
      expensesList=newList;
      // setExpensesList(newList)
      break;
    }

    default: console.log('cant find order way');
  }

    
 console.log(type);
 console.log(expensesList);
 
    if(expensesList!==undefined&&type!=='all'){
        const newList=expensesList.filter(item=>item.expenseType===type);
        expensesList=newList;
        // setExpensesList(newList);
        // console.log(newList);
    }

 return(
        <div>
            <div className={classes.header}>
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
            </div>
            <div>
            <table className={classes.customers}>
                <tr>
                    <th></th>
                    <th>نوع المصروف</th>
                    <th>اسم المصروف</th>
                    <th>التاريخ</th>
                    <th>المبلغ قبل الخصم</th>
                    <th>الخصم</th>
                    <th>المبلغ بعد الخصم</th>
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                    <th>ملاحظات</th>
                </tr>
                {expensesList!==undefined &&expensesList.map((item,idx)=>
                <tr>
                    <td>{idx+1}</td>        
                    <td>{item.expenseType}</td>
                    <td>{item.expenseName}</td>
                    <td><time>{formatDate(item.date)}</time></td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>200</td>
                    <td>{item.paidAmount}</td>
                    <td>{item.reminderAmount}</td>
                    <td>{item.notes}</td>
                    
                </tr>)}
               
            </table>
              
            </div>
        </div>
    );
}
export default ShowExpenses;