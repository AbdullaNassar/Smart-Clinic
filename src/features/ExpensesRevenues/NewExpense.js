import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { addNewExpense, getExpenses } from "../../services/apiExpenses";
import { useForm } from "react-hook-form";
import { addNewClinicExpenses } from "../../services/apiMyExpenses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import classes from "./NewExpense.module.css"
import FormRow from "../../UI/FormRow";
import Button from "../../UI/Button";
import styled from "styled-components";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function NewExpense(){
    const navigate =useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const[date,setDate]=useState(new Date());
    const[isOpen,setIsOpen]=useState(false);
    const[addExpense,setAddExpense]=useState('');
    const {isAddingExpense: loadingExpenses, data:expenses, error:errorExpenses}= useQuery({
        queryKey:['Expenses'],
        queryFn: getExpenses,
    })
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewExpense,
        onSuccess: ()=>{
            toast.success("تمت الاضافه");
            queryClient.invalidateQueries({
                queryKey:['Expenses']
            }); 
        },
        onError:(err)=>toast.error(err.message),
    });
    // console.log(expenses);

    const {isLoading:isAddingExpense, mutate:mutateMyExpense}=useMutation({
        mutationFn: addNewClinicExpenses,
        onSuccess: ()=>{
            toast.success("تمت اضافه عمليه شراء جديده بنجاح");
            queryClient.invalidateQueries({
                queryKey:['Expenses']
            }); 
        },
        onError:(err)=>toast.error(err.message),
    });
    // console.log(expenses);

    const{register ,formState, handleSubmit,reset, watch}=useForm({
        defaultValues:{
            discount:0
        }
    });
    const {errors}=formState;

    function onSubmit(data){
        // startDate.setHours(startDate.getHours() + 2);
        data.date=startDate;
        data.price = Number(data.price);  
        data.discount=Number(data.discount);  
        data.paidAmount=Number(data.paidAmount);  
        console.log(data);
        mutateMyExpense(data);
        reset();
        
        // navigate(-1);
    }
    if(loadingExpenses)return <h2>Loading...</h2>
    if(errorExpenses)return <h2>Error on loading expenses</h2>
    return(
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.info}>

            <div>
            <div  className={classes.formGroup}>
                <label htmlFor="type" className={classes.label}>
                    نوع المصروف:
                </label>
                <select className={classes.input} id="type" {...register("expenseType")}>
                {expenses&&expenses.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button className={classes.btn} type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >ادخل نوع المصروف</label>
                    <input value={addExpense} onChange={(e)=>setAddExpense(e.target.value)}/>
                    <button  className={classes.btn} type="button" onClick={()=>{
                        if(addExpense===''){
                            
                            toast.error('ادخل نوع المصروف');
                            return;
                        }
                        const newDis={
                            "name":addExpense,
                        }
                        mutate(newDis);
                        setAddExpense('');
                        setIsOpen(false);
                    }}>اضافه مصروف جديد</button>
                    <button className={classes.btn} type="button" onClick={()=>setIsOpen(false)}>اغلاق</button>
                </div>}
            </div>
            <div  className={classes.formGroup}>
                <label htmlFor="name" className={classes.label}>
                    اسم المصروف:
                </label>
                <FormRow error={errors?.expenseName?.message}>
                    <input className={classes.input}
                    type="text"
                    id="name"
                    disabled={isAddingExpense}
                    {...register("expenseName", { required: "ادخل اسم المصروف",
                     })}
                    />
                </FormRow>
                 
                {/* {errors?.expenseName?.message&& <Error>ادخل اسم المريض</Error>} */}
                {/* </FormRow> */}
            </div>
            
            <div  className={classes.formGroup}>
            <label htmlFor="date" className={classes.label}>
                    التاريخ:
                </label>
                <ReactDatePicker  className={classes.input} id="date" selected={startDate} onChange={(date) => setStartDate((date))}  />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="notes" className={classes.label}>
                    ملاحظات:
                </label>
                <textarea  disabled={isAddingExpense} id="notes" className={classes.textarea} {...register('notes')} />
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
                    disabled={isAddingExpense}
                    {...register("price", { required: "ادخل سعر ألمصروف",
                    // min:{
                    //     value:50,
                    //     message:"السعر يجب ان يزيد عن 50 جنيه",

                    // }
                 })}
                    />
                </FormRow>
                {/* {errors?.price?.message&& <Error>ادخل احا المصروف</Error>} */}
            </div> 
            <div className={classes.formGroup}>
                <label htmlFor="discount" className={classes.label}>
                        الخصم:
                </label>  
                <FormRow error={errors?.discount?.message}>
                    <input className={classes.input}
                    type="number"
                    id="discount"
                    disabled={isAddingExpense}
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
                    disabled={isAddingExpense}
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
                <button className={classes.button}>اضافه</button>
            </div>
                
        </form>
    );
}
export default NewExpense;