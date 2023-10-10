import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./ShowExpenses.module.css";
import { getMyExpenses } from "../../services/apiMyExpenses";
import { getExpenses } from "../../services/apiExpenses";
import { getMyRevenues } from "../../services/apiMyRevenues";
import { getRevenues } from "../../services/apiRevenues";
function ShowRevenues(){

    const {isLoading, data:revenues, error}= useQuery({
        queryKey:['revenues'],
        queryFn: getMyRevenues,
    })
    // console.log(expenses);

    const {isLoading: loadingExpensesType, data:revenueType, error:errorExpensesType}= useQuery({
        queryKey:['Revenues'],
        queryFn: getRevenues,
    })
    console.log(revenueType);
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
    const[revenuesList, setRevenuesList]=useState(revenues);
 useEffect(function(){
  if(revenues!==undefined)switch(order){
    case "all":{
      const newList = revenues; // Create a copy of the original list
      newList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRevenuesList(newList);
      break;
    }
    case "week":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      
      // Filter the original list based on the date
      const newList = revenues.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setRevenuesList(newList);
      break;
    }
    case "month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 30);
      
      // Filter the original list based on the date
      const newList = revenues.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setRevenuesList(newList);
      break;
    }
    case "3month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 90);
      
      // Filter the original list based on the date
      const newList = revenues.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setRevenuesList(newList);
      break;
    }
    case "year":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 365);
      
      // Filter the original list based on the date
      const newList = revenues.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setRevenuesList(newList);
      break;
    }
    case "specfic":{
      const currentDate = new Date(startDate);
      const currentDateString = currentDate.toISOString().split('T')[0];

      // Filter the original list based on the date
      const newList = revenues.filter(obj => {
        // Extract the date part from the 'date' string
        const objDate = obj.date.split('T')[0];

        // Return true if the object's date is today
        return objDate === currentDateString;
      });
      setRevenuesList(newList)
      break;
    }

    default: console.log('cant find order way');
  }
 },[revenues,order,startDate])
    
//  console.log(type);
//  console.log(revenuesList);
 useEffect(function(){
    if(revenuesList!==undefined&&type!=='all'){
        const newList=revenuesList.filter(item=>item.revenueType===type);
        // setRevenuesList(newList);
        // console.log(newList);
    }
 },[revenuesList,type])
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
                        <label>نوع الايراد</label>
                        <select value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="all">all</option>
                            {revenueType!==undefined&&revenueType.map(item=><option value={item.name}>
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
                    <th>نوع الايراد</th>
                    <th>اسم الايراد</th>
                    <th>التاريخ</th>
                    <th>المبلغ قبل الخصم</th>
                    <th>الخصم</th>
                    <th>المبلغ بعد الخصم</th>
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                    <th>ملاحظات</th>
                </tr>
                {revenuesList!==undefined &&revenuesList.map((item,idx)=>
                <tr>
                    <td>{idx+1}</td>        
                    <td>{item.revenueType}</td>
                    <td>{item.revenueName}</td>
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
export default ShowRevenues;