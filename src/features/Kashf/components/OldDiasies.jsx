import classes from "./OldDiasies.module.css";
import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useDiseases from "../hooks/useDiseases";
import useAddDisease from "../hooks/useAddDisease";
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

function OldDiasies({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newDisea, setNewDisea] = useState("");
  const [myDiseas, setMyDiseas] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);
  useForm({
    defaultValues: data,
  });

  // Data fetching layer
  const { diseases, loadingDiseases, errorDiseases } = useDiseases();
  const { isAdding, mutate } = useAddDisease();

  // Loading/error handling
  if (loadingDiseases) return <Spinner />;
  if (errorDiseases) return <ErrorFallback error={errorDiseases?.message} />;

  function onSubmit(e) {
    e.preventDefault();
    if (!state.name) {
      toast.error("اختر المرض من القائمه");
      return;
    }
    if (!myDiseas.some((item) => item.name === state.name)) {
      setMyDiseas((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }

  return (
    <div className={classes.flex}>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر المرض:</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="الامراض..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {diseases &&
                diseases.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
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
            <div className={classes.container}>
              <label className={classes.label}>اسم المرض</label>

              <input
                value={newDisea}
                onChange={(e) => setNewDisea(e.target.value)}
                className={classes.input}
                placeholder="ادخل اسم المرض"
              />

              <div className={classes.buttonContainer}>
                <button
                  disabled={isAdding}
                  type="button"
                  onClick={() => {
                    if (newDisea === "") {
                      toast.error("ادخل اسم المرض المراد اضافته");
                      return;
                    }
                    const newDis = { name: newDisea };
                    mutate(newDis);
                    setNewDisea("");
                    setIsOpen(false);
                  }}
                  className={classes.addButton}
                >
                  اضافه مرض جديد
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={classes.closeButton}
                >
                  اغلاق
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={classes.row}>
          <label>ملاحظات:</label>
          <input
            value={state.notes}
            onChange={(e) => {
              dispatch({ type: "notes", payload: e.target.value });
            }}
          />
        </div>
        <button className={`${classes.button} ${classes.addBtn}`}>اضافه</button>
      </form>
      {myDiseas.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم المرض</th>
            <th>ملاحظات</th>
          </tr>
          {myDiseas.map((item, idx) => (
            <tr key={item.id}>
              <td className="flex items-center justify-between">
                {item.name}{" "}
                <span
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setMyDiseas((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>{" "}
              </td>
              <td>{item.notes} </td>
              <td></td>
            </tr>
          ))}
        </table>
      )}
      {myDiseas.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("oldDisease", myDiseas);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default OldDiasies;
