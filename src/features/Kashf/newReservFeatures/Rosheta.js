import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewMedicine, getMedicines } from "../../../services/apiMedicine";
import { useForm } from "react-hook-form";
import { useReducer, useState } from "react";
import classes from "./Rosheta.module.css";
const initRosheta=[
    {
        name:"aspiren",
        times:"3 times",
        notes:"before eat"
    },
];
const initState={name:"", times:"0" , notes:""};
function Rosheta({saveData,data=[]}){
    const[isOpen,setIsOpen]=useState(false);
    const[newMedicine,setNewMedicine]=useState('');
    const {isLoading, data:medicines, error}= useQuery({
        queryKey:['medicines'],
        queryFn: getMedicines,
    })

    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewMedicine,
        onSuccess: ()=>{
            alert("new medicine added succsfully");
            queryClient.invalidateQueries({
                queryKey:['medicines']
            }); 
        },
        onError:(err)=>alert(err.message),
    });
    const[rosheta,setRosheta]=useState(data);

    function reducer(state,action){
        switch(action.type){
            case "name":
                return {...state, name: action.payload};
            case "times":
                return {...state, times: action.payload};
            case "notes":
                return {...state , notes: action.payload};
            default:
                return initState;
        }
    }
    const[state,dispatch]=useReducer(reducer,initState);
    const{register , handleSubmit,reset}=useForm();
    // console.log(state);
    function onSubmit(e){
        e.preventDefault();
        if(!state.name || !state.times) {
            alert('add medicine and times');
            return;
        }
        setRosheta((prev)=>[...prev,state]);
    }
    // console.log(rosheta);
    if(isLoading) return <h2>Loading...</h2>
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>اختر الدواء</label>
                    <select onChange={(e)=>{
                        dispatch({type:"name", payload: e.target.value});
                    }} >
                        {!isLoading &&medicines.map(item=>
                        <option value={item.name}>
                            {item.name}
                        </option>)}
                    </select>
                    <button type="button" onClick={(e)=>setIsOpen(true)}>+</button>
                    {isOpen&&<div>
                        <label>ادخل اسم الدواء</label>
                        <input value={newMedicine} onChange={(e)=>setNewMedicine(e.target.value)}/>
                        <button type="button" onClick={(e)=>{
                            if(newMedicine===''){
                                alert('ادخل اسم الدواء');
                                return;
                            }
                            const newMed={
                                "name":newMedicine,
                            }
                            mutate(newMed);
                            setNewMedicine('');
                            setIsOpen(false);
                        }}>اضافه</button>
                        <button type="button" onClick={(e)=>setIsOpen(false)}>اغلاق</button>
                    </div>}
                </div>
                <div>
                    <div>
                        <label>الجرعه</label>
                        <input onChange={(e)=>{
                            dispatch({type:"times",payload:e.target.value})
                        }}/>
                    </div>
                    
                    <div>
                    <label>ملاحظات</label>
                    <input onChange={(e)=>{
                        dispatch({type:"notes", payload:e.target.value})
                    }}/>
                    
                    </div>
                    <button>اضافه</button>
                    
                    
                </div>
                

            </form>
            <table className={classes.customers}>
                <tr>
                    <th>اسم الدواء</th>
                    <th>الجرعه</th>
                    <th>ملاحظات</th>
                </tr>
                {rosheta.map((item,idx)=>
                <tr>
                    
                    <td>{item.name} </td>
                    <td>{item.times} </td>
                    <td>{item.notes} </td>
                   
                    
                </tr>)}
               
            </table>
            <button onClick={()=>{
                saveData("rosheta",rosheta);
            }}>حفظ</button>
            
        </div>
    );
}
export default Rosheta;