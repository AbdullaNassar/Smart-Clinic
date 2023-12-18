import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createBooking } from "../../services/apiBooking";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRow from "../../UI/FormRow";
import Spinner from "../../UI/Spinner";
import Button from "../../UI/Button";
import classes from "./NewBooking.module.css";
// import { Button } from "@mui/material";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { addNewRevenue, getRevenues } from "../../services/apiRevenues";
import { TbClockPlus } from "react-icons/tb";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function NewBooking() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [isOpenType, setIsopenType] = useState(false);
  const [newType, setNewType] = useState(null);

  console.log(startDate);
  const egyptTimezone = "Africa/Cairo";
  const egyptDate = startDate.toLocaleString("en-US", {
    timeZone: egyptTimezone,
  });
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const {
    isLoading: loadingExpensesType,
    data: revenueType,
    error: errorRevenuesType,
  } = useQuery({
    queryKey: ["Revenues"],
    queryFn: getRevenues,
  });

  const queryClient = useQueryClient();
  const { isLoading: isAddingType, mutate: mutateType } = useMutation({
    mutationFn: addNewRevenue,
    onSuccess: () => {
      toast.success("تمت الاضافه");
      queryClient.invalidateQueries({
        queryKey: ["Revenues"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { register, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      discount: 0,
    },
  });
  const { errors } = formState;

  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("تمت اضافة حجز جديد بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    // console.log(startDate);
    setStartDate((startDate) => startDate.setHours(startDate.getHours() + 1));
    // console.log(startDate);
    data.date = startDate;
    // setStartDate(startDate=>startDate.setHours(startDate.getHours() - 2));

    data.status = "لم يتم الدخول للدكتور";
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);

    console.log(data);
    mutate(data);
    navigate(-1);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.heading}>
        <span style={{ color: "#0077cf" }}>
          <TbClockPlus />
        </span>
        <h2>حجز موعد</h2>
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

            <Link to="/newPatient" className={classes.lnk}>
              <span>
                <FaPersonCirclePlus />
              </span>
              {/* <BsFillPersonPlusFill/> */}
              {/* <Button variant="contained">+</Button> */}
            </Link>
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
              <label className={classes.label}>المبلغ الاجمالي</label>
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
        <Button variation="secondary" onClick={() => navigate(-1)}>
          الغاء
        </Button>
        <button className={classes.button}>حجز</button>
      </div>
    </form>
  );
}
export default NewBooking;
