import { useState } from "react";
import { usePatient } from "../contexts/PatientContext";
import { useNavigate } from "react-router-dom";
import classes from "./NewPatient.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../services/apiBooking";
import { createNewPatient } from "../services/apiPatients";
import toast from "react-hot-toast";
import FormRow from "../UI/FormRow";
function NewPatient() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: createNewPatient,
    onSuccess: () => {
      toast.success("new patient added succsfully");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onSubmit(data) {
    data.age = Number(data.age);
    console.log(data);
    mutate(data);
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formGroup}>
        <label htmlFor="name" className={classes.label}>
          الاسم:
        </label>
        <FormRow error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            className={classes.input}
            {...register("name", { required: "ادخل اسم المريض" })}
          />
        </FormRow>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="phone" className={classes.label}>
          رقم الهاتف:
        </label>
        <input
          type="text"
          id="phone"
          className={classes.input}
          {...register("phone")}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="age" className={classes.label}>
          السن:
        </label>
        <input
          type="number"
          id="age"
          className={classes.input}
          {...register("age")}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.label}>النوع:</label>
        <div className={classes.radioGroup}>
          <label htmlFor="male" className={classes.radioButton}>
            <input
              type="radio"
              id="male"
              value="male"
              {...register("gender")}
            />
            ذكر
          </label>

          <label htmlFor="female" className={classes.radioButton}>
            <input
              type="radio"
              id="female"
              value="female"
              {...register("gender")}
            />
            انثي
          </label>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="notes" className={classes.label}>
          ملاجظات:
        </label>
        <textarea
          id="notes"
          className={classes.textarea}
          {...register("notes")}
        />
      </div>
      <button type="submit" className={classes.button}>
        تسجيل مريض جديد
      </button>
    </form>
  );
}
export default NewPatient;
