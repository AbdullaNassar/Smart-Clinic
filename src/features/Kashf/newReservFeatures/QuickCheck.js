import { useState } from "react";
import { useForm } from "react-hook-form";
const initReserv=[

]
function QuickCheck({saveData,data={}}){
    const{register , handleSubmit,reset}=useForm({
        defaultValues:data
    });
    function onSubmit(data){
        saveData("quickCheck",data);
    }

    console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div>
                <label>ضغط الدم</label>
                <input  {...register("pressure")}/>
            </div>
            <div>
                <label>التنفس</label>
                <input  {...register("breathe")} />
            </div>
            <div>
                <label>نبضات القلب</label>
                <input  {...register('heartRate')} />
            </div>
            <div>
                <label>حراره الجسم</label>
                <input {...register('temperture')} />
            </div>
            <div>
                <label>السكر</label>
                <input {...register("diabites")} />
            </div>
            <div>
                <label>الوزن</label>
                <input  {...register("weight")} />
            </div>
            <div>
                <label>عمليات سابقه</label>
                <input  {...register("oldOperations")}/>
            </div>
            <button>حفظ</button>
        </form>
    );
}
export default QuickCheck;