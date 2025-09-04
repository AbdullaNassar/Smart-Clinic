import styled from "styled-components";
import classes from "./NewBooking.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { TbClockPlus } from "react-icons/tb";

import FormRow from "../../../shared/components/ui/FormRow";
import Spinner from "../../../shared/components/ui/Spinner";
import Button from "../../../shared/components/ui/Button";
import { usePatient } from "../../patient/context/PatientContext";
import { AddPatientModal } from "../../../shared/components/ui/Modal";
import usePatients from "../../patient/hooks/usePatients";
import useRevenues from "../../ExpensesRevenues/hooks/useRevenues";
import useCreateBooking from "../hooks/useCreateBooking";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function NewBooking() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      discount: 0,
    },
  });
  const { isAddPatientModal, closePatientModal } = usePatient();

  /// Data fetching layer
  const { isLoading, patients, error } = usePatients();
  const { revenue: revenueType, loading, error: errorRevenues } = useRevenues();
  const { isAdding, mutate } = useCreateBooking();

  // Loading/error handling
  if (isLoading || loading) return <Spinner />;
  if (error || errorRevenues)
    return <ErrorFallback error={error?.message || errorRevenues?.message} />;

  function onSubmit(data) {
    setStartDate((startDate) => startDate.setHours(startDate.getHours() + 1));
    data.date = startDate;
    data.status = "لم يتم الدخول للدكتور";
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);
    data.patientID = Number(data.patientID);
    delete data.patientName;
    mutate(data);
    navigate(-1);
  }

  function onCancel() {
    closePatientModal();
  }

  const handleChangeName = (e) => {
    const selectedName = e.target.value;
    const selectedPatient = patients.find((p) => p.name === selectedName);
    if (selectedPatient) {
      setValue("patientID", selectedPatient.id);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.heading}>
        <span style={{ color: "#0077cf" }}>
          <TbClockPlus />
        </span>
        <h2 className="text-4xl">حجز موعد</h2>
      </div>
      <div className={classes.info}>
        <div>
          <div className={classes.formGroup}>
            <label htmlFor="name" className={classes.label}>
              المريض
            </label>
            <input
              id="name"
              className={classes.input}
              type="text"
              list="names"
              placeholder="ادخل اسم المريض..."
              {...register("patientName", {
                required: "ادخل اسم المريض",
                onChange: handleChangeName,
              })}
            />

            <datalist id="names">
              {patients &&
                patients.map((patient) => (
                  <option
                    value={patient.name}
                    key={patient.id}
                    data-id={patient.id}
                  >
                    {patient.name}
                  </option>
                ))}
            </datalist>
            <input type="hidden" {...register("patientID")} />
            {errors?.patientName?.message && <Error>ادخل اسم المريض</Error>}
          </div>
          <div className={classes.dateType}>
            <div className={classes.formGroup}>
              <label htmlFor="type" className={classes.label}>
                نوع الحجز
              </label>
              <select className={classes.input} id="type" {...register("type")}>
                {revenueType !== undefined &&
                  revenueType.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
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
        <button disabled={isAdding} className={classes.button}>
          حجز
        </button>
      </div>

      <AddPatientModal isOpen={isAddPatientModal} onCancel={onCancel} />
    </form>
  );
}
export default NewBooking;
