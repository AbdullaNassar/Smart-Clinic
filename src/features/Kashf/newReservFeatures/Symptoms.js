import { useReducer, useState } from "react";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";

const initState={name:"", notes:""};
function Symptoms({saveData,data=[]}){
    const[isOpen,setIsOpen]=useState(false);
    const[newSymptom,setNewSymptom]=useState('');
    const[mySymptoms,setMysymptoms]=useState(data);

    const {isLoading, data:symptoms, error}= useQuery({
        queryKey:['symptoms'],
        queryFn: getSymptoms,
    })


    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewSymptom,
        onSuccess: ()=>{
            alert("new symptom added succsfully");
            queryClient.invalidateQueries({
                queryKey:['symptoms']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(symptoms);
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
            alert('add symptom');
            return;
        }
        setMysymptoms(prev=>[...prev,state]);
    }
    // console.log(newSymptom);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>اختر العرض المرضي</label>
                <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&symptoms.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم العرض</label>
                    <input value={newSymptom} onChange={(e)=>setNewSymptom(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newSymptom===''){
                            alert('ادخل اسم العرض المرضي');
                            return;
                        }
                        const newSym={
                            "name":newSymptom,
                        }
                        mutate(newSym);
                        setNewSymptom('');
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
                {mySymptoms.map((item,idx)=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                </tr>)}
            </table>
            <button onClick={(e)=>{
                saveData("symptoms",mySymptoms)
            }}>حفظ</button>
        </div>
    );
}
export default Symptoms;