import { useReducer, useState } from "react";
import classes from "./Symptoms.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

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
            toast.success("تمت اضافة عرض مرضي جديد");
            queryClient.invalidateQueries({
                queryKey:['symptoms']
            }); 
            
        },
        onError:(err)=>toast.error(err.message),
    });
    // console.log(symptoms);
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
            toast.error('اختر العرض المرضي من القائمه');
            return;
        }
        if( !mySymptoms.some(item => item.name === state.name )){
            setMysymptoms(prev=>[...prev,state]);
            dispatch({type:"reset"});
        }
        else (toast.error('تمت الاضافه من قبل'))
        
    }
    // console.log(newSymptom);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className={classes.row}>
                <label>اختر العرض المرضي</label>
                <input value={state.name} type="text" list="names" placeholder="الاعراض..."  onChange={(e)=>{
                    // console.log(e.target.value);
                    dispatch({type:"name",payload: e.target.value})
                }} />
                <datalist id="names"  >
                    {symptoms&&symptoms.map(item=><option >
                        {item.name}
                    </option>)}
                </datalist>
              
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
                </div>

                <div  className={classes.row} >
                    <label>ملاحظات</label>
                    <input value={state.notes} onChange={(e)=>{
                         dispatch({type:"notes", payload: e.target.value});
                    }}  /> 
                </div>
                <button className={`${classes.button} ${classes.addBtn}`}>اضافه</button>
                
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
                    <td><span className="spn" onClick={()=>{
                       setMysymptoms(prev=>prev.filter(x=>x!==item))
                    }}><FaDeleteLeft/></span></td>
                </tr>)}
            </table>
            <button  className={classes.button} onClick={(e)=>{
                saveData("symptoms",mySymptoms)
            }}>حفظ</button>
        </div>
    );
}
export default Symptoms;