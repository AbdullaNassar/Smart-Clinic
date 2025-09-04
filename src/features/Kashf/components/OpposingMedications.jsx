import classes from "./OpposingMedications.module.css";
import { useReducer, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useMedicines from "../hooks/useMedicines";
import useAddMedicine from "../hooks/useAddMedicine";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

const initState = { name: "", notes: "" };
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

function OpposingMedications({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState("");
  const [myMedicine, setMyMedicine] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);

  // Data fetching layer
  const {
    medicines: medicine,
    loadingMedicines,
    errorMedicines,
  } = useMedicines();
  const { isAdding, mutate } = useAddMedicine();

  // Loading/error handling
  if (loadingMedicines) return <Spinner />;
  if (errorMedicines) return <ErrorFallback />;

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

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر الدواء</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="Search names..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {medicine && medicine.map((item) => <option>{item.name}</option>)}
            </datalist>

            {!isOpen && (
              <button
                className={classes.add}
                type="button"
                onClick={() => setIsOpen(true)}
              >
                +
              </button>
            )}
          </div>
          {isOpen && (
            <div className={classes.addRow}>
              <label>اسم الدواء</label>
              <input
                value={newMedicine}
                onChange={(e) => setNewMedicine(e.target.value)}
              />
              <div className={classes.addBtns}>
                <button
                  disabled={isAdding}
                  className={classes.addButton}
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
                <button
                  className={classes.closeButtons}
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  اغلاق
                </button>
              </div>
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
            <tr key={item.id}>
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
