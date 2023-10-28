import { useReducer, useState } from "react";
import classes from "./Xrays.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewXray, getXrays } from "../../../services/apiXrays";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

const initState={name:"", notes:""};
function Xrays({saveData, data=[]}){
    const[isOpen,setIsOpen]=useState(false);
    const[newXray,setNewXray]=useState('');
    const[myXrays,setMyXrays]=useState(data);

    const {isLoading, data:xrays, error}= useQuery({
        queryKey:['xrays'],
        queryFn: getXrays,
    })

    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewXray,
        onSuccess: ()=>{
            toast.success("تمت اضافه اشعه جديده للقائمه");
            queryClient.invalidateQueries({
                queryKey:['xrays']
            }); 
            
        },
        onError:(err)=>toast.error(err.message),
    });
    // console.log(xrays);
    function reducer(state,action){
        switch(action.type){
            case "name":
                return {...state, name: action.payload};
            case "notes":
                return {...state , notes: action.payload};
            case "reset": 
                return initState;
            default:
                return initState;
        }
    }
    const[state,dispatch]=useReducer(reducer,initState);
    function onSubmit(e){
        e.preventDefault();
        if(!state.name) {
            toast.error('اختر اشعه من القائمه');
            return;
        }
        if( !myXrays.some(item => item.name === state.name )){
            setMyXrays(prev=>[...prev,state]);
            dispatch({type:"reset"});
        }
        else (toast.error('تمت الاضافه من قبل'))
        
    }
    // console.log(newXray);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className={classes.row}>
                <label>اختر الاشعه:</label>
                <input value={state.name} type="text" list="names" placeholder="الاشعات ..."  onChange={(e)=>{
                    // console.log(e.target.value);
                    dispatch({type:"name",payload: e.target.value})
                }} />
                <datalist id="names"  >
                    {xrays&&xrays.map(item=><option >
                        {item.name}
                    </option>)}
                </datalist>
                
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الاشعه</label>
                    <input value={newXray} onChange={(e)=>setNewXray(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newXray===''){
                            toast.error('ادخل اسم  الاشعه');
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
                </div>

                <div className={classes.row}>
                    <label>ملاحظات</label>
                    <input value={state.notes} onChange={(e)=>{
                         dispatch({type:"notes", payload: e.target.value});
                    }}  /> 
                </div>
                <button  className={`${classes.button} ${classes.addBtn}`}>اضافه</button>
                
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
                    <td><span className="spn" onClick={()=>{
                       setMyXrays(prev=>prev.filter(x=>x!==item))
                    }}><FaDeleteLeft/></span></td>
                </tr>)}
            </table>
            <button  className={classes.button}  onClick={(e)=>{
                saveData("xrays",myXrays)
            }}>حفظ</button>
        </div>
    );
}
export default Xrays;