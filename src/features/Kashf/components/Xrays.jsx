import classes from "./Xrays.module.css";
import { useReducer, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useXrays from "../hooks/useXrays";
import useAddXray from "../hooks/useAddXray";
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

function Xrays({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newXray, setNewXray] = useState("");
  const [myXrays, setMyXrays] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);

  // Data fetching layer
  const { loadingXrays, xrays, errorXrays } = useXrays();
  const { isAdding, mutate } = useAddXray();

  // Loading/error handling
  if (loadingXrays) return <Spinner />;
  if (errorXrays) return <ErrorFallback />;

  function onSubmit(e) {
    e.preventDefault();
    if (!state.name) {
      toast.error("اختر اشعه من القائمه");
      return;
    }
    if (!myXrays.some((item) => item.name === state.name)) {
      setMyXrays((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر الاشعه:</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="الاشعات ..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {xrays &&
                xrays.map((item) => <option key={item.id}>{item.name}</option>)}
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
              <label>اسم الاشعه</label>
              <input
                value={newXray}
                onChange={(e) => setNewXray(e.target.value)}
              />
              <div className={classes.addBtns}>
                <button
                  disabled={isAdding}
                  className={classes.addButton}
                  type="button"
                  onClick={() => {
                    if (newXray === "") {
                      toast.error("ادخل اسم  الاشعه");
                      return;
                    }
                    const newXr = {
                      name: newXray,
                    };
                    mutate(newXr);
                    setNewXray("");
                    setIsOpen(false);
                  }}
                >
                  اضافه اشعه جديده
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
      {myXrays.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم الاشعه</th>
            <th>ملاحظات</th>
          </tr>
          {myXrays.map((item, idx) => (
            <tr>
              <td>{item.name} </td>
              <td>{item.notes} </td>
              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setMyXrays((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
            </tr>
          ))}
        </table>
      )}
      {myXrays.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("xrays", myXrays);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default Xrays;
