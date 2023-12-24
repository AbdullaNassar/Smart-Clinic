import { useReducer, useState } from "react";
import classes from "./OpposingMedications.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewSymptom, getSymptoms } from "../../../services/apiSymptoms";
import { addNewMedicine, getMedicines } from "../../../services/apiMedicine";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

const initState = { name: "", notes: "" };
function OpposingMedications({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState("");
  const [myMedicine, setMyMedicine] = useState(data);

  const {
    isLoading,
    data: medicine,
    error,
  } = useQuery({
    queryKey: ["medicine"],
    queryFn: getMedicines,
  });

  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewMedicine,
    onSuccess: () => {
      toast.success("تمت اضافه دواء جديد الي القائمه");
      queryClient.invalidateQueries({
        queryKey: ["medicine"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log(medicine);
  function reducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "notes":
        return { ...state, notes: action.payload };
      case "reset":
        return initState;
      default:
        return initState;
    }
  }
  const [state, dispatch] = useReducer(reducer, initState);
  function onSubmit(e) {
    e.preventDefault();
    if (!state.name) {
      toast.error("اختر الدواء من القائمه");
      return;
    }
    if (!myMedicine.some((item) => item.name === state.name)) {
      setMyMedicine((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }
  // console.log(newMedicine);
  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر الدواء</label>
          <input
            value={state.name}
            type="text"
            list="names"
            placeholder="Search names..."
            onChange={(e) => {
              // console.log(e.target.value);
              dispatch({ type: "name", payload: e.target.value });
            }}
          />
          <datalist id="names">
            {medicine && medicine.map((item) => <option>{item.name}</option>)}
          </datalist>

          {!isOpen && (
            <button type="button" onClick={() => setIsOpen(true)}>
              +
            </button>
          )}
          {isOpen && (
            <div>
              <label>اسم الدواء</label>
              <input
                value={newMedicine}
                onChange={(e) => setNewMedicine(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (newMedicine === "") {
                    alert("ادخل اسم  الدواء");
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
                اضافه دواء جديد
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                اغلاق
              </button>
            </div>
          )}
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
        <button className={`${classes.button} ${classes.addBtn}`}>اضافه</button>
      </form>
      {myMedicine.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم الدواء المعارض</th>
            <th>ملاحظات</th>
          </tr>
          {myMedicine.map((item, idx) => (
            <tr>
              <td>{item.name} </td>
              <td>{item.notes} </td>
              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setMyMedicine((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
            </tr>
          ))}
        </table>
      )}
      {myMedicine.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("oppositeMedicines", myMedicine);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default OpposingMedications;
