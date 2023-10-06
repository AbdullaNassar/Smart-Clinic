import { useForm } from "react-hook-form";

function Diagnosis({saveData}){
    const{register , handleSubmit,reset}=useForm();
    function onSubmit(data){
        // console.log(data);
        saveData('diagnosis',data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>تاريخ الكشف</label>
                <data>22/8/2023</data>
            </div>
            <div>
                <label>التشخيص</label>
                <textarea {...register("details")} />
            </div>
            <div>
                <label>نصائح للمريض</label>
                <input {...register("advices")} />
            </div>
            <div>
                <label>ملاحظات</label>
                <input {...register('notes')} />
            </div>
            <button>حفظ</button>
        </form>
    );
}
export default Diagnosis;