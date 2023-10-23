import { Link } from "react-router-dom";
import classes from "./Main.module.css";
import DashboardFilter from "../features/Dashboard/DashboardFilter";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
function Main(){
    return(

        <div className={classes.all}>
            
            <div className={classes.main}>
                <div className={classes.btns}>
                    <button>
                        <Link to="/booking">الحجوزات</Link>
                    </button>
                    <button>
                        <Link to="/patients">المرضي</Link>
                    </button>
                    <button>
                        <Link to="/ExpensesRevenues">المصروفات والايرادات</Link>
                    </button>
                    <button>
                        <Link to="/settings">الاعدادات</Link>
                    </button>

                    <button>
                        <Link to="/signup">تسجيل ايميل جديد</Link>
                    </button>
                    
                </div>
            </div>
            <div className={classes.content}>
                <DashboardFilter/>
                <DashboardLayout/>
            </div>
        </div>

    );
}
export default Main;
