import styled from "styled-components";
import classes from "./UpdateBooking.module.css";
import ReactDatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TbClockPlus } from "react-icons/tb";

import FormRow from "../../../shared/components/ui/FormRow";
import Spinner from "../../../shared/components/ui/Spinner";
import Button from "../../../shared/components/ui/Button";
import useBookingInfo from "../hooks/useBookingInfo";
import useUpdateBooking from "../hooks/useUpdateBooking";
import useRevenues from "../../ExpensesRevenues/hooks/useRevenues";
import usePatients from "../../patient/hooks/usePatients";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";
import { AddPatientModal } from "../../../shared/components/ui/Modal";
import { usePatient } from "../../patient/context/PatientContext";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateBooking() {
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const { isAddPatientModal, closePatientModal } = usePatient();
  const navigate = useNavigate();

  /// Data fetching layer
  const { bookingData, loadingBooking, errorBookingInfo } = useBookingInfo(id);
  const updateBookingMutation = useUpdateBooking();
  const {
    revenue: revenueType,
    loading: loadingRevenuesType,
    error: errorRevenuesType,
  } = useRevenues();
  const { patients, isLoading, error } = usePatients();

  const {
    register,
    formState: errors,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: bookingData,
  });

  // Loading/error handling
  if (isLoading || loadingRevenuesType || loadingBooking) return <Spinner />;
  if (error || errorRevenuesType || errorBookingInfo) return <ErrorFallback />;

  function onSubmit(data) {
    data.date = startDate;
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);
    updateBookingMutation.mutate(data);
    navigate(-1);
  }
  function onCancel() {
    closePatientModal();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.heading}>
        <span style={{ color: "#0077cf" }}>
          <TbClockPlus />
        </span>
        <h2>تعديل بيانات الحجز</h2>
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
              {...register("patientID", { required: "ادخل اسم المريض" })}
            />

            <datalist id="names">
              {patients &&
                patients.map((patient) => (
                  <option
                    key={patient.id}
                    value={patient.id}
                    data-id={patient.id}
                  >
                    {patient.name}
                  </option>
                ))}
            </datalist>

            {errors?.patientID?.message && <Error>ادخل اسم المريض</Error>}
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
        <button className={classes.button}>حفظ</button>
      </div>

      <AddPatientModal isOpen={isAddPatientModal} onCancel={onCancel} />
    </form>
  );
}
export default UpdateBooking;
