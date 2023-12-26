import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createBooking,
  getbookingInfo,
  updateSpecficBooking,
} from "../../services/apiBooking";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRow from "../../UI/FormRow";
import Spinner from "../../UI/Spinner";
import Button from "../../UI/Button";
import classes from "./UpdateBooking.module.css";

import { FaPersonCirclePlus } from "react-icons/fa6";
import { AddPatientModal } from "../../UI/Modal";
import { usePatient } from "../../contexts/PatientContext";
import { TbClockPlus } from "react-icons/tb";
import { getRevenues } from "../../services/apiRevenues";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateBooking() {
  const { isAddPatientModal, closePatientModal, openPatientModal } =
    usePatient();
  function onCancel() {
    closePatientModal();
  }

  const { id } = useParams();
  console.log(id);
  const queryClient = useQueryClient();

  const {
    data: bookingData,
    isLoading: LoadingBooking,
    error: errorBookingInfo,
  } = useQuery(["bookingInfo", id], () => getbookingInfo(id));
  console.log(bookingData);

  const updateBookingMutation = useMutation(
    (updatedData) => updateSpecficBooking(id, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["patients"],
        });

        toast.success("تم تعديل بيانات الكشف بنجاح!");
      },
      onError: (error) => {
        toast.error(`خطأ في تعديل بيانات الكشف: ${error.message}`);
      },
    }
  );

  const {
    isLoading: loadingExpensesType,
    data: revenueType,
    error: errorRevenuesType,
  } = useQuery({
    queryKey: ["Revenues"],
    queryFn: getRevenues,
  });

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate);
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const { register, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: bookingData,
  });
  const { errors } = formState;

  if (isLoading) return <Spinner />;
  function onSubmit(data) {
    data.date = startDate;
    // data.status='لم يتم الدخول للدكتور'
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);

    console.log(data);
    updateBookingMutation.mutate(data);
    navigate(-1);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.heading}>
        <span style={{ color: "#0077cf" }}>
          <TbClockPlus />
        </span>
        <h2>تعديل بيانات الحجز</h2>
      </div>
      {/* <hr /> */}
      <div className={classes.info}>
        {/* <p>Current Date in Egypt: {egyptDate}</p> */}
        <div>
          <div className={classes.formGroup}>
            <label htmlFor="name" className={classes.label}>
              المريض
            </label>
            {/* <FormRow error={errors?.patientID?.message}> */}
            <input
              id="name"
              className={classes.input}
              type="text"
              list="names"
              placeholder="ادخل اسم المريض..."
              {...register("patientID", { required: "ادخل اسم المريض" })}
            />

            <datalist id="names">
              {patients &&
                patients.map((patient) => (
                  <option value={patient.id} data-id={patient.id}>
                    {patient.name}
                  </option>
                ))}
            </datalist>

            <span className={classes.lnk} onClick={openPatientModal}>
              <FaPersonCirclePlus />
            </span>
            {/* <BsFillPersonPlusFill/> */}
            {/* <Button variant="contained">+</Button> */}

            {errors?.patientID?.message && <Error>ادخل اسم المريض</Error>}
            {/* </FormRow> */}
          </div>
          <div className={classes.dateType}>
            <div className={classes.formGroup}>
              <label htmlFor="type" className={classes.label}>
                نوع الحجز
              </label>
              <select className={classes.input} id="type" {...register("type")}>
                {revenueType !== undefined &&
                  revenueType.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
              </select>
              {/* {!isOpenType &&<button className={classes.btn} type='button' onClick={()=>setIsopenType(true)}>+</button>} */}
            </div>
            <div>
              <div className={classes.formGroup}>
                <label htmlFor="date" className={classes.label}>
                  تاريخ الحجز
                </label>
                <ReactDatePicker
                  className={classes.input}
                  id="date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
          </div>
          {/* 
          {isOpenType && (
            <div className={classes.formGroup}>
              <label htmlFor="newRev" className={classes.label}>
                ادخل اسم الحجز الجديد:
              </label>
              <input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <button
                className={classes.btn}
                type="button"
                onClick={() => {
                  if (newType === null) {
                    toast.error("ادخل اسم الحجز الجديد");
                  } else {
                    const newDis = {
                      name: newType,
                    };
                    mutateType(newDis);
                    setNewType(null);
                    setIsopenType(false);
                  }
                }}
              >
                اضافه
              </button>
              <button
                className={classes.btn}
                type="button"
                onClick={() => setIsopenType(false)}
              >
                اغلاق
              </button>
            </div>
          )} */}
        </div>

        <div>
          <div className={classes.priceContainer}>
            <div className={classes.formGroup}>
              <label htmlFor="price" className={classes.label}>
                السعر
              </label>
              <FormRow error={errors?.price?.message}>
                <input
                  className={classes.input}
                  type="number"
                  id="price"
                  disabled={isLoading}
                  {...register("price", {
                    required: "ادخل سعر الكشف",
                    min: {
                      value: 50,
                      message: "السعر يجب ان يزيد عن 50 جنيه",
                    },
                  })}
                />
              </FormRow>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="discount" className={classes.label}>
                الخصم
              </label>
              <FormRow error={errors?.discount?.message}>
                <input
                  className={classes.input}
                  type="number"
                  id="discount"
                  disabled={isLoading}
                  {...register("discount", {
                    min: {
                      value: 0,
                      message: "can't type negative value",
                    },
                  })}
                  max={watch("price")}
                />
              </FormRow>
            </div>
            <div className={classes.formGroup}>
              <label className={classes.label}> الاجمالي</label>
              <FormRow>
                <input
                  className={classes.input}
                  value={watch("price") - watch("discount")}
                  type="number"
                  disabled={true}
                />
              </FormRow>
            </div>
          </div>
          <div className={classes.paidContainer}>
            <div className={classes.formGroup}>
              <label htmlFor="paidAmount" className={classes.label}>
                المدفوع
              </label>
              <FormRow error={errors?.paidAmount?.message}>
                <input
                  className={classes.input}
                  type="number"
                  id="paidAmount"
                  disabled={isLoading}
                  {...register("paidAmount", {
                    required: "ادخل المبلغ المدفوع",
                    min: {
                      value: 0,
                      message: "can't type negative value",
                    },
                  })}
                />
              </FormRow>
            </div>

            <div>
              <label className={classes.label}>المتبقي:</label>
              <FormRow>
                <input
                  className={classes.input}
                  value={
                    watch("price") - watch("discount") - watch("paidAmount")
                  }
                  type="number"
                  disabled={true}
                />
              </FormRow>
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.note} ${classes.formGroup}`}>
        <label htmlFor="notes" className={classes.label}>
          ملاحظات
        </label>
        <textarea
          disabled={isLoading}
          id="notes"
          className={classes.textarea}
          {...register("notes")}
        />
      </div>
      <div className={classes.btns}>
        <Button
          type="button"
          className={classes.cncl}
          variation="secondary"
          onClick={() => navigate(-1)}
        >
          الغاء
        </Button>
        <button className={classes.button}>حفظ</button>
      </div>

      <AddPatientModal isOpen={isAddPatientModal} onCancel={onCancel} />
    </form>
  );
}
export default UpdateBooking;
