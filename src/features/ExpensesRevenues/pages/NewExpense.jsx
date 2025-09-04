import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { updateQuantity } from "../services/apiExpenses";
import classes from "./NewExpense.module.css";
import useExpenses from "../hooks/useExpenses";
import useAddExpense from "../hooks/useAddExpense";
import useAddClinicExpense from "../hooks/useAddClinicExpense";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function NewExpense() {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [addExpense, setAddExpense] = useState("");
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      discount: 0,
    },
  });

  // Data fetching layer
  const { expenses, loadingExpenses, errorExpenses } = useExpenses();
  const { isAdding, mutate } = useAddExpense();
  const { isAddingExpense, mutateMyExpense } = useAddClinicExpense(reset);

  //Loading/error handling
  if (loadingExpenses) return <Spinner />;
  if (errorExpenses) return <ErrorFallback error={errorExpenses?.message} />;

  function onSubmit(data) {
    const [variable1, variable2] = data.expenseGroup.split("&");
    data.expenseType = variable1;
    data.date = startDate;
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);
    data.quantity = Number(data.quantity);
    data.isStore = data.isStore === "yes" ? true : false;

    if (data.isStore === true) {
      const quan = data.quantity;
      updateQuantity(variable2, quan, true);
    }
  }

  return (
    <div className={classes.all}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.heading}>
          {" "}
          <h2>عملية شرائيه</h2>
        </div>
        <div className={classes.customer}>
          <h3 className={classes.customer__heading}>المورد</h3>
          <div className={classes.customer__info}>
            <input
              className={classes.customer__input}
              type="text"
              placeholder="اسم المورد"
              {...register("supplierName")}
            />
            <input
              className={classes.customer__input}
              type="number"
              placeholder="رقم الهاتف"
              {...register("supplierPhone")}
            />
            <input
              className={classes.customer__input}
              type="text"
              placeholder="العنوان"
              {...register("supplierAddress")}
            />
          </div>
        </div>
        <div className={classes.product}>
          <h3 className={classes.product__heading}>المنتج</h3>

          <div className={classes.product__info}>
            <div className={classes.product__nameContainer}>
              <select
                {...register("expenseGroup")}
                className={`${classes.product__input} ${classes.product__name}`}
              >
                {expenses &&
                  expenses.map((item) => (
                    <option key={item.id} value={`${item.name}&${item.id}`}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {!isOpen && (
                <button
                  onClick={() => setIsOpen(true)}
                  className={classes.product__nameBtn}
                >
                  +
                </button>
              )}
            </div>
            {isOpen && (
              <div>
                <label>ادخل نوع المصروف</label>
                <input
                  value={addExpense}
                  onChange={(e) => setAddExpense(e.target.value)}
                />
                <button
                  type="button"
                  disabled={isAdding}
                  onClick={() => {
                    if (addExpense === "") {
                      toast.error("ادخل نوع المصروف");
                      return;
                    }
                    const newDis = {
                      name: addExpense,
                    };
                    mutate(newDis);
                    setAddExpense("");
                    setIsOpen(false);
                  }}
                >
                  اضافه
                </button>
                <button
                  // className={classes.btn}
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  اغلاق
                </button>
              </div>
            )}

            <input
              className={classes.product__input}
              type="number"
              placeholder="الكميه"
              {...register("quantity", { required: "ادخل الكميه" })}
            />

            <div className={classes.product__date}>
              <ReactDatePicker
                className={classes.product__input}
                id="date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <input
              className={classes.product__input}
              type="text"
              placeholder="المبلغ"
              {...register("price", {
                required: "ادخل سعر ألمصروف",
              })}
            />
            <input
              className={classes.product__input}
              type="text"
              placeholder="الخصم"
              disabled={isAddingExpense}
              {...register("discount", {
                min: {
                  value: 0,
                  message: "لا يمكن ادخال قيمة سالبة",
                },
              })}
              max={watch("price")}
            />
            <input
              style={{ border: "none" }}
              className={classes.product__input}
              placeholder="الاجمالي"
              value={watch("price") - watch("discount")}
              type="number"
              disabled={true}
            />
            <input
              className={classes.product__input}
              type="number"
              placeholder="المدفوع"
              disabled={isAddingExpense}
              {...register("paidAmount", {
                required: "ادخل المبلغ المدفوع",
                min: {
                  value: 0,
                  message: "can't type negative value",
                },
              })}
            />
            <input
              className={classes.product__input}
              type="number"
              placeholder="المتبقي"
              disabled={true}
              style={{ border: "none" }}
              value={watch("price") - watch("discount") - watch("paidAmount")}
            />

            <div className={classes.product__radio}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <Typography variant="h6" style={{ fontSize: "18px" }}>
                    اضافة للمخزن
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="yes"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio defaultChecked />}
                    label={
                      <Typography style={{ fontSize: "16px" }}>نعم</Typography>
                    }
                    {...register("isStore")}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label={
                      <Typography style={{ fontSize: "16px" }}>لا</Typography>
                    }
                    {...register("isStore")}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <button className={classes.btn}>تأكيد</button>
      </form>
    </div>
  );
}
export default NewExpense;
