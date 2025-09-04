import classes from "./QickCheck.module.css";
import { useForm } from "react-hook-form";

function QuickCheck({ saveData, data = {} }) {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  function onSubmit(data) {
    saveData("quickCheck", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.all}>
      <div className={classes.row}>
        <label className={classes.lbl}>ضغط الدم:</label>
        <input {...register("pressure")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>التنفس</label>
        <input {...register("breathe")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>نبضات القلب</label>
        <input {...register("heartRate")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>حراره الجسم</label>
        <input {...register("temperture")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>السكر</label>
        <input {...register("diabites")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>الوزن</label>
        <input {...register("weight")} />
      </div>
      <div className={classes.row}>
        <label className={classes.lbl}>عمليات سابقه</label>
        <input {...register("oldOperations")} />
      </div>
      <button className={classes.button}>حفظ</button>
    </form>
  );
}
export default QuickCheck;
