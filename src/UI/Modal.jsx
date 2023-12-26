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
import { MdAccountCircle, MdMonetizationOn } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Box, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MainNav from "./MainNav";
import { RiDeleteBin5Fill, RiDeleteBin6Line } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";

export function ConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content} style={{ width: "30%" }}>
        <div className={classes.confirmHeading}>
          <span className={classes.confirmIcon}>
            <GiConfirmed />
          </span>
          <p>هل تريد انهاء هذا الحجز </p>
        </div>
        <div className={classes.actions} style={{ marginTop: "1rem" }}>
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
        <div className={classes.deleteContent}>
          <div className={classes.deleteHeading}>
            <span className={classes.deleteIcon}>
              <RiDeleteBin6Line />
            </span>
            <div>
              <h2>تأكيد الحذف</h2>
              <p>
                هل انت متأكد من حذف هذا الحجز؟ لا يمكن التراجع عن هذا الاجراء
                فيما بعد{" "}
              </p>
            </div>
          </div>
          <div className={classes.actions}>
            <button className={classes.cncl} onClick={onCancel}>
              الغاء
            </button>
            <button className={classes.delete} onClick={onConfirm}>
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export function PriceDetails({ isOpen, onCancel, item }) {
  if (!isOpen) {
    return null;
  }
  console.log(item);

  return ReactDOM.createPortal(
    <div className={classes.modalPrice}>
      <div className={classes.contentPrice}>
        <div className={classes.priceInfo}>
          <h2 className={classes.priceHeading}>
            <span style={{ color: "steelblue" }}>
              {" "}
              <MdMonetizationOn />
            </span>
            تفاصيل السعر
          </h2>

          <div className={classes.price}>
            <h3>320 LE</h3>
            <h3 className={classes.discount}>{item.price} LE</h3>
            {/* <label>خصم 80 جنيه</label> */}
          </div>

          <div>
            <h3>المدفوع:{item.paidAmount}</h3>
            <h3>الباقي:{item.price - item.discount - item.paidAmount}</h3>
          </div>

          <button className={classes.pricebtn} onClick={onCancel}>
            اغلاق
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function AddPatientModal({ isOpen, onCancel, onConfirm }) {
  const [isClicked, setIsClicked] = useState(false);
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
    <div
      className={`${classes.modal} ${isClicked ? classes.exitAnimation : ""}`}
    >
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
          {/* <div className={classes.formGroup}>
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
          </div> */}

          <div className={classes.mgBottom}>
            {" "}
            <TextField
              id="standard-basic"
              label="الاسم"
              variant="standard"
              {...register("name", { required: "ادخل اسم المريض" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              inputProps={{ style: { fontSize: "2rem" } }}
              InputLabelProps={{
                style: { fontSize: "2rem" },
              }}
            />
          </div>

          {/* <div className={classes.formGroup}>
            <label htmlFor="phone" className={classes.label}>
              رقم الهاتف
            </label>
            <input
              type="text"
              id="phone"
              className={classes.input}
              {...register("phone")}
            />
          </div> */}

          <div className={classes.mgBottom}>
            <TextField
              id="phone"
              label="رقم الهاتف"
              variant="standard"
              {...register("phone")}
              inputProps={{ style: { fontSize: "2rem" } }}
              InputLabelProps={{ style: { fontSize: "2rem" } }}
            />
          </div>
          <div className={classes.ageGender}>
            {/* <div className={classes.formGroup}>
              <label htmlFor="age" className={classes.label}>
                السن
              </label>
              <input
                type="number"
                id="age"
                className={classes.input}
                {...register("age")}
              />
            </div> */}

            <div className={classes.mgBottom}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="age"
                  label="السن"
                  variant="standard"
                  {...register("age")}
                  inputProps={{
                    style: { fontSize: "2rem" },
                  }}
                  InputLabelProps={{ style: { fontSize: "2rem" } }}
                />
              </Box>
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
              ملاحظات
            </label>
            <textarea
              id="notes"
              className={classes.textarea}
              {...register("notes")}
            />
          </div>
          <div className={classes.btns}>
            <button
              className={classes.cncl}
              type="button"
              onClick={() => {
                setIsClicked(true);
                onCancel();
              }}
            >
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

export function SidebarModal({ isOpen, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.sidebarModal}>
      <div className={classes.sidebarContent}>
        <div className={classes.sidebar__heading}>
          <h2>القائمه</h2>
          <div style={{ fontSize: "2.6rem" }} onClick={onCancel}>
            &times;
          </div>
        </div>
        <MainNav modal={true} onClick={onCancel} />
      </div>
    </div>,
    document.body
  );
}

export default DeleteConfirmationModal;
