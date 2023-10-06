import { useEffect, useState } from "react";
import supabase from "../../../services/supabase";
import { useQuery } from "@tanstack/react-query";
import { getPatientInfo } from "../../../services/apiPatients";

function PatientInfo({patientID}){
    // const {isLoading, data:bookings, error}= useQuery({
    //     queryKey:['patients'],
    //     queryFn: getBooking,
    // })
    // console.log('patient', patientID);
    const { data, isLoading, error } = useQuery(['patientInfo', patientID], () => getPatientInfo(patientID));
   
      if(isLoading)return<p>Loading...</p>
    return (
        <div>
            <div>
                <label>اسم المريض</label>
                <input value={data?.name}/>
            </div>
            <div>
                <label>العمر</label>
                <input value={data?.age} />
            </div>
            <div>
                <label>الجنس</label>
                <input value={data?.gender} />
            </div>
            <div>
                <label>الرقم</label>
                <input value={data?.phone} />   
            </div>
            <div>
                <label>ملاحظات</label>
                <textarea value={data?.notes} />
            </div>
        </div>
    );
}
export default PatientInfo;