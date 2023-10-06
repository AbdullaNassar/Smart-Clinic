import { useReducer, useState } from "react";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";
import { addNewMedicine, getMedicines } from "../../../services/apiMedicine";

const initState={name:"", notes:""};
function OpposingMedications({saveData}){
    const[isOpen,setIsOpen]=useState(false);
    const[newMedicine,setNewMedicine]=useState('');
    const[myMedicine,setMyMedicine]=useState([]);

    const {isLoading, data:medicine, error}= useQuery({
        queryKey:['medicine'],
        queryFn: getMedicines,
    })


    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewMedicine,
        onSuccess: ()=>{
            alert("new medicine added succsfully");
            queryClient.invalidateQueries({
                queryKey:['medicine']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(medicine);
    function reducer(state,action){
        switch(action.type){
            case "name":
                return {...state, name: action.payload};
            case "notes":
                return {...state , notes: action.payload};
            default:
                return initState;
        }
    }
    const[state,dispatch]=useReducer(reducer,initState);
    function onSubmit(e){
        e.preventDefault();
        if(!state.name) {
            alert('add medidcine');
            return;
        }
        setMyMedicine(prev=>[...prev,state]);
    }
    // console.log(newMedicine);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>اختر الدواء</label>
                <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&medicine.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الدواء</label>
                    <input value={newMedicine} onChange={(e)=>setNewMedicine(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newMedicine===''){
                            alert('ادخل اسم  الدواء');
                            return;
                        }
                        const newMed={
                            "name":newMedicine,
                        }
                        mutate(newMed);
                        setNewMedicine('');
                        setIsOpen(false);
                    }}>اضافه دواء جديد</button>
                    <button  type="button" onClick={()=>setIsOpen(false)}>اغلاق</button>
                </div>}
                <div>
                    <label>ملاحظات</label>
                    <input onChange={(e)=>{
                         dispatch({type:"notes", payload: e.target.value});
                    }}  /> 
                </div>
                <button>اضافه</button>
                
            </form>
            <table className={classes.customers}>
                <tr>
                    <th>اسم الدواء المعارض</th>
                    <th>ملاحظات</th>
                </tr>
                {myMedicine.map((item,idx)=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                </tr>)}
            </table>
            <button onClick={(e)=>{
                saveData("oppositeMedicines",myMedicine)
            }}>حفظ</button>
        </div>
    );
}
export default OpposingMedications;
