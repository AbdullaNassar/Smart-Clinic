import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createBooking, getbookingInfo, updateSpecficBooking } from "../../services/apiBooking";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRow from "../../UI/FormRow";
import Spinner from "../../UI/Spinner";
import Button  from "../../UI/Button";
import classes from "./UpdateBooking.module.css"

import { FaPersonCirclePlus } from "react-icons/fa6";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateBooking(){

    const {id} =useParams();
    console.log(id);
    const queryClient=useQueryClient();

    const { data:bookingData, isLoading:LoadingBooking, error:errorBookingInfo } = useQuery(['bookingInfo', id], () => getbookingInfo(id));
    console.log(bookingData);

    const updateBookingMutation = useMutation(
        updatedData => updateSpecficBooking(id, updatedData),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:['patients']
            });
           
            toast.success('تم تعديل بيانات الكشف بنجاح!');
          },
          onError: error => {
          
            toast.error(`خطأ في تعديل بيانات الكشف: ${error.message}`);
          },
        }
      );
   
    const navigate=useNavigate();
    
    const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate);
    const {isLoading, data:patients, error}= useQuery({
        queryKey:['patients'],
        queryFn: getPatients,
    })
    
    const{register ,formState, handleSubmit,reset, watch}=useForm({
        defaultValues:bookingData
    });
    const {errors}=formState;
    
    if(isLoading)return <Spinner/>
    function onSubmit(data){
        data.date=startDate;
        // data.status='لم يتم الدخول للدكتور'
        data.price = Number(data.price);  
        data.discount=Number(data.discount);  
        data.paidAmount=Number(data.paidAmount);  

        console.log(data);
        updateBookingMutation.mutate(data);
    }

    return(
        
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.info}>

            <div>
            <div  className={classes.formGroup}>
                <label htmlFor="name" className={classes.label}>
                    المريض:
                </label>
                {/* <FormRow error={errors?.patientID?.message}> */}
                <input disabled={true} id="name"  className={classes.input} type="text" list="names" placeholder="ادخل اسم المريض..." {...register('patientID', {required:"ادخل اسم المريض"})} />
                
                {/* <datalist id="names"  >
                    {patients&&patients.map(patient=><option value={patient.id} data-id={patient.id}>
                        {patient.name}
                    </option>)}
                </datalist> */}
                
                {/* {!isLoading&&<select value={value} onChange={(e)=>setValue(e.target.value)} id="patientID" >
                    {patients!==undefined &&patients.map(patient=><option value={patient.id}>
                        {patient.name===undefined?"":patient.name}
                    </option>)}
                </select>} */}
                 <Link to="/newPatient" className={classes.lnk}>
                    <span><FaPersonCirclePlus/></span>
                    {/* <BsFillPersonPlusFill/> */}
                {/* <Button variant="contained">+</Button> */}
                </Link>
                {errors?.patientID?.message&& <Error>ادخل اسم المريض</Error>}
                {/* </FormRow> */}
            </div>
            
            <div  className={classes.formGroup}>
                <label htmlFor="type" className={classes.label}>
                    نوع الحجز:
                </label>
                <select className={classes.input} id="type" {...register("type")}>
                    <option>حجز عادي</option>
                    <option>حجز مستعجل</option>
                    <option>اعادة كشف</option>
                </select>
            </div>
            
            <div  className={classes.formGroup}>
            <label htmlFor="date" className={classes.label}>
                    تاريخ الحجز:
                </label>
                <ReactDatePicker  className={classes.input} id="date" selected={startDate} onChange={(date) => setStartDate((date))}  />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="notes" className={classes.label}>
                    ملاحظات:
                </label>
                <textarea  disabled={isLoading} id="notes" className={classes.textarea} {...register('notes')} />
            </div>

            </div>

            <div>
            <div className={classes.formGroup}>
                <label htmlFor="price" className={classes.label}>
                        المبلغ:
                </label>
                <FormRow error={errors?.price?.message}>
                    <input className={classes.input}
                    type="number"
                    id="price"
                    disabled={isLoading}
                    {...register("price", { required: "ادخل سعر الكشف",
                    min:{
                        value:50,
                        message:"السعر يجب ان يزيد عن 50 جنيه",

                    } })}
                    />
                </FormRow>
            </div> 
            <div className={classes.formGroup}>
                <label htmlFor="discount" className={classes.label}>
                        الخصم:
                </label>  
                <FormRow error={errors?.discount?.message}>
                    <input className={classes.input}
                    type="number"
                    id="discount"
                    disabled={isLoading}
                    {...register("discount",{ min:{
                        value:0,
                        message: "can't type negative value"
                    }} )}
                    max={watch('price')}
                    />
                </FormRow>  
            </div>
            <div className={classes.formGroup}>
            <label className={classes.label}>
                        المبلغ بعد الخصم:
                </label>
                <FormRow >
                    <input className={classes.input} value={watch('price')- watch('discount')} type="number" disabled={true} />
                </FormRow>
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="paidAmount" className={classes.label}>
                        المدفوع:
                </label> 
                <FormRow  error={errors?.paidAmount?.message}>
                    <input className={classes.input}
                    type="number"
                    id="paidAmount"
                    disabled={isLoading}
                    {...register("paidAmount", { required: "ادخل المبلغ المدفوع", min:{
                        value:0,
                        message: "can't type negative value"
                    } })} 
                    
                    />
                </FormRow> 
            </div>
            
            <div>
                <label className={classes.label}>
                        المتبقي:
                </label>
                <FormRow >
                    <input className={classes.input} value={watch('price')-watch('discount')-watch('paidAmount')} type="number" disabled={true}/>
                </FormRow>
            </div>
            </div>
            </div>
            <div className={classes.btns}>
                <Button variation="secondary" onClick={()=>navigate(-1)}>الغاء</Button>
                <button className={classes.button}>تعديل</button>
            </div>
                
        </form>
        
    );
}
export default UpdateBooking;