import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createBooking } from "../../services/apiBooking";

function NewBooking(){
    const[value,setValue]=useState();
    const {isLoading, data:patients, error}= useQuery({
        queryKey:['patients'],
        queryFn: getPatients,
    })
    // console.log('here');
    // console.log(patients);
    const{register , handleSubmit,reset}=useForm();
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: createBooking,
        onSuccess: ()=>{
            alert("new patient added succsfully");
            queryClient.invalidateQueries({
                queryKey:['patients']
            });
            reset();
        },
        onError:(err)=>alert(err.message),
    });

    function onSubmit(data){
        console.log(data);
        mutate(data);
    }
    // console.log('value', value);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>المريض</label>
                {!isLoading&&<select value={value} onChange={(e)=>setValue(e.target.value)} id="patientID" {...register('patientID')}>
                    {patients.map(patient=><option value={patient.id}>
                        {patient.name}
                    </option>)}
                </select>}
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
                <label>حاله الكشف</label>
                <select id="status" {...register('status')}>
                    <option>لم يتم الدخول للدكتور</option>
                    <option>بالداخل عند الدكور</option>
                    <option>تم الدخول والخروج</option>
                    <option>تم الغاء الحجز</option>
                </select>
            </div>
            <div>
                <label>تاريخ الحجز</label>
                <input/>
            </div>
            <div>
                <label>المبلغ قبل الخصم</label>
                <input type="number" id="price" {...register('price')} />
            </div>
            <div>
                <label>الخصم</label>
                <input type="number"/>
            </div>
            <div>
                <label>المبلغ بعد الخصم</label>
                <input type="number"/>
            </div>
            <div>
                <label>المدفوع</label>
                <input type="number" id="paidAmount" {...register('paidAmount')}/>
            </div>
            <div>
                <label>المتبقي</label>
                <input type="number"/>
            </div>
            <div>
                <label>ملاحظات</label>
                <textarea id="notes" {...register("notes")}/>
            </div>
            <button>حجز</button>
            <button type="reset">reset</button>
        </form>
    );
}
export default NewBooking;