import classes from "./Diagnosis.module.css";
import { useForm } from "react-hook-form";

function Diagnosis({ saveData, data = {} }) {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  function onSubmit(daaata) {
    saveData("diagnosis", daaata);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.all}>
      <div className={classes.row}>
        <label>التشخيص:</label>
        <textarea {...register("details")} />
      </div>
      <div className={classes.row}>
        <label>نصائح للمريض:</label>
        <textarea style={{ height: "60px" }} {...register("advices")} />
      </div>
      <div className={classes.row}>
        <label>ملاحظات:</label>
        <input {...register("notes")} />
      </div>
      <button className={classes.button}>حفظ</button>
    </form>
  );
}
export default Diagnosis;
