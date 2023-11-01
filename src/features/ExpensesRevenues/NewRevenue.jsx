import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { addNewExpense, getExpenses } from "../../services/apiExpenses";
import { useForm } from "react-hook-form";
import { addNewClinicExpenses } from "../../services/apiMyExpenses";
import { useNavigate } from "react-router-dom";
import { addNewRevenue, getRevenues } from "../../services/apiRevenues";
import { addNewClinicRevenues } from "../../services/apiMyRevenues";
import toast from "react-hot-toast";
function NewRevenue(){
    const navigate =useNavigate();
    const[date,setDate]=useState(new Date());
    const[isOpen,setIsOpen]=useState(false);
    const[addRevenue,settAddRevenue]=useState('');
    const {isLoading: loadingRevenue, data:revenues, error:errorRevenue}= useQuery({
        queryKey:['Revenues'],
        queryFn: getRevenues,
    })
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewRevenue,
        onSuccess: ()=>{
            alert("new Revenue added succsfully");
            queryClient.invalidateQueries({
                queryKey:['Revenues']
            }); 
        },
        onError:(err)=>alert(err.message),
    });
    console.log(revenues);

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
    // console.log(revenues);

    const{register , handleSubmit,reset}=useForm()

    function onSubmit(data){
        data.date=date;
        console.log(data);
        // mutateMyRevenue(data);
        reset();
    }
    if(loadingRevenue)return <h2>Loading...</h2>
    if(errorRevenue)return <h2>Error on loading revenues</h2>
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>نوع الايراد</label>
                <select {...register('revenueType')}>
                {revenues.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الايراد</label>
                    <input value={addRevenue} onChange={(e)=>settAddRevenue(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(addRevenue===''){
                            alert('ادخل اسم الايراد');
                            return;
                        }
                        const newDis={
                            "name":addRevenue,
                        }
                        mutate(newDis);
                        settAddRevenue('');
                        setIsOpen(false);
                    }}>اضافه ايراد جديد</button>
                    <button  type="button" onClick={()=>setIsOpen(false)}>اغلاق</button>
                </div>}
            </div>
            <div>
                <label>اسم المريض</label>
                <input {...register('patientName')} />
            </div>
            <div>
                <label>التاريخ</label>
                <ReactDatePicker selected={date} onChange={(date) => setDate((date))}  />
            </div>
            <div>
                <label>المبلغ قبل الخصم</label>
                <input {...register('price')}/>
            </div>
            <div>
                <label>الخصم</label>
                <input {...register('discount')}/>
            </div>
            <div>
                <label>المبلغ بعد الخصم</label>
                <input/>
            </div>
            <div>
                <label>المدفوع</label>
                <input {...register('paidAmount')} />
            </div>
            <div>
                <label>المتبقي</label>
                <input {...register('reminderAmount')} />
            </div>
            <div>
                <label>ملاحظات</label>
                <input {...register('notes')} />
            </div>
        <button>حفظ</button>
        <button type="button" onClick={()=>{
            navigate(-1);
        }}>اغلاق</button>
        </form>
    );
}
export default NewRevenue;