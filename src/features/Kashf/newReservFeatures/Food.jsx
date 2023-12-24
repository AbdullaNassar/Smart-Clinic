import { useReducer, useState } from "react";
import classes from "./Food.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewFood, getFood } from "../../../services/apiFood";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

const initState = { name: "", notes: "", isOk: true };
function Food({ saveData, data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newFood, setNewFood] = useState("");
  const [myFood, setMyfood] = useState(data);

  const {
    isLoading,
    data: foods,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: getFood,
  });

  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewFood,
    onSuccess: () => {
      toast.success("تمت الاضافه الي القائمه بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  // console.log(foods);
  function reducer(state, action) {
    switch (action.type) {
      case "name1":
        return { ...state, isOk: true, name: action.payload };
      case "name2":
        return { ...state, isOk: false, name: action.payload };
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
      toast.error("اختر الطعام من القائمه");
      return;
    }
    if (!myFood.some((item) => item.name === state.name)) {
      setMyfood((prev) => [...prev, state]);
      dispatch({ type: "reset" });
    } else toast.error("تمت الاضافه من قبل");
  }

  // console.log(newFood);
  return (
    <div className={classes.all}>
      <div className={classes.menu}>
        <form onSubmit={onSubmit}>
          <div className={classes.row}>
            <label>مسموح</label>
            <input
              type="text"
              list="names"
              placeholder="Search names..."
              onChange={(e) => {
                // console.log(e.target.value);
                dispatch({ type: "name1", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {foods && foods.map((item) => <option>{item.name}</option>)}
            </datalist>

            {!isOpen && (
              <button type="button" onClick={() => setIsOpen(true)}>
                +
              </button>
            )}
            {isOpen && (
              <div>
                <label>اسم الطعام</label>
                <input
                  value={newFood}
                  onChange={(e) => setNewFood(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newFood === "") {
                      alert("ادخل اسم  الطعام");
                      return;
                    }
                    const newFo = {
                      name: newFood,
                    };
                    mutate(newFo);
                    setNewFood("");
                    setIsOpen(false);
                  }}
                >
                  اضافه طعام جديد
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
              onChange={(e) => {
                dispatch({ type: "notes", payload: e.target.value });
              }}
            />
          </div>
          <button className={`${classes.button} ${classes.addBtn}`}>
            اضافه
          </button>
        </form>
        <form onSubmit={onSubmit}>
          <div className={classes.row}>
            <label>ممنوع</label>
            <input
              type="text"
              list="names"
              placeholder="Search names..."
              onChange={(e) => {
                // console.log(e.target.value);
                dispatch({ type: "name2", payload: e.target.value });
              }}
            />
            <datalist id="names">
              {foods && foods.map((item) => <option>{item.name}</option>)}
            </datalist>
          </div>

          <div className={classes.row}>
            <label>ملاحظات</label>
            <input
              onChange={(e) => {
                dispatch({ type: "notes", payload: e.target.value });
              }}
            />
          </div>
          <button className={`${classes.button} ${classes.addBtn}`}>
            اضافه
          </button>
        </form>
      </div>
      {myFood.length > 0 && (
        <table className={classes.customers}>
          <tr>
            <th>اسم الطعام/الشراب</th>
            <th>ملاحظات</th>
            <th>مسموح/ممنوع</th>
          </tr>
          {myFood
            .sort((a, b) => {
              if (a.isOk && !b.isOk) {
                return -1; // a should come before b
              } else if (!a.isOk && b.isOk) {
                return 1; // b should come before a
              } else {
                return 0; // preserve the original order
              }
            })
            .map((item, idx) => (
              <tr>
                <td>{item.name} </td>
                <td>{item.notes} </td>
                <td>{item.isOk ? "مسموح" : "ممنوع"} </td>
                <td>
                  <span
                    className="spn"
                    onClick={() => {
                      setMyfood((prev) => prev.filter((x) => x !== item));
                    }}
                  >
                    <FaDeleteLeft />
                  </span>
                </td>
              </tr>
            ))}
        </table>
      )}
      {myFood.length > 0 && (
        <button
          className={classes.button}
          onClick={(e) => {
            saveData("foods", myFood);
          }}
        >
          حفظ
        </button>
      )}
    </div>
  );
}
export default Food;
