import { useEffect, useState } from "react";
import { usePatient } from "../contexts/PatientContext";
import classes from "./PatientHistory.module.css";
import { getPatients } from "../services/apiPatients";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/apiReservation";
import { Link, useNavigate } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
function PatientHostory(){
    const[searchQuery,setSearchQuery]=useState(null);
    const {isLoading, data:patients, error}= useQuery({
        queryKey:['patients'],
        queryFn: getPatients,
    })
    // console.log(patients);

    const {isLoading:loadingReservations, data:reservations, error:errorReservations}= useQuery({
        queryKey:['reservations'],
        queryFn: getReservations,
    })
    // console.log(reservations);

    function getCountReservations(id){
        let ans=0;
        for(let i=0;i<reservations.length;i++){
            if(reservations[i].patientID===id)ans++;
        }
        return ans;
    }
    // console.log(searchQuery);
    let filteredList=patients;
    if(!isLoading&&searchQuery) filteredList = patients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(filteredList);
    const navigate =useNavigate();
    return(
        <div className={classes.all}>
            <div className={classes.search}>
                <div className={classes.searchItem}>
                    <label>بحث بالاسم</label>
                    <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                </div>
                <span onClick={()=>{
                    window.print();
                }}><FaPrint/></span>
            </div>
            {isLoading &&<h1>Loading</h1>}
            {!isLoading&&!loadingReservations && 
            <table className={classes.customers}>
                <tr>
                    <th></th>
                    <th>الاسم</th>
                    {/* <th>الرقم</th> */}
                    <th>السن</th>
                    <th>رقم الهاتف</th>
                    <th>النوع</th>
                    <th>عدد الزيارات</th>
                    <th>ملاحظات</th>
                </tr>
                {filteredList.map((item,idx)=>
                <tr>
                    <td>{idx+1}</td>
                    <td>{item.name}</td>
                    {/* <td>{item.id}</td> */}
                    <td>{item.age}</td>
                    <td>{item.phone}</td>
                    <td>{item.gender}</td>
                    <td>{getCountReservations(item.id)}</td>
                    <td>{item.notes}</td>
                    <td><button onClick={()=>{
                        navigate(`/patientDetails/${item.id}`)
                    }}>تفاصيل</button></td>
                </tr>)}
            </table>}
        </div>
    );
}
export default PatientHostory;