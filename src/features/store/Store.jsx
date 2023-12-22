import { NavLink } from "react-router-dom";
import classes from "./Store.module.css";
import { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import {
  addNewExpense,
  getExpenses,
  updateQuantity,
} from "../../services/apiExpenses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Temp from "../../UI/Temo";
import { FaCirclePlus, FaSistrix } from "react-icons/fa6";
function Store() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const queryClient = useQueryClient();
  const [decreaseItem, setDecreaseItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addNewExpense,
    onSuccess: () => {
      toast.success("تمت الاضافه");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [addExpense, setAddExpense] = useState("");

  const [itemList, setItemList] = useState([]);
  let {
    isLoading: loadingExpenses,
    data: items,
    error: errorExpenses,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getExpenses,
  });
  if (items !== undefined) items.sort((a, b) => a.name.localeCompare(b.name));
  // console.log(items);
  const handleButtonClick = (index) => {
    setItemList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].value += 1;
      return updatedList;
    });
  };

  useEffect(() => {
    if (items) {
      let initializedList = [];
      for (let i = 0; i < items.length; i++) initializedList.push(0);
      setItemList(initializedList);
    }
  }, [items]);

  // console.log(itemList);

  const updateMutation = useMutation(
    (updatedItem) => updateQuantity(updatedItem.id, updatedItem.value, true),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        toast.success("تم الحذف بنجاح");
      },
      onError: (error) => {
        toast.error("خطأ اثناء الحذف", error);
      },
    }
  );

  if (items !== undefined && searchQuery !== null) {
    //  console.log(searchQuery);
    items = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (loadingExpenses) return <h2>Loading...</h2>;
  if (errorExpenses) return <h2>Error on loading items</h2>;

  return (
    <div className={classes.all}>
      <h2 className={classes.heading}>المخزن</h2>
      <div className={classes.filterSearch}>
        <div className={classes.filter}>
          <NavLink
            className={`${classes.btn} ${toggleFilter ? "" : classes.bdBottom}`}
            onClick={() => setToggleFilter(false)}
          >
            الكل
          </NavLink>
          <NavLink
            className={`${classes.btn} ${toggleFilter ? classes.bdBottom : ""}`}
            onClick={() => setToggleFilter(true)}
          >
            علي وشك النفاذ
          </NavLink>
        </div>

        <div className={classes.searchAdd}>
          <div>
            <input
              className={classes.search}
              placeholder="بحث..."
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <span>
              <FaSistrix />
            </span>
          </div>

          {!isOpen && (
            <button className={classes.newBtn} onClick={() => setIsOpen(true)}>
              اضافه عنصر جديد
            </button>
          )}
          {isOpen && (
            <div>
              <label>ادخل نوع المصروف</label>
              <input
                value={addExpense}
                onChange={(e) => setAddExpense(e.target.value)}
              />
              <button
                // className={classes.btn}
                type="button"
                onClick={() => {
                  if (addExpense === "") {
                    toast.error("ادخل نوع المصروف");
                    return;
                  }
                  const newDis = {
                    name: addExpense,
                  };
                  mutate(newDis);
                  setAddExpense("");
                  setIsOpen(false);
                }}
              >
                اضافه
              </button>
              <button
                // className={classes.btn}
                type="button"
                onClick={() => setIsOpen(false)}
              >
                اغلاق
              </button>
            </div>
          )}
        </div>
      </div>

      <table
        className={`${classes.table} ${toggleFilter ? classes.expire : ""}`}
      >
        <tr>
          <th></th>
          <th>اسم المنتج</th>
          <th>عدد القطع</th>
          {/* <th>السعر</th> */}
        </tr>
        {/* {items &&
          items.map((item) => (
            <td>{item.name}</td>
          ))} */}
        {items !== undefined &&
          items.map((item, idx) => (
            <tr>
              <td className={classes.options}>
                <button
                  className={classes.icon}
                  onClick={() => {
                    // console.log("ads");
                    setItemList((prevItems) => {
                      const updatedItems = [...prevItems];
                      // console.log(updatedItems);
                      updatedItems[idx] = updatedItems[idx] - 1;
                      // console.log(updatedItems);
                      return updatedItems;
                    });
                  }}
                >
                  <AiFillMinusCircle />
                </button>

                <span className={classes.times}>{itemList[idx]} &times;</span>
                <button
                  className={`${classes.icon} ${classes.mgRight}`}
                  onClick={() => {
                    // console.log("ads");
                    setItemList((prevItems) => {
                      const updatedItems = [...prevItems];
                      // console.log(updatedItems);
                      updatedItems[idx] = updatedItems[idx] + 1;
                      // console.log(updatedItems);
                      return updatedItems;
                    });
                  }}
                >
                  {/* <FaCirclePlus /> */}
                  <AiFillPlusCircle />
                </button>
                {itemList[idx] != 0 && (
                  <button
                    className={classes.save}
                    onClick={() => {
                      if (itemList[idx] > item.quantity) {
                        toast.error(
                          // `لا  توجد ${itemList[idx]} ${item.name} في المخزن`
                          `not found ${itemList[idx]} ${item.name} in inventory `
                        );
                      } else {
                        const updatedItem = {
                          value: itemList[idx],
                          id: item.id,
                        };
                        console.log(updatedItem);
                        updateMutation.mutate(updatedItem);
                      }
                      // updateQuantity(item.id, decreaseItem[idx], false);
                    }}
                  >
                    حفظ
                  </button>
                )}
              </td>

              <td>{item.name}</td>
              <td>{item.quantity}</td>
              {/* <td>300LE</td> */}
            </tr>
          ))}

        {/* <tr>
          <td className={classes.options}>
            <AiFillMinusCircle />
            <span className={classes.times}>1 &times;</span>
            <button className={classes.save}>حفظ</button>
          </td>
          <td>كمامات</td>
          <td>25</td>
          <td>450LE</td>
        </tr> */}
      </table>
    </div>
  );
}
export default Store;
