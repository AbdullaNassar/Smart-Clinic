import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBell, FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./AllBookings.module.css";
import { deleteBooking, getBooking, updateBooking } from "../../services/apiBooking";
import { Link } from "react-router-dom";
import NewReservation from "../Kashf/NewReservation";
import supabase from "../../services/supabase";
function TodayBooking(){
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
    console.log(bookings)

    // const queryClient=useQueryClient();
    // const {isLoading:isOpening, mutate:mutateOpen}=useMutation({
    //     mutationFn:(id)=>updateBooking(id),
    //     onSuccess: ()=>{
    //         queryClient.invalidateQueries({
    //             queryKey:['booking'],
    //         })
    //     },
    //     onError: err=>alert(err.message)
    // })
   
        const mutation = useMutation((params) => updateBooking(...params), {
          onSuccess: () => {
            // alert('Column updated successfully!');
          },
          onError: (error) => {
            alert('Error updating column: ' + error.message);
          },
        });

useEffect(() => {
    async function fetchData() {
      const names = [];
      if(isLoading)return;
      if(bookings!==undefined){
        const today = new Date().toISOString().split('T')[0];
  
        for (let i = bookings.length - 1; i >= 0; i--) {
          const obj = bookings[i];
          if (obj.date.split('T')[0] !== today) {
            bookings.splice(i, 1);
          }
        }
      }
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
          {/* <button className="no-print" onClick={(e)=>setIsStart(e=>!e)}>انهاء الكشف</button> */}
          </>
  
        );
      }
    else return(
        <div>
            <div className={classes.header}>
                <div>
                    <time>{formatDate(new Date())} </time>
                    <span><FaBell/></span>
                    <button>التالي</button>
                    <input type="number"/>
                    <label>الرقم الحالي: 1</label>
                    {/* <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setStartDate(newDate);
                    }}>-</button>
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setStartDate(newDate);
                    }}>+</button>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate((date))} /> */}
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
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                    <th>ملاحظات</th>
                </tr>
                {!isLoading &&bookings.map((item,idx)=>
                <tr>
                    <td>{patientNames[idx]}</td>
                    <td>{idx+1}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td>{item.notes}</td>
                    <td>{item.notes}</td>
                    <td>{item.notes}</td>
                    {item.status!=='تم الدخول والخروج'&&<button onClick={()=>{
                      setIsStart(true)
                      const ids={
                        "bookingID":item.id,
                        "patientID":item.patientID,
                      }
                      setIDs(ids);
                      const id = item.id;
                        const columnName = 'status';
                        const columnValue = "بالداخل عند الدكتور";
                        const params = [id, columnName, columnValue];
                        console.log('here')
                        mutation.mutate(params);
                      
                    }}>{item.status==='بالداخل عند الدكتور'?"فتح الكشف":"بدء الكشف"}</button>}
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
export default TodayBooking;