import { Link } from "react-router-dom";
import classes from "./ExpensesRevenues.module.css";
function ExpensesRevenues(){
    return(
        <div>
             <div className={classes.btns}>
                    <button>
                        <Link to="newExpense">عمليه مصروف/شراء جديده</Link>
                    </button>

                    <button>
                        <Link to="newRevenue">عمليه ايراد جديده</Link>
                    </button>
                    <button>
                        <Link to="expenses">مصروفات العياده</Link>
                    </button>

                    <button>
                        <Link to="revenues">ايرادات العياده</Link>
                    </button>                  
                </div>
        </div>
    );
}
export default ExpensesRevenues;