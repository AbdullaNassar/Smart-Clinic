import { Link } from "react-router-dom";
import classes from "./Main.module.css";
import { usePatient } from "../contexts/PatientContext";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking } from "../services/apiBooking";
function Main(){
    const{patients,curPatient,setCurPatient}=usePatient();
    const[end,setEnd]=useState(false);

    const {isLoading, data:bookings, error}= useQuery({
        queryKey:['booking'],
        queryFn: getBooking,
    })
    
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
    return(
        <div className={classes.all}>
            <div className={classes.header}>
                <h1>العياده</h1>
                <h2>اليوم الثلاثاء 25 يناير 2023</h2>
            </div>
            <div className={classes.main}>
                <div className={classes.btns}>
                    <button>
                        <Link to="/booking">الحجوزات</Link>
                    </button>
                    <button>
                        <Link to="/patients">المرضي</Link>
                    </button>
                    <button>
                        <Link to="/reservations">الكشف</Link>
                    </button>
                    <button>
                        <Link to="/patientHistory">المخزن</Link>
                    </button>
                    <button>
                        <Link to="/dailyInfo">البيانات اليوميه</Link>
                    </button>
                    <button>
                        <Link to="/dailyInfo">الاعدادت</Link>
                    </button>
                    <button>
                        <Link to="/dailyInfo">تسجيل دخول/خروج</Link>
                    </button>
                </div>
                <div className={classes.current}>
                    <div className={classes.cur}>
                        <label>الرقم الحالي {curPatient}</label>
                        <button onClick={()=>{
                            setEnd(false);
                            setCurPatient(cur=>cur+1);
                        }}>+</button>
                        <button>-</button>
                    </div>
                   {!end&& <textarea/>}
                    {!end&&<button onClick={()=>{setEnd(true);}} className={classes.save}>انهاء الحجز </button>}
                </div>
                {isLoading &&<h2>Loading...</h2>}
                {!isLoading&&<div className={classes.display}>
                    {bookings.map(item=>
                        <div className={classes.item}>
                            <input type="checkbox"/> 
                            <div>{item.patientName} {item.id}</div>
                            <button onClick={()=>{
                                mutate(item.id);
                            }}>delete</button>
                        </div>)}
                </div>}
            </div>
        </div>

    );
}
export default Main;
