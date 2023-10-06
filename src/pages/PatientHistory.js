import { useEffect, useState } from "react";
import { usePatient } from "../contexts/PatientContext";
import classes from "./PatientHistory.module.css";
import { getPatients } from "../services/apiPatients";
import { useQuery } from "@tanstack/react-query";
function PatientHostory(){
    const {isLoading, data:patients, error}= useQuery({
        queryKey:['patients'],
        queryFn: getPatients,
    })
    console.log(patients);
    return(
        <div className={classes.all}>
            <div className={classes.search}>
                <div className={classes.searchItem}>
                    <label>بحث بالاسم</label>
                    <input/>
                </div>
                {/* <div className={classes.searchItem}>
                    <label>بحث بالرقم</label>
                    <input value={numberSearch} onChange={(e)=>setNumberSearch(e.target.value)} type="number"/>
                </div> */}
            </div>
            {isLoading &&<h1>Loading</h1>}
            {!isLoading&&<div>
                {patients.map(item=>
                <div className={classes.patientItem}>
                    <h2>{item.name} </h2>
                    <h3>{item.phone}</h3>
                    {/* <label>عدد الزيارات: 3</label> */}
                    <button>تفاصيل</button>
                </div>)
                }
            </div>}
        </div>
    );
}
export default PatientHostory;