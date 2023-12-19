import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPatient } from "../services/apiPatients";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import { usePatient } from "../contexts/PatientContext";
import { useNavigate } from "react-router-dom";
import { HiMiniUserPlus } from "react-icons/hi2";

export function ConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        {/* <h2>انهاء الحجز</h2>
        <hr/> */}
        <p>هل تريد انهاء هذا الحجز </p>
        <div className={classes.actions}>
          <button className={classes.cncl} onClick={onCancel}>
            لا
          </button>
          <button className={classes.cnfrm} onClick={onConfirm}>
            نعم
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>تأكيد الحذف</h2>
        <hr />
        <p>
          هل انت متأكد من حذف هذا الحجز؟ لا يمكن التراجع عن هذا الاجراء فيما بعد{" "}
        </p>
        <div className={classes.actions}>
          <button className={classes.cncl} onClick={onCancel}>
            الغاء
          </button>
          <button className={classes.delete} onClick={onConfirm}>
            حذف
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
export function AddPatientModal({ isOpen, onCancel, onConfirm }) {
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
    // console.log("hereeee");
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        <div className={classes.heading}>
          <span style={{ color: "#0077cf" }}>
            <HiMiniUserPlus />
          </span>
          <h2>تسجيل مريض جديد</h2>
          <div className={classes.closeIcon} onClick={onCancel}>
            &times;
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.formGroup}>
            <label htmlFor="name" className={classes.label}>
              الاسم
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
              رقم الهاتف
            </label>
            <input
              type="text"
              id="phone"
              className={classes.input}
              {...register("phone")}
            />
          </div>
          <div className={classes.ageGender}>
            <div className={classes.formGroup}>
              <label htmlFor="age" className={classes.label}>
                السن
              </label>
              <input
                type="number"
                id="age"
                className={classes.input}
                {...register("age")}
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.label}>النوع</label>
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
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="notes" className={classes.label}>
              ملاجظات
            </label>
            <textarea
              id="notes"
              className={classes.textarea}
              {...register("notes")}
            />
          </div>
          <div className={classes.btns}>
            <button className={classes.cncl} type="button" onClick={onCancel}>
              {" "}
              الغاء
            </button>
            <button type="submit" className={classes.button}>
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default DeleteConfirmationModal;
