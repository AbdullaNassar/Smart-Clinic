import { useReducer, useState } from "react";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewXray, getXrays } from "../../../services/apiXrays";

const initState={name:"", notes:""};
function Xrays({saveData}){
    const[isOpen,setIsOpen]=useState(false);
    const[newXray,setNewXray]=useState('');
    const[myXrays,setMyXrays]=useState([]);

    const {isLoading, data:xrays, error}= useQuery({
        queryKey:['xrays'],
        queryFn: getXrays,
    })

    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewXray,
        onSuccess: ()=>{
            alert("new Xray added succsfully");
            queryClient.invalidateQueries({
                queryKey:['xrays']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(xrays);
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
            alert('add Xray');
            return;
        }
        setMyXrays(prev=>[...prev,state]);
    }
    // console.log(newXray);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>اختر الاشعه</label>
                <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&xrays.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الاشعه</label>
                    <input value={newXray} onChange={(e)=>setNewXray(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newXray===''){
                            alert('ادخل اسم  الاشعه');
                            return;
                        }
                        const newXr={
                            "name":newXray,
                        }
                        mutate(newXr);
                        setNewXray('');
                        setIsOpen(false);
                    }}>اضافه اشعه جديده</button>
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
                    <th>اسم الاشعه</th>
                    <th>ملاحظات</th>
                </tr>
                {myXrays.map((item,idx)=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                </tr>)}
            </table>
            <button onClick={(e)=>{
                saveData("xrays",myXrays)
            }}>حفظ</button>
        </div>
    );
}
export default Xrays;