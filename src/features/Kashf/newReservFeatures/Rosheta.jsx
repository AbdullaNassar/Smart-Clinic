import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewMedicine, getMedicines } from "../../../services/apiMedicine";
import { useForm } from "react-hook-form";
import { useReducer, useState } from "react";
import classes from "./Rosheta.module.css";
import { IconButton } from "@mui/material";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
const initRosheta = [
  {
    name: "aspiren",
    times: "3 times",
    notes: "before eat",
  },
];
const initState = { name: "", times: "", notes: "" };
function Rosheta({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState("");
  const {
    isLoading,
    data: medicines,
    error,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
  });

  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewMedicine,
    onSuccess: () => {
      alert("new medicine added succsfully");
      queryClient.invalidateQueries({
        queryKey: ["medicines"],
      });
    },
    onError: (err) => alert(err.message),
  });
  const [rosheta, setRosheta] = useState(data);

  function reducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "times":
        return { ...state, times: action.payload };
      case "notes":
        return { ...state, notes: action.payload };
      case "reset":
        return initState;
      default:
        return initState;
    }
  }
  const [state, dispatch] = useReducer(reducer, initState);
  const { register, handleSubmit, reset } = useForm();
  // console.log(state);
  function onSubmit(e) {
    e.preventDefault();
    if (!state.name || !state.times) {
      toast.error("اختر الدواء والجرعه المحدده");
      return;
    }
    if (!rosheta.some((item) => item.name === state.name)) {
      setRosheta((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }
  // console.log(rosheta);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر الدواء:</label>
          <input
            value={state.name}
            type="text"
            list="names"
            placeholder="الادويه..."
            onChange={(e) => {
              // console.log(e.target.value);
              dispatch({ type: "name", payload: e.target.value });
            }}
          />
          <datalist id="names">
            {medicines && medicines.map((item) => <option>{item.name}</option>)}
          </datalist>

          <button type="button" onClick={(e) => setIsOpen(true)}>
            +
          </button>
          {isOpen && (
            <div>
              <label>ادخل اسم الدواء:</label>
              <input
                value={newMedicine}
                onChange={(e) => setNewMedicine(e.target.value)}
              />
              <button
                type="button"
                onClick={(e) => {
                  if (newMedicine === "") {
                    toast.error("ادخل اسم الدواء");
                    return;
                  }
                  const newMed = {
                    name: newMedicine,
                  };
                  mutate(newMed);
                  setNewMedicine("");
                  setIsOpen(false);
                }}
              >
                اضافه
              </button>
              <button type="button" onClick={(e) => setIsOpen(false)}>
                اغلاق
              </button>
            </div>
          )}
        </div>
        <div>
          <div className={classes.row}>
            <label>الجرعه</label>
            <input
              value={state.times}
              onChange={(e) => {
                dispatch({ type: "times", payload: e.target.value });
              }}
            />
          </div>

          <div className={classes.row}>
            <label>ملاحظات</label>
            <input
              value={state.notes}
              onChange={(e) => {
                dispatch({ type: "notes", payload: e.target.value });
              }}
            />
          </div>
          <button className={`${classes.button} ${classes.addBtn}`}>
            اضافه
          </button>
        </div>
      </form>
      {rosheta.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم الدواء</th>
            <th>الجرعه</th>
            <th>ملاحظات</th>
          </tr>
          {rosheta.map((item, idx) => (
            <tr>
              <td>{item.name} </td>
              <td>{item.times} </td>
              <td>{item.notes} </td>

              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setRosheta((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
            </tr>
          ))}
        </table>
      )}
      {rosheta.length > 0 && (
        <button
          className={classes.button}
          onClick={() => {
            saveData("rosheta", rosheta);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default Rosheta;
