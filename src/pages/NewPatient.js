import { useState } from "react";
import { usePatient } from "../contexts/PatientContext";
import { useNavigate } from "react-router-dom";
import classes from "./NewPatient.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../services/apiBooking";
import { createNewPatient } from "../services/apiPatients";
function NewPatient(){
    const{register , handleSubmit,reset}=useForm();
    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: createNewPatient,
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
    return(
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.item}>
                <label>name</label>
                <input id="name" {...register("name")} />
            </div>
            <div  className={classes.item}>
                <label >phone</label>
                <input id="phone" {...register("phone")} type="number"/>
            </div>
            <div  className={classes.item}>
                <label>age</label>
                <input id="age" {...register("age")} type="number"/>
            </div>
            <div  className={classes.item}>
                <label>gender</label>
                <input id="gender" {...register("gender")} type="text" />
            </div>
            <div >
                <label>ملاحظات</label>
                <textarea id="notes" {...register("notes")} />
            </div>
            <button>تسجيل مريض جديد</button>
        </form>
    );
}
export default NewPatient;