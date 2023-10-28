import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMoneyBillTrendUp, FaPrint, FaRegCalendarCheck, FaSistrix } from "react-icons/fa6";
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./AllBookings.module.css";
import { deleteBooking, getBooking } from "../../services/apiBooking";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NewReservation from "../Kashf/NewReservation";
import supabase from "../../services/supabase";
import Pagination from "../../UI/Pagnition";
import { getRevenues } from "../../services/apiRevenues";
import MyFilter from "../../UI/MyFilter";
function AllBookings(){
  const navigate=useNavigate();
  const queryClient= useQueryClient();
  const[searchQuery,setSearchQuery]=useState(null);

  const [searchParams,setSearchParams]=useSearchParams();
  const page=!searchParams.get("page")?1: Number(searchParams.get('page'));
    console.log(page);

    const {isLoading: loadingExpensesType, data:revenueType, error:errorExpensesType}= useQuery({
      queryKey:['Revenues'],
      queryFn: getRevenues,
  })
  
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
    const[isStart,setIsStart]=useState(false);
    const {isLoading, data:bookings, error}= useQuery({
        queryKey:['booking'],
        queryFn: getBooking,
    })
    console.log(bookings);

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

    const order = !searchParams.get("last")
    ? "all"
    : searchParams.get("last");
  
    
    // const[order,setOrder]=useState('all');
    const[type,setType]=useState('all');

    let bookingsList=[];

  if(bookings!==undefined)switch(order){
    case "all":{
      const newList = bookings; // Create a copy of the original list
      newList.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      bookingsList=newList;
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
      bookingsList=newList;
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
      bookingsList=newList;
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
      bookingsList=newList;
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
      bookingsList=newList;
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
      bookingsList=newList
      break;
    }

    default: console.log('cant find order way');
  }

  if(bookingsList!==undefined&&type!=='all'){
    console.log('here');
      const newList=bookingsList.filter(item=>item.type===type);
      bookingsList=newList;
     
      console.log(newList);
  }

  if(bookingsList!==undefined&&searchQuery!==null) {
    // console.log(searchQuery);
    bookingsList = bookingsList.filter((item) =>
    item.patients.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
    // console.log(bookingsList);

    
    let bookingsCount=0 ;
    if(bookingsList!==undefined){ bookingsCount=bookingsList.length;
    let x=[];
    for(let from=(page-1)*10 , count=0; from<bookingsList.length &&count<10;count++,from++ ){
    x.push(bookingsList[from]);
    }
    bookingsList=x;}
    console.log(bookingsList);      
      if(isStart){
        
        return(
          <>
          <NewReservation patientID={IDs.patientID} bookingID={IDs.bookingID} />
          <button className="no-print" onClick={(e)=>setIsStart(e=>!e)}>انهاء الكشف</button>
          </>
  
        );
      }
    else return(
        <div>
          <div className="heading">
            <h2 className="heading__title">جميع الحجوزات</h2>
            <span color={{color:"#04AA6D;"}}><FaRegCalendarCheck/></span>
          </div>
            <div className={classes.header}>
                  <div>
                    
                    <input  placeholder="بحث..." type="text" id="search"  value={searchQuery} onChange={(e)=>{
                            setSearchQuery(e.target.value)
                            searchParams.set('page',1)
                          setSearchParams(searchParams);
                        }}/>
                        <span><FaSistrix/></span>
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
                    />
                    </div>
                    
                    <div>
                        <label>نوع الحجز</label>
                        <select value={type} onChange={(e)=>{
                          searchParams.set('page',1)
                          setSearchParams(searchParams);
                          setType(e.target.value)
                        }}>
                            <option value="all">all</option>
                            {revenueType!==undefined&&revenueType.map(item=><option value={item.name}>
                                {item.name}
                            </option>)}
                        </select>
                    </div>
                    
                  <div className={classes.date}>  
                    {/* {order==='specfic'&& <time>{formatDate(startDate)} </time>} */}
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setStartDate(newDate);
                        searchParams.set('page',1)
                        searchParams.set('last','specfic')
                        
                      setSearchParams(searchParams);
                      // setOrder('specfic');
                    }}>-</button>
                    
                    <DatePicker selected={startDate} onChange={(date) => {
                      setStartDate((date))
                      searchParams.set('page',1)
                      searchParams.set('last','specfic')
                      setSearchParams(searchParams);

                      // setOrder('specfic');
                    }} />
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setStartDate(newDate);
                        searchParams.set('page',1)
                        searchParams.set('last','specfic')
                      setSearchParams(searchParams);
                      // setOrder('specfic');
                    }}>+</button>
                    </div>
                    
                
                <div className={classes.print}>
                    {/* <label>طباعة</label> */}
                    <span onClick={()=>window.print()} ><FaPrint/></span>
                </div>
            </div>
           
            <div>
            <table className={classes.customers}>
                <tr>
                    <th></th>
                    <th>الاسم</th>
                    <th>السن</th>
                    <th>رقم الهاتف</th>
                    <th>رقم الحجز</th>
                    <th>نوع الحجز</th>
                    <th>حاله الحجز</th>
                    <th>التاريخ</th>
                    <th>المبلغ</th>
                    <th>الخصم</th>
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                    <th>ملاحظات</th>
                </tr>
                {!isLoading &&bookingsList.map((item,idx)=>
                <tr>
                    <td>{(page-1)*10+idx+1}</td>
                    <td>{item.patients.name}</td>
                    <td>{item.patients.age}</td>
                    <td>{item.patients.phone}</td>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td><time>{formatDate(item.date)}</time></td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.paidAmount}</td>
                    <td>{item.price-item.discount-item.paidAmount}</td>
                    <td>{item.notes}</td>
                    <td><button disabled={item.status!=='تم الدخول والخروج'} className="btnOutlined" onClick={()=>{
                            navigate(`/ReservationDetails?patID=${item.patients.id}&bokID=${item.id}`)
                        }}>فتح الكشف</button></td>
                </tr>)}
               
            </table>
              
            </div>
            {bookingsList!==undefined && <Pagination count={bookingsCount} />}

        </div>
    );
}
export default AllBookings;