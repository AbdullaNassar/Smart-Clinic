import { useReducer, useState } from "react";
import classes from "./MedicalTest.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";
import { addNewMedicalTest, getMedicalTests } from "../../../services/apiMedicalTest";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

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
            toast.success("تمت اضافه تحليل جديد الي القائمة");
            queryClient.invalidateQueries({
                queryKey:['medicalTests']
            }); 
            
        },
        onError:(err)=>toast.error(err.message),
    });
    // console.log(medicalTests);
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
            toast.error('اختر تحليل من القائمه');
            return;
        }
        

        if( !myMedicalTests.some(item => item.name === state.name )){
            setMyMedicalTests(prev=>[...prev,state]);
            dispatch({type:"reset"});
        }
        else (toast.error('تمت الاضافه من قبل'))
    }
    // console.log(newMedicalTest);
    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className={classes.row}>
                <label>اختر التحليل:</label>
                <input value={state.name} type="text" list="names" placeholder="التحاليل..."  onChange={(e)=>{
                    // console.log(e.target.value);
                    dispatch({type:"name",payload: e.target.value})
                }} />
                <datalist id="names"  >
                    {medicalTests&&medicalTests.map(item=><option >
                        {item.name}
                    </option>)}
                </datalist>
               
                {!isOpen &&<button type="button" onClick={()=>setIsOpen(true)}>+</button>}
                {isOpen &&<div>
                    <label >اسم التحليل:</label>
                    <input value={newMedicalTest} onChange={(e)=>setNewMedicalTest(e.target.value)}/>
                    <button  type="button" onClick={()=>{
                        if(newMedicalTest===''){
                            toast.error('ادخل اسم المراد اضافته الي القائمه');
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
                </div>

                <div className={classes.row}>
                    <label>ملاحظات:</label>
                    <input value={state.notes} onChange={(e)=>{
                         dispatch({type:"notes", payload: e.target.value});
                    }}  /> 
                </div>
                <button className={`${classes.button} ${classes.addBtn}`}>اضافه</button>
                
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
                    <td><span className="spn" onClick={()=>{
                       setMyMedicalTests(prev=>prev.filter(x=>x!==item))
                    }}><FaDeleteLeft/></span></td>
                </tr>)}
            </table>
            <button  className={classes.button} onClick={(e)=>{
                saveData("medicalTests",myMedicalTests)
            }}>حفظ</button>
        </div>
    );
}
export default MedicalTests;