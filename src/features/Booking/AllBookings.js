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
    // console.log((startDate));

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
                    <DatePicker selected={startDate} onChange={(date) => setStartDate((date))} />
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
                    <th>ملاحظات</th>
                </tr>
                {!isLoading &&bookings.map((item,idx)=>
                <tr>
                    <td>{patientNames[idx]}</td>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td>{item.notes}</td>
                    {item.status==='لم يتم الدخول للدكتور'&&<button onClick={()=>{
                      setIsStart(true)
                      const ids={
                        "bookingID":item.id,
                        "patientID":item.patientID,
                      }
                      setIDs(ids);
                    }}> بدء الكشف</button>}
                    <button>تعديل</button>
                    {item.status!=='تم الدخول والخروج' &&
                     <button onClick={()=>{
                      mutate(item.id);
                     }}>
                        حذف
                     </button>}
                </tr>)}
               
            </table>
              
            </div>
        </div>
    );
}
export default AllBookings;