import { useForm } from "react-hook-form";
import classes from "./Diagnosis.module.css";
function Diagnosis({saveData,data={}}){
    const{register , handleSubmit,reset}=useForm({
        defaultValues:data
    });
    // console.log(data);
    function onSubmit(daaata){
        // console.log(daaata);
        saveData('diagnosis',daaata);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           
            <div className={classes.row}>
                <label>التشخيص:</label>
                <textarea {...register("details")} />
            </div>
            <div className={classes.row}>
                <label>نصائح للمريض:</label>
                <textarea style={{height:"60px"}} {...register("advices")} />
            </div>
            <div className={classes.row}>
                <label>ملاحظات:</label>
                <input {...register('notes')} />
            </div>
            <button className={classes.button}>حفظ</button>
        </form>
    );
}
export default Diagnosis;