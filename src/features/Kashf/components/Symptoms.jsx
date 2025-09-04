import classes from "./Symptoms.module.css";
import { useReducer, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useSymptoms from "../hooks/useSymptoms";
import useAddSymptom from "../hooks/useAddSymptom";
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

function Symptoms({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSymptom, setNewSymptom] = useState("");
  const [mySymptoms, setMysymptoms] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);

  // Data fetching layer
  const { symptoms, loadingSymptoms, errorSymptoms } = useSymptoms();
  const { isAdding, mutate } = useAddSymptom();

  // Loading/error handling
  if (loadingSymptoms) return <Spinner />;
  if (errorSymptoms) return <ErrorFallback />;

  function onSubmit(e) {
    e.preventDefault();
    if (!state.name) {
      toast.error("اختر العرض المرضي من القائمه");
      return;
    }
    if (!mySymptoms.some((item) => item.name === state.name)) {
      setMysymptoms((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }

  return (
    <div className={classes.flex}>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر العرض المرضي</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="الاعراض..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {symptoms &&
                symptoms.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
            </datalist>

            {!isOpen && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={classes.addButton}
              >
                +
              </button>
            )}
          </div>
          {isOpen && (
            <div className={classes.container}>
              <label className={classes.label}>اسم العرض</label>
              <input
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                className={classes.input}
              />
              <div className={classes.buttonGroup}>
                <button
                  disabled={isAdding}
                  type="button"
                  onClick={() => {
                    if (newSymptom === "") {
                      alert("ادخل اسم العرض المرضي");
                      return;
                    }
                    const newSym = { name: newSymptom };
                    mutate(newSym);
                    setNewSymptom("");
                    setIsOpen(false);
                  }}
                  className={classes.primaryButton}
                >
                  اضافه عرض جديد
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={classes.secondaryButton}
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
      {mySymptoms.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم المرض</th>
            <th>ملاحظات</th>
          </tr>
          {mySymptoms.map((item, idx) => (
            <tr key={item.id}>
              <td>{item.name} </td>
              <td>{item.notes} </td>
              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setMysymptoms((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
            </tr>
          ))}
        </table>
      )}
      {mySymptoms.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("symptoms", mySymptoms);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default Symptoms;
