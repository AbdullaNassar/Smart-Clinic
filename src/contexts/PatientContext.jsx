import { createContext, useContext, useState } from "react";

const PatientContext=createContext();
const initiPatients=[
    {
        name:"عبدالله مؤمن محمود",
        age:23,
        phone:"01063698275",
        isPaid:false,
        notes:'',
        date: new Date(),
        patientNo:1,
        
    },
];
function PatientProvider({children}){
    const[patientID,setPatientID]=useState(null);
    const[bookingID,setBookingID]=useState(null);
    const[reservationID,setReservationID]=useState(null);
    function handlePatientID(id){
        setPatientID(id);
    }
    function handleBookingID(id){
        setBookingID(id);
    }
    function handleReservationID(id){
        setReservationID(id);
    }
    const[patientNo,setPatientsNo]=useState(2);
    const[patients,setPatients]=useState(initiPatients);
    const[curPatient,setCurPatient]=useState(1);
    function addPatient(newPatient){
        setPatients(e=>[...e, newPatient]);
        setPatientsNo(e=>e+1);
    }
    
    console.log(patients);
    return (
        <PatientContext.Provider value={
            {
                addPatient,
                patients,
                patientNo,
                curPatient,
                setCurPatient,
                patientID,
                bookingID,
                reservationID,
                handlePatientID,
                handleReservationID,
                handleBookingID,
            }
        }>
            {children}
        </PatientContext.Provider>
    );
}

function usePatient(){
    const context=useContext(PatientContext);
    if(context==='undefined')throw new Error('trying using patient context outside provider');
    return context;
}
export{usePatient, PatientProvider};