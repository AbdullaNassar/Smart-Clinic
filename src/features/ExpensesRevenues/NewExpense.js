import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { addNewExpense, getExpenses } from "../../services/apiExpenses";
import { useForm } from "react-hook-form";
import { addNewClinicExpenses } from "../../services/apiMyExpenses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function NewExpense(){
    const navigate =useNavigate();
    const[date,setDate]=useState(new Date());
    const[isOpen,setIsOpen]=useState(false);
    const[addExpense,setAddExpense]=useState('');
    const {isLoading: loadingExpenses, data:expenses, error:errorExpenses}= useQuery({
        queryKey:['Expenses'],
        queryFn: getExpenses,
    })
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewExpense,
        onSuccess: ()=>{
            toast.success("new Expense added succsfully");
            queryClient.invalidateQueries({
                queryKey:['Expenses']
            }); 
        },
        onError:(err)=>toast.error(err.message),
    });
    console.log(expenses);

    const {isLoading:isAddingExpense, mutate:mutateMyExpense}=useMutation({
        mutationFn: addNewClinicExpenses,
        onSuccess: ()=>{
            alert("new my Expnese added succsfully");
            queryClient.invalidateQueries({
                queryKey:['Expenses']
            }); 
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(expenses);

    const{register , handleSubmit,reset}=useForm()

    function onSubmit(data){
        data.date=date;
        console.log(data);
        mutateMyExpense(data);
        navigate(-1);
    }
    if(loadingExpenses)return <h2>Loading...</h2>
    if(errorExpenses)return <h2>Error on loading expenses</h2>
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>نوع المصروف</label>
                <select {...register('expenseType')}>
                {expenses.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >ادخل نوع المصروف</label>
                    <input value={addExpense} onChange={(e)=>setAddExpense(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(addExpense===''){
                            alert('ادخل نوع المصروف');
                            return;
                        }
                        const newDis={
                            "name":addExpense,
                        }
                        mutate(newDis);
                        setAddExpense('');
                        setIsOpen(false);
                    }}>اضافه مصروف جديد</button>
                    <button  type="button" onClick={()=>setIsOpen(false)}>اغلاق</button>
                </div>}
            </div>
            <div>
                <label>اسم المصروف</label>
                <input {...register('expenseName')}/>
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
export default NewExpense;