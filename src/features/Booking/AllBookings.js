import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./AllBookings.module.css";
import { deleteBooking, getBooking } from "../../services/apiBooking";
import { Link } from "react-router-dom";
import NewReservation from "../Kashf/NewReservation";
import supabase from "../../services/supabase";
function AllBookings(){
  const queryClient= useQueryClient();
  const { isLoading:isDeleting, mutate} = useMutation({
    mutationFn:(id)=>deleteBooking(id),
    onSuccess: ()=>{
        queryClient.invalidateQueries({
            queryKey:['booking'],
        })
    },
    onError: err=>alert(err.message)
})

  const[IDs,setIDs]=useState();
  const [patientNames, setPatientNames] = useState([]);
     async function getPatientInfo(id){
      
      const{data, error}=await supabase
      .from('patients')
      .select()
      .eq('id',id)
      .single()
      if(error){
        console.log('ere');
        return;
      }
      // console.log(data);
      return data.name;
    }
    // getPatientInfo(1);
    const[isStart,setIsStart]=useState(false);
    const {isLoading, data:bookings, error}= useQuery({
        queryKey:['booking'],
        queryFn: getBooking,
    })
    console.log(bookings);
    // console.log(typeof(bookings[5].date))

useEffect(() => {
    async function fetchData() {
      const names = [];
      if(isLoading)return;

      for (const id of bookings) {
        const name = await getPatientInfo(id.patientID);
        names.push(name);
      }
      setPatientNames(names);
    }
    fetchData();

    if(bookings!==undefined){
      const today = new Date().toISOString().split('T')[0];
    }
  }, [bookings,isLoading]);

// console.log(patientNames);
    // console.log(bookings[1].patientID);
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
    console.log((startDate));

    const[order,setOrder]=useState('all');
    const[bookingList, setBookingList]=useState(bookings);
 useEffect(function(){
  switch(order){
    case "all":{
      const newList = bookings; // Create a copy of the original list
      newList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBookingList(newList);
      break;
    }
    case "week":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      
      // Filter the original list based on the date
      const newList = bookings.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setBookingList(newList);
      break;
    }
    case "month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 30);
      
      // Filter the original list based on the date
      const newList = bookings.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setBookingList(newList);
      break;
    }
    case "3month":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 90);
      
      // Filter the original list based on the date
      const newList = bookings.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setBookingList(newList);
      break;
    }
    case "year":{
      const currentDate = new Date();

      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 365);
      
      // Filter the original list based on the date
      const newList = bookings.filter(obj => {
        // Convert the 'date' string to a Date object
        const objDate = new Date(obj.date);
      
        // Return true if the object's date is within the last 7 days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return objDate >= sevenDaysAgo && objDate<newDate ;
      });
      setBookingList(newList);
      break;
    }
    case "specfic":{
      const currentDate = new Date(startDate);
      const currentDateString = currentDate.toISOString().split('T')[0];

      // Filter the original list based on the date
      const newList = bookings.filter(obj => {
        // Extract the date part from the 'date' string
        const objDate = obj.date.split('T')[0];

        // Return true if the object's date is today
        return objDate === currentDateString;
      });
      setBookingList(newList)
      break;
    }

    default: console.log('cant find order way');
  }
 },[bookings,order])
    

    // const filteredList = patients.filter((item) => {
    //     const itemDate = new Date(item.date);
    //     return (
    //       itemDate.getDate() === startDate.getDate() &&
    //       itemDate.getMonth() === startDate.getMonth() &&
    //       itemDate.getFullYear() === startDate.getFullYear()
    //     );
    //   });
      
     

      useEffect(() => {
        const handleAfterPrint = () => {
          generatePDF();
          window.removeEventListener('afterprint', handleAfterPrint);
        };
    
        window.addEventListener('afterprint', handleAfterPrint);
    
        return () => {
          window.removeEventListener('afterprint', handleAfterPrint);
        };
      }, []);
    
      const generatePDF = () => {
        const doc = new jsPDF();
        doc.html(document.body, {
          callback: function () {
            doc.save('webpage.pdf');
          },
        });
      };
    
      const handleSavePDF = () => {
        window.print();
      };
      if(isStart){
        // console.log(IDs);
        return(
          <>
          <NewReservation patientID={IDs.patientID} bookingID={IDs.bookingID} />
          <button className="no-print" onClick={(e)=>setIsStart(e=>!e)}>انهاء الكشف</button>
          </>
  
        );
      }
    else return(
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
                </div>
                <div onClick={handleSavePDF} className={classes.print}>
                    <label>طباعة</label>
                    <span ><FaPrint/></span>
                </div>
            </div>
            <div>
            <table className={classes.customers}>
                <tr>
                    <th>الاسم</th>
                    <th>رقم الحجز</th>
                    <th>نوع الحجز</th>
                    <th>حاله الحجز</th>
                    <th>المبلغ</th>
                    <th>التاريخ</th>
                    <th>ملاحظات</th>
                </tr>
                {!isLoading &&bookingList.map((item,idx)=>
                <tr>
                    <td>{patientNames[idx]}</td>
                    <td>{idx+1}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td><time>{formatDate(item.date)}</time></td>
                    <td>{item.notes}</td>
                </tr>)}
               
            </table>
              
            </div>
        </div>
    );
}
export default AllBookings;