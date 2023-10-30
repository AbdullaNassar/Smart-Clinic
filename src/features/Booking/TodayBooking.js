import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaBell, FaCalendarDays, FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./TodayBooking.module.css"
import { deleteBooking,  getTodayBooking, updateBooking } from "../../services/apiBooking";
import NewReservation from "../Kashf/NewReservation";
import s1 from "../../sounds/Recording.m4a";
import s2 from "../../sounds/Recording(2).m4a";
import s3 from "../../sounds/Recording(3).m4a";
import s4 from "../../sounds/Recording(4).m4a";
import s5 from "../../sounds/Recording(5).m4a";
import s6 from "../../sounds/Recording(6).m4a";
import s7 from "../../sounds/Recording(7).m4a";
import s8 from "../../sounds/Recording(8).m4a";
import s9 from "../../sounds/Recording(9).m4a";
import s10 from "../../sounds/Recording(10).m4a";
import ring from "../../sounds/ring.mp3";
import DeleteConfirmationModal from "../../UI/Modal";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTodayActivity } from "./useTodayActivity";
import Tag from "../../UI/Tag";
function TodayBooking(){
  const whatsappLink = `https://wa.me/+201288612529`;

  const currentDate = new Date();

  const options = { timeZone: 'Africa/Cairo', dateStyle: 'full' };
  const arabicLocale = 'ar-EG';
  const dateString = currentDate.toLocaleDateString(arabicLocale, options);
  console.log(dateString);

  const audioRef = useRef(null);
 
  const navigate=useNavigate();
  const[isOpenModal,setIsOpenModal]=useState(false);
  const[cur,setCur]=useState(1);
  const queryClient= useQueryClient();
  const { isLoading:isDeleting, mutate} = useMutation({
    mutationFn:(id)=>deleteBooking(id),
    onSuccess: ()=>{
       toast.success('booking deleting succsfuly')
        queryClient.invalidateQueries({
            queryKey:['booking'],
        })
    },
    onError: err=>toast.error(err.message)
})
console.log(new Date());

  const[IDs,setIDs]=useState();
   
    const[isStart,setIsStart]=useState(false);
    let {isLoading, data:bookings, error}= useQuery({
        queryKey:['booking'],
        queryFn: getTodayBooking,
    })

    // const { activities, isLoading:loadingActivity } = useTodayActivity();
    // console.log(activities);
    // console.log(bookings)
        const mutation = useMutation((params) => updateBooking(...params), {
          onSuccess: () => {
            // toast.success('Column updated successfully!');
          },
          onError: (error) => {
            // toast.error('Error updating column: ' + error.message);
          },
        });

       

 useEffect(function(){
  if(bookings!==undefined){
  for(let i=0;i<bookings.length;i++){
    if(bookings[i].status!=='تم الدخول والخروج'){
      setCur(i+1);
      break;
    }
    setCur(bookings.length);
  }
  }
 },[bookings])

 const generateRingSound = () => {
 
let audio = new Audio(ring);
audio.onended = handleSoundEnded;
audioRef.current = audio;
audio.play();
    
  };
  const handleSoundEnded = () => {
    let audio = new Audio(ring);
audio.onended = funcAudio;
audioRef.current = audio;
audio.play();
  };



  function funcAudio(){
    let audio;
    
    switch(cur){
      case 1:{
        audio = new Audio(s1);
        break;
      }
      case 2:{
        audio = new Audio(s2);
        break;
      }
      case 3:{
        audio = new Audio(s3);
        break;
      }
      case 4:{
        audio = new Audio(s4);
        break;
      }
      case 5:{
        audio = new Audio(s5);
        break;
      }
      case 6:{
        audio = new Audio(s6);
        break;
      }
      case 7:{
        audio = new Audio(s7);
        break;
      }
      case 8:{
        audio = new Audio(s8);
        break;
      }
      case 9:{
        audio = new Audio(s9);
        break;
      }
      case 10:{
        audio = new Audio(s10);
        break;
      }
      default:
    }
      audio.play();
  }

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
   console.log(formatTime(new Date()));
    
   let bookingsList=[];
   let now =0;
  if(bookings!==undefined){
      for(let i=0;i<bookings.length;i++){
        if(bookings[i].status==='تم الدخول والخروج'){
          bookingsList.push(bookings[i]);
        }
      }
      bookings = bookings.filter(item => item.status !== "تم الدخول والخروج");

      for(let i=0;i<bookings.length;i++){
        if(bookings[i].type==='حجز مستعجل'){
          bookingsList.push(bookings[i]);
        }
      }
      bookings = bookings.filter(item => item.type !== "حجز مستعجل");

      for(let i=0;i<bookings.length;i++){
        bookingsList.push(bookings[i]);
      }


     
      
        now =bookingsList.length;
        for(let i=bookingsList.length-1;i>=0;i--){
          if(bookingsList[i].status==='تم الدخول والخروج'){
            console.log('ok', i+2);
            now=i+2;
            break;
          }

          if(bookingsList[i].status==='بالداخل عند الدكتور'){
            console.log('here', i+1);
            now =i+1;
            break;
          }
        }
      
  }

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
                
                    <div className={classes.date}>
                      <h3>{dateString}</h3>
                      {/* <time>{formatDate(new Date())} </time> */}
                      <span><FaCalendarDays/></span>
                    </div>
                    <div className={classes.ring}>
                    <span className={classes.spn} onClick={(e)=>generateRingSound()}><FaBell/></span>
                    <button onClick={(e)=>{
                      setCur(p=>p+1);
                      // generateRingSound();
                    }}>التالي</button>
                    
                    <label>الرقم الحالي: <span style={{fontWeight:"bold"}}>{now}</span></label>
                    </div>
                   
                    <div onClick={()=>window.print()} className={classes.print}>
                    {/* <label>طباعة</label> */}
                    <span ><FaPrint/></span>
                
                </div>
                
            </div>
            <div>
            <table className={classes.customers}>
                <tr>
                    <th></th>
                    <th>الاسم</th>
                    <th>رقم الحجز</th>
                    <th>الوقت</th>
                    <th>نوع الحجز</th>
                    <th>حاله الحجز</th>
                    <th>المبلغ</th>
                    <th>الخصم</th>
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                    <th>ملاحظات</th>
                </tr>
                {!isLoading &&bookingsList.map((item,idx)=>
                <tr>
                    <td>{item.id} </td>
                    <td style={{fontWeight:"bold"}}>{item.patients.name}</td>
                    <td>{idx+1}</td>
                    {/* <p>{item.date}</p> */}
                    <p>{formatTime(new Date(item.date))}</p>
                    {/* <td><p>{formatTime(item.date)}</p></td> */}
                    <td>{item.type}</td>
                    <td> {item.status === "تم الدخول والخروج"?<Tag type="green">تم الدخول والخروج</Tag>:item.status === "لم يتم الدخول للدكتور"?<Tag type="blue">انتظار</Tag>:<Tag type="red">بالداخل عند الدكتور</Tag>} </td>
                    {/* <td>{item.status === "لم يتم الدخول للدكتور" && <Tag type="blue">انتظار</Tag>}</td> */}
                    {/* <td>{item.status === "بالداخل عند الدكتور" && <Tag type="red">بالداخل عند الدكتور</Tag>}</td> */}
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.paidAmount}</td>
                    <td>{item.price-item.paidAmount-item.discount}</td>
                    <td>{item.notes}</td>
                    <div className={classes.btns}>
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
                    <button onClick={()=>{
                      navigate(`/updateBooking/${item.id}`)
                    }}>تعديل</button>
                    {item.status!=='تم الدخول والخروج' &&
                     <button onClick={()=>{
                      setIsOpenModal(true)
                      
                     }}>

                        حذف
                     </button>}
                     
                     <button onClick={()=>{
                      navigate(`/ReservationDetails?patID=${item.patientID}&bokID=${item.id}`)
                    }}>تعديل الكشف</button>

                        
                    </div>

                     <DeleteConfirmationModal
                      isOpen={isOpenModal}
                      onCancel={()=>setIsOpenModal(false)}
                      onConfirm={()=>{
                        mutate(item.id);
                        setIsOpenModal(false);
                      
                      }}
                    />
                    
                
                     
                </tr>)}
               
            </table>
              
            </div>
        </div>
    );
}
export default TodayBooking;