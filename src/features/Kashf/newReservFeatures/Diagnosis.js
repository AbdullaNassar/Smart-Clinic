import { useForm } from "react-hook-form";
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