import { Link } from "react-router-dom";
import classes from "./ExpensesRevenues.module.css";
import { Button } from "@mui/material";

function ExpensesRevenues() {
  return (
    <div className={classes.all}>
      <div className={classes.btns}>
        <Link to="newExpense">
          <Button
            variant="contained"
            style={{ background: "teal", fontSize: "14px", width: "100%" }}
          >
            عمليه مصروف / شراء جديده
          </Button>
        </Link>

        {/* <Link to="newRevenue">
                        <Button variant="contained" style={{background:"teal", fontSize:"14px" , width:"100%"}}>
                            عمليه ايراد جديده
                        </Button>
                    </Link> */}

        <Link to="expenses">
          <Button
            variant="contained"
            style={{ background: "teal", fontSize: "14px", width: "100%" }}
          >
            مصروفات العياده
          </Button>
        </Link>

        <Link to="revenues">
          <Button
            variant="contained"
            style={{ background: "teal", fontSize: "14px", width: "100%" }}
          >
            ايرادات العياده
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default ExpensesRevenues;
