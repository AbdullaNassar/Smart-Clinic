import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./OldDiasies.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewdisease, getDiseases } from "../../../services/apiDiseases";
import SpinnerMini from "../../../UI/SpinnerMini";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

const initState = { name: "", notes: "" };
function OldDiasies({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newDisea, setNewDisea] = useState("");
  console.log(data);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });
  const [myDiseas, setMyDiseas] = useState(data);

  const {
    isLoading,
    data: diseases,
    error,
  } = useQuery({
    queryKey: ["diseases"],
    queryFn: getDiseases,
  });
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewdisease,
    onSuccess: () => {
      toast.success("تمت اضافه مرض جديد بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["diseases"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log(diseases);
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
      toast.error("اختر المرض من القائمه");
      return;
    }
    if (!myDiseas.some((item) => item.name === state.name)) {
      setMyDiseas((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }
  console.log(myDiseas);
  // console.log(newDisea);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={classes.row}>
          <label>اختر المرض:</label>
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
            {diseases && diseases.map((item) => <option>{item.name}</option>)}
          </datalist>

          {!isOpen && (
            <button type="button" onClick={() => setIsOpen(true)}>
              +
            </button>
          )}
          {isOpen && (
            <div>
              <label>اسم المرض</label>
              <input
                value={newDisea}
                onChange={(e) => setNewDisea(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (newDisea === "") {
                    toast.error("ادخل اسم المرض المراد اضافته");
                    return;
                  }
                  const newDis = {
                    name: newDisea,
                  };
                  mutate(newDis);
                  setNewDisea("");
                  setIsOpen(false);
                }}
              >
                اضافه مرض جديد
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                اغلاق
              </button>
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
            <tr>
              <td>{item.name} </td>
              <td>{item.notes} </td>
              <td>
                <span
                  className="spn"
                  onClick={() => {
                    setMyDiseas((prev) => prev.filter((x) => x !== item));
                  }}
                >
                  <FaDeleteLeft />
                </span>
              </td>
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
