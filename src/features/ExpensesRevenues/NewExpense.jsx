import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import {
  addNewExpense,
  getExpenses,
  updateInventoryItem,
  updateQuantity,
} from "../../services/apiExpenses";
import { useForm } from "react-hook-form";
import { addNewClinicExpenses } from "../../services/apiMyExpenses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import classes from "./NewExpense.module.css";
import FormRow from "../../UI/FormRow";
import Button from "../../UI/Button";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function NewExpense() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [addExpense, setAddExpense] = useState("");

  const { register, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      discount: 0,
    },
  });

  const {
    isAddingExpense: loadingExpenses,
    data: expenses,
    error: errorExpenses,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getExpenses,
  });
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewExpense,
    onSuccess: () => {
      toast.success("تمت الاضافه");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log(expenses);

  const { isLoading: isAddingExpense, mutate: mutateMyExpense } = useMutation({
    mutationFn: addNewClinicExpenses,
    onSuccess: () => {
      toast.success("تمت اضافه عمليه شراء جديده بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const mutationStore = useMutation(updateInventoryItem);

  // console.log(expenses);

  const { errors } = formState;

  function onSubmit(data) {
    const [variable1, variable2] = data.expenseGroup.split("&");
    data.expenseType = variable1;
    // data.id = Number(variable2);

    // startDate.setHours(startDate.getHours() + 2);
    data.date = startDate;
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.paidAmount = Number(data.paidAmount);
    data.quantity = Number(data.quantity);
    data.isStore = data.isStore === "yes" ? true : false;
    console.log(data);
    // mutateMyExpense(data);

    if (data.isStore === true) {
      const quan = data.quantity;
      // mutationStore.mutate({variable2, data.quantity});
      // mutationStore.mutate({ variable2, quan });
      updateQuantity(variable2, quan, true);
    }
  }
  if (loadingExpenses) return <h2>Loading...</h2>;
  if (errorExpenses) return <h2>Error on loading expenses</h2>;
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
                    <option value={`${item.name}&${item.id}`}>
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
                  // className={classes.btn}
                  type="button"
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

            {/* <div className={classes.formGroup}>
              <label className={classes.label}>اضافه للمخزن</label>
              <div className={classes.radioGroup}>
                <label htmlFor="yes" className={classes.radioButton}>
                  <input
                    type="radio"
                    id="yes"
                    value="yes"
                    {...register("isStore")}
                  />
                  نعم
                </label>

                <label htmlFor="no" className={classes.radioButton}>
                  <input
                    type="radio"
                    id="no"
                    value="no"
                    {...register("isStore")}
                  />
                  لا
                </label>
              </div>
            </div> */}
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
                  message: "can't type negative value",
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
