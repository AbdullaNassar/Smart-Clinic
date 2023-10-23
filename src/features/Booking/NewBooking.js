import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createBooking } from "../../services/apiBooking";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import Spinner from "../../UI/Spinner";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function NewBooking(){
    const[value,setValue]=useState();
    const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate);
    const {isLoading, data:patients, error}= useQuery({
        queryKey:['patients'],
        queryFn: getPatients,
    })
    
    const{register ,formState, handleSubmit,reset, watch}=useForm({
        defaultValues:{
            discount:0
        }
    });
    const {errors}=formState;
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: createBooking,
        onSuccess: ()=>{
            toast.success("new booking added succsfully");
            queryClient.invalidateQueries({
                queryKey:['patients']
            });
            reset();
        },
        onError:(err)=>toast.error(err.message),
    });
    if(isLoading)return <Spinner/>
    function onSubmit(data){
        data.date=startDate;
        data.status='لم يتم الدخول للدكتور'
        data.price = Number(data.price);  
        data.discount=Number(data.discount);  
        data.paidAmount=Number(data.paidAmount);  

        console.log(data);
        mutate(data);
    }
    // console.log('value', value);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>hello</h2>
                <input type="text" list="names" placeholder="Search names..." {...register('patientID')} />
                <datalist id="names"  >
                    {patients&&patients.map(patient=><option value={patient.id} data-id={patient.id}>
                        {patient.name}
                    </option>)}
                </datalist>
                <label>المريض</label>
                {/* {!isLoading&&<select value={value} onChange={(e)=>setValue(e.target.value)} id="patientID" >
                    {patients!==undefined &&patients.map(patient=><option value={patient.id}>
                        {patient.name===undefined?"":patient.name}
                    </option>)}
                </select>} */}
                <button>
                    <Link to="/newPatient">+</Link>
                </button>
            </div>
            

            <div>
                <label>نوع الحجز</label>
                <select id="type" {...register("type")}>
                    <option>حجز عادي</option>
                    <option>حجز مستعجل</option>
                    <option>اعادة كشف</option>
                </select>
            </div>
            
            <div>
                <label>تاريخ الحجز</label>
                <ReactDatePicker selected={startDate} onChange={(date) => setStartDate((date))}  />
            </div>

            <FormRow label="المبلغ" error={errors?.price?.message}>
                <Input
                type="number"
                id="price"
                disabled={isLoading}
                {...register("price", { required: "This field is required",
                min:{
                    value:50,
                    message:"price must be a bigger than 50 EGP",

                } })}
                />
            </FormRow> 

            <FormRow label="الخصم" error={errors?.discount?.message}>
                <Input
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
            
            <FormRow label="المبلغ بعد الخصم" >
                <Input value={watch('price')- watch('discount')} type="number" disabled={true} />
            </FormRow>
            
            <FormRow label="المدفوع" error={errors?.paidAmount?.message}>
                <Input
                type="number"
                id="paidAmount"
                disabled={isLoading}
                {...register("paidAmount", { required: "This field is required", min:{
                    value:0,
                    message: "can't type negative value"
                } })} 
                
                />
            </FormRow> 
            
            <FormRow label="المتبقي" >
                <Input value={watch('price')-watch('discount')-watch('paidAmount')} type="number" disabled={true}/>
            </FormRow>
    
            <FormRow label="ملاحظات">
                <Input
                id="notes"
                disabled={isLoading}
                {...register("notes", )}
                />
            </FormRow> 
            <button>حجز</button>
            <button type="reset">reset</button>
        </form>
    );
}
export default NewBooking;