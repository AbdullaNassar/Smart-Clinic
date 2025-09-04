import classes from "./Store.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateQuantity } from "../../ExpensesRevenues/services/apiExpenses";
import { formatNumber } from "../../../shared/utils/helper";
import useAddExpense from "../../ExpensesRevenues/hooks/useAddExpense";
import useExpenses from "../../ExpensesRevenues/hooks/useExpenses";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function Store() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addExpense, setAddExpense] = useState("");
  const [itemList, setItemList] = useState([]);
  const queryClient = useQueryClient();

  // Data fetching layer
  const { isAdding, mutate } = useAddExpense();
  let { expenses: items, errorExpenses, loadingExpenses } = useExpenses();
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

  if (items !== undefined) items.sort((a, b) => a.name.localeCompare(b.name));
  useEffect(() => {
    if (items) {
      let initializedList = [];
      for (let i = 0; i < items.length; i++) initializedList.push(0);
      setItemList(initializedList);
    }
  }, [items]);

  // Loading/error handling
  if (loadingExpenses) return <Spinner />;
  if (errorExpenses) return <ErrorFallback />;

  if (items !== undefined && toggleFilter) {
    items = items.filter((item) => item.quantity <= 5);
  }
  if (items !== undefined && searchQuery !== null) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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
                disabled={isAdding}
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
              <button type="button" onClick={() => setIsOpen(false)}>
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
        </tr>
        {items !== undefined &&
          items.map((item, idx) => (
            <tr key={item.id}>
              <td className={classes.options}>
                <button
                  className={classes.icon}
                  onClick={() => {
                    setItemList((prevItems) => {
                      const updatedItems = [...prevItems];
                      updatedItems[idx] = updatedItems[idx] - 1;
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
                    setItemList((prevItems) => {
                      const updatedItems = [...prevItems];
                      updatedItems[idx] = updatedItems[idx] + 1;
                      return updatedItems;
                    });
                  }}
                >
                  <AiFillPlusCircle />
                </button>

                <button
                  className={`${classes.save} ${
                    itemList[idx] == 0 ? classes.hidden : ""
                  }`}
                  onClick={() => {
                    if (itemList[idx] > item.quantity) {
                      toast.error(
                        `لا  توجد ${itemList[idx]} ${item.name} في المخزن`
                      );
                    } else {
                      const updatedItem = {
                        value: itemList[idx],
                        id: item.id,
                      };
                      updateMutation.mutate(updatedItem);
                    }
                  }}
                >
                  حفظ
                </button>
              </td>

              <td>{item.name}</td>
              <td>{formatNumber(item.quantity)}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
export default Store;
