import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewdisease, getDiseases } from "../../../services/apiDiseases";
import SpinnerMini from "../../../UI/SpinnerMini";

const initState={name:"", notes:""};
function OldDiasies({saveData,data=[]}){
    const[isOpen,setIsOpen]=useState(false);
    const[newDisea,setNewDisea]=useState('');
    console.log(data);    
    const{register , handleSubmit,reset}=useForm({
        defaultValues:data
    });
    const[myDiseas,setMyDiseas]=useState(data);

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
    console.log(myDiseas);
    // console.log(newDisea);
    
    return (
        <div>
            <form onSubmit={onSubmit} >
            <label>اختر المرض</label>
           <input type="text" list="names" placeholder="Search names..."  onChange={(e)=>{
            // console.log(e.target.value);
            dispatch({type:"name",payload: e.target.value})
           }} />
                <datalist id="names"  >
                    {diseases&&diseases.map(item=><option >
                        {item.name}
                    </option>)}
                </datalist>
                {/* <label>اختر المرض</label>
                <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&diseases.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select> */}
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
                    <td><button onClick={()=>{
                       setMyDiseas(prev=>prev.filter(x=>x!==item))
                    }}>حذف</button></td>
                    
                </tr>)}
               
            </table>
            <button onClick={(e)=>{
                saveData("oldDisease",myDiseas)
            }}>حفظ</button>
        </div>
    );
}
export default OldDiasies;