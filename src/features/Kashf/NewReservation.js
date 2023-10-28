import { Link, useNavigate } from "react-router-dom";
import classes from "./NewReservation.module.css";
import { useState } from "react";
import PatientInfo from "./newReservFeatures/PatientInfo";
import Diagnosis from "./newReservFeatures/Diagnosis";
import Food from "./newReservFeatures/Food";
import MedicalTests from "./newReservFeatures/MedicalTests";
import OldDiasies from "./newReservFeatures/OldDiasies";
import OpposingMedications from "./newReservFeatures/OpposingMedications";
import Printer from "./newReservFeatures/Printer";
import QuickCheck from "./newReservFeatures/QuickCheck";
import Rosheta from "./newReservFeatures/Rosheta";
import Symptoms from "./newReservFeatures/Symptoms";
import Xrays from "./newReservFeatures/Xrays";
import supabase from "../../services/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creteReservation, updateReservationColumn } from "../../services/apiReservation";
import { getPatientInfo } from "../../services/apiPatients";
import { getbookingInfo, updateBooking } from "../../services/apiBooking";
import toast from "react-hot-toast";
import { addNewClinicRevenues } from "../../services/apiMyRevenues";
import { Button } from "@mui/material";
import  { ConfirmationModal } from "../../UI/Modal";
function NewReservation({patientID, bookingID,}){
    const[isOpenModal,setIsOpenModal]=useState(false);
    console.log('ids');
    console.log(patientID,bookingID);
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery(['patientInfo', patientID], () => getPatientInfo(patientID));
    const { data:bookingInfo, isLoading:isLoadingBooking, error:errorBooking } = useQuery(['bookingInfo', bookingID], () => getbookingInfo(bookingID));
    console.log(bookingInfo);
    const {isLoading:isAddingRevenue, mutate:mutateMyRevenue}=useMutation({
        mutationFn: addNewClinicRevenues,
        onSuccess: ()=>{
            toast.success("new my Revenue added succsfully");
            queryClient.invalidateQueries({
                queryKey:['Revenues']
            }); 
        },
        onError:(err)=>toast.error(err.message),
    });
    const initData=
    {
        
        "patientID":patientID,
        "bookingID":bookingID,
    }
    const[dataReserv,setDataReserv]=useState(initData);
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: creteReservation,
        onSuccess: ()=>{
            toast.success("تمت اضافة حجز جديد بنجاح");
            queryClient.invalidateQueries({
                queryKey:['patients']
            }); 
        },
        onError:(err)=>toast.error(err.message),
    });

    const mutation = useMutation((params) => updateBooking(...params), {
        onSuccess: () => {
        //   alert('here updated successfully!');
        },
        onError: (error) => {
        //   alert('Error updating column: ' + error.message);
        },
      });
    function saveData(type,data){
          switch(type){
            case "quickCheck":{
                setDataReserv((prev) => ({...prev, quickCheck:data}));
                toast.success('تم حفظ البيانات بنجاح')
                  break;
            }
            case "oldDisease":{
                setDataReserv((prev) => ({...prev, oldDisease:data}));
                // mutate(dataReserv);
                toast.success('تم حفظ البيانات بنجاح')
                  break;
            }
            case "symptoms":{
                setDataReserv((prev)=>({...prev, symptoms:data}));
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            case "diagnosis":{
                setDataReserv((prev)=>({...prev, diagnosis:data}));
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            case "rosheta":{
                setDataReserv((prev)=>({...prev, rosheta:data}));
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            case "medicalTests":{
                setDataReserv((prev)=>({...prev, medicalTest:data}));
                toast.success('تم حفظ البيانات بنجاح')
                break;
                // mutate(dataReserv)
            }
            case "xrays":{
                setDataReserv((prev)=>({...prev, xrays:data}));
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            case "foods":{
                setDataReserv((prev)=>({...prev, food:data}));
                // mutate(dataReserv);
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            case "oppositeMedicines":{
                setDataReserv((prev)=>({...prev, oppositeMedicines:data}));
                // mutate(dataReserv);
                toast.success('تم حفظ البيانات بنجاح')
                break;
            }
            default: toast.error('cant define type');
          }
        //   mutate(dataReserv);
    }
    console.log('data');
    console.log(dataReserv);
    async function getData(){
        let { data, error } = await supabase
  .from('Reservations')
  .select('*')
//   console.log('here')
//   if(!error)console.log(data[0].test.name);
    }
    getData();
    const[cur,setCur]=useState(0);
    function switchTab(id){
        setCur(id);
    }
    return(
        <div className={classes.all}>
            {cur!==100&&<div className={classes.btns}>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(0)}>بيانات المريض</Button >
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(1)}>فحص سريع</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(2)}>مراض سابقه</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(3)}>الاعراض</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(4)}>التشخيص</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(5)}>الروشته العلاجيه</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(6)}>التحاليل المطلوبه</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(7)}>الاشعه المطلوبه</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(8)}>الاكل المحدد</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(9)}>الادويه المتعارضه</Button>
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>switchTab(10)}>طباعه</Button>   
                {/* <Button variant="text" style={{fontSize:"16px"}} onClick={()=>{
                     const id = bookingID;
                     const columnName = 'status';
                     const columnValue = "تم الدخول والخروج";
                     const params = [id, columnName, columnValue];
                     mutation.mutate(params);
                     mutate(dataReserv);
                     navigate(-1);
                }}>انهاء الكشف</Button>     */}
                <Button variant="text" style={{fontSize:"16px"}} onClick={()=>{
                      setIsOpenModal(true)
                      
                     }}>

                        انهاء الكشف
                     </Button> 
            </div>}
            <ConfirmationModal
                      isOpen={isOpenModal}
                      onCancel={()=>setIsOpenModal(false)}
                      onConfirm={()=>{
                        const id = bookingID;
                        const columnName = 'status';
                        const columnValue = "تم الدخول والخروج";
                        const params = [id, columnName, columnValue];
                        mutation.mutate(params);
                        mutate(dataReserv);
                        navigate(-1);
                        setIsOpenModal(false);
                      
                      }}
                    />
            {cur===0 && <PatientInfo data={data} isLoading={isLoading} error={error} /> }
            {cur===1 && <QuickCheck data={dataReserv.quickCheck} saveData={saveData} /> }
            {cur===2 && <OldDiasies data={dataReserv.oldDisease} saveData={saveData} /> }
            {cur===3 && <Symptoms  data={dataReserv.symptoms} saveData={saveData}/> }
            {cur===4 && <Diagnosis data={dataReserv.diagnosis} saveData={saveData} /> }
            {cur===5 && <Rosheta data={dataReserv.rosheta} saveData={saveData}/> }
            {cur===6 && <MedicalTests data={dataReserv.medicalTest} saveData={saveData}/> }
            {cur===7 && <Xrays data={dataReserv.xrays} saveData={saveData}/> }
            {cur===8 && <Food data={dataReserv.food} saveData={saveData}/> }
            {cur===9 && <OpposingMedications data={dataReserv.oppositeMedicines} saveData={saveData}/> }
            {cur===10 && <Printer data={dataReserv} patientinfo={data} /> }
         </div>
    );
}
export default NewReservation;