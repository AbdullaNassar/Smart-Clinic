import { useReducer, useState } from "react";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";
import { addNewMedicalTest, getMedicalTests } from "../../../services/apiMedicalTest";

const initState={name:"", notes:""};
function MedicalTests({saveData,data=[]}){
    const[isOpen,setIsOpen]=useState(false);
    const[newMedicalTest,setNewMedicalTest]=useState('');
    const[myMedicalTests,setMyMedicalTests]=useState(data);

    const {isLoading, data:medicalTests, error}= useQuery({
        queryKey:['medicalTests'],
        queryFn: getMedicalTests,
    })


    const queryClient=useQueryClient();
    const {isLoading:isAdding, mutate}=useMutation({
        mutationFn: addNewMedicalTest,
        onSuccess: ()=>{
            alert("new medicalTest added succsfully");
            queryClient.invalidateQueries({
                queryKey:['medicalTests']
            }); 
            
        },
        onError:(err)=>alert(err.message),
    });
    // console.log(medicalTests);
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
        setMyMedicalTests(prev=>[...prev,state]);
    }
    // console.log(newMedicalTest);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>اختر التحليل</label>
                <input type="text" list="names" placeholder="Search names..."  onChange={(e)=>{
                    // console.log(e.target.value);
                    dispatch({type:"name",payload: e.target.value})
                }} />
                <datalist id="names"  >
                    {medicalTests&&medicalTests.map(item=><option >
                        {item.name}
                    </option>)}
                </datalist>
                {/* <select onChange={(e)=>{
                    dispatch({type:"name", payload: e.target.value});
                }} >
                    {!isLoading&&medicalTests.map(item=>
                    <option value={item.name}>
                        {item.name}
                    </option>)}
                </select> */}
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم العرض</label>
                    <input value={newMedicalTest} onChange={(e)=>setNewMedicalTest(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newMedicalTest===''){
                            alert('ادخل اسم  التحليل');
                            return;
                        }
                        const newSym={
                            "name":newMedicalTest,
                        }
                        mutate(newSym);
                        setNewMedicalTest('');
                        setIsOpen(false);
                    }}>اضافه تحليل جديد</button>
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
                    <th>اسم التحليل</th>
                    <th>ملاحظات</th>
                </tr>
                {myMedicalTests.map((item,idx)=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.notes} </td>
                    <td><button onClick={()=>{
                       setMyMedicalTests(prev=>prev.filter(x=>x!==item))
                    }}>حذف</button></td>
                </tr>)}
            </table>
            <button onClick={(e)=>{
                saveData("medicalTests",myMedicalTests)
            }}>حفظ</button>
        </div>
    );
}
export default MedicalTests;