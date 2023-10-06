import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewdisease, getDiseases } from "../../../services/apiDiseases";

const initState={name:"", notes:""};
function OldDiasies({saveData}){
    const[isOpen,setIsOpen]=useState(false);
    const[newDisea,setNewDisea]=useState('');
    const{register , handleSubmit,reset}=useForm();
    const[myDiseas,setMyDiseas]=useState([]);

    const {isLoading, data:diseases, error}= useQuery({
        queryKey:['diseases'],
        queryFn: getDiseases,
    })


    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewdisease,
        onSuccess: ()=>{
            alert("new disease added succsfully");
            queryClient.invalidateQueries({
                queryKey:['diseases']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(diseases);
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
            alert('add disea');
            return;
        }
        setMyDiseas(prev=>[...prev,state]);
    }
    // console.log(newDisea);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>اختر المرض</label>
                <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&diseases.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم المرض</label>
                    <input value={newDisea} onChange={(e)=>setNewDisea(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newDisea===''){
                            alert('ادخل اسم المرض');
                            return;
                        }
                        const newDis={
                            "name":newDisea,
                        }
                        mutate(newDis);
                        setNewDisea('');
                        setIsOpen(false);
                    }}>اضافه مرض جديد</button>
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
                    <th>اسم المرض</th>
                    <th>ملاحظات</th>
                </tr>
                {myDiseas.map((item,idx)=>
                <tr>
                    
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                  
                    
                </tr>)}
               
            </table>
            <button onClick={(e)=>{
                saveData("oldDisease",myDiseas)
            }}>حفظ</button>

              
        </div>
    );
}
export default OldDiasies;