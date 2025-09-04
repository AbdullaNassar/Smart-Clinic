import { useReducer, useState } from "react";
import classes from "./MedicalTest.module.css";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import useMedicalTests from "../hooks/useMedicalTests";
import useAddMedicalTest from "../hooks/useAddMedicalTest";
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

function MedicalTests({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMedicalTest, setNewMedicalTest] = useState("");
  const [myMedicalTests, setMyMedicalTests] = useState(data);
  const [state, dispatch] = useReducer(reducer, initState);

  // Data fetching layer
  const { loadingMedicalTests, errorMedicalTests, medicalTests } =
    useMedicalTests();
  const { isAdding, mutate } = useAddMedicalTest();

  // Loading/error handling
  if (loadingMedicalTests) return <Spinner />;
  if (errorMedicalTests)
    return <ErrorFallback error={errorMedicalTests?.message} />;

  function onSubmit(e) {
    e.preventDefault();
    if (!state.name) {
      toast.error("اختر تحليل من القائمه");
      return;
    }

    if (!myMedicalTests.some((item) => item.name === state.name)) {
      setMyMedicalTests((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.all}>
        <div className={classes.row}>
          <label>اختر التحليل:</label>
          <div className={classes.rowInput}>
            <input
              value={state.name}
              type="text"
              list="names"
              placeholder="التحاليل..."
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {medicalTests &&
                medicalTests.map((item) => (
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
            <div className={classes.addRow}>
              <label>اسم التحليل:</label>
              <input
                value={newMedicalTest}
                onChange={(e) => setNewMedicalTest(e.target.value)}
              />
              <div className={classes.addBtns}>
                <button
                  disabled={isAdding}
                  className={classes.addButton}
                  type="button"
                  onClick={() => {
                    if (newMedicalTest === "") {
                      toast.error("ادخل اسم المراد اضافته الي القائمه");
                      return;
                    }
                    const newSym = {
                      name: newMedicalTest,
                    };
                    mutate(newSym);
                    setNewMedicalTest("");
                    setIsOpen(false);
                  }}
                >
                  اضافه تحليل جديد
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
      {myMedicalTests.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم التحليل</th>
            <th>ملاحظات</th>
          </tr>
          {myMedicalTests.map((item, idx) => (
            <tr>
              <td>{item.name} </td>
              <td>{item.notes} </td>
              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setMyMedicalTests((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
            </tr>
          ))}
        </table>
      )}
      {myMedicalTests.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("medicalTests", myMedicalTests);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default MedicalTests;
