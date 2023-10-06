import { useReducer, useState } from "react";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewXray, getXrays } from "../../../services/apiXrays";
import { addNewFood, getFood } from "../../../services/apiFood";

const initState={name:"", notes:"",isOk:true};
function Food({saveData}){
    const[isOpen,setIsOpen]=useState(false);
    const[newFood,setNewFood]=useState('');
    const[myFood,setMyfood]=useState([]);

    const {isLoading, data:foods, error}= useQuery({
        queryKey:['foods'],
        queryFn: getFood,
    })

    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewFood,
        onSuccess: ()=>{
            alert("new food added succsfully");
            queryClient.invalidateQueries({
                queryKey:['foods']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(foods);
    function reducer(state,action){
        switch(action.type){
            case "name1":
                return {...state,   isOk:true,name: action.payload};
            case "name2":
                return {...state,   isOk:false,name: action.payload};
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
            alert('add food');
            return;
        }
        setMyfood(prev=>[...prev,state]);
    }

    // console.log(newFood);
    return (
        <div>
            <div>
            <form onSubmit={onSubmit} >
                <label>اختر الطعام</label>
                <select onChange={(e)=>{
                    dispatch({type:"name1", payload: e.target.value});
                }} >
                    {!isLoading&&foods.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الطعام</label>
                    <input value={newFood} onChange={(e)=>setNewFood(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newFood===''){
                            alert('ادخل اسم  الطعام');
                            return;
                        }
                        const newFo={
                            "name":newFood,
                        }
                        mutate(newFo);
                        setNewFood('');
                        setIsOpen(false);
                    }}>اضافه طعام جديد</button>
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
            <form onSubmit={onSubmit} >
                <label>اختر الطعام</label>
                <select onChange={(e)=>{
                    dispatch({type:"name2", payload: e.target.value});
                }} >
                    {!isLoading&&foods.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select>
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم الطعام</label>
                    <input value={newFood} onChange={(e)=>setNewFood(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newFood===''){
                            alert('ادخل اسم  الطعام');
                            return;
                        }
                        const newFo={
                            "name":newFood,
                        }
                        mutate(newFo);
                        setNewFood('');
                        setIsOpen(false);
                    }}>اضافه طعام جديد</button>
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
            
            </div>
            <table className={classes.customers}>
                <tr>
                    <th>اسم الطعام/الشراب</th>
                    <th>ملاحظات</th>
                    <th>مسموح/ممنوع</th>
                </tr>
                {myFood.sort((a, b) => {
                if (a.isOk && !b.isOk) {
                    return -1; // a should come before b
                } else if (!a.isOk && b.isOk) {
                    return 1; // b should come before a
                } else {
                    return 0; // preserve the original order
                }
                }).map((item,idx)=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                    <td>{item.isOk?"مسموح":"ممنوع"} </td>
                </tr>)}
            </table>
            <button onClick={(e)=>{
                saveData("foods",myFood)
            }}>حفظ</button>
        </div>
    );
}
export default Food;