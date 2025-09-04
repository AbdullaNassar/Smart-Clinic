import classes from "./Rosheta.module.css";
import { useReducer, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useMedicines from "../hooks/useMedicines";
import useAddMedicine from "../hooks/useAddMedicine";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

const initState = { name: "", times: "", notes: "" };
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

function Rosheta({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState("");
  const [rosheta, setRosheta] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);

  // Data fetching layer
  const {
    medicines,
    loadingMedicines: isLoading,
    errorMedicines: error,
  } = useMedicines();
  const { isAdding, mutate } = useAddMedicine();

  // Loading/error handling
  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback />;

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

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر الدواء:</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="الادويه..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {medicines &&
                medicines.map((item) => <option>{item.name}</option>)}
            </datalist>

            <button
              className={classes.add}
              type="button"
              onClick={(e) => setIsOpen(true)}
            >
              +
            </button>
          </div>
          {isOpen && (
            <div className={classes.addRow}>
              <label>ادخل اسم الدواء:</label>
              <input
                value={newMedicine}
                onChange={(e) => setNewMedicine(e.target.value)}
              />
              <div className={classes.addBtns}>
                <button
                  disabled={isAdding}
                  className={classes.addButton}
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
                <button
                  className={classes.closeButtons}
                  type="button"
                  onClick={(e) => setIsOpen(false)}
                >
                  اغلاق
                </button>
              </div>
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
