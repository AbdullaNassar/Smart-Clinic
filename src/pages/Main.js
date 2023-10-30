import { Link } from "react-router-dom";
import classes from "./Main.module.css";
import DashboardFilter from "../features/Dashboard/DashboardFilter";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { Button } from "@mui/material";
function Main(){
    return(

        <div className={classes.all}>
            
            <div className={classes.main}>
                <div className={classes.btns}>
                    <Link to="/booking">
                        <Button variant="contained" style={{fontSize:"14px", width:"100%"}}>
                            الحجوزات
                        </Button >
                    </Link>

                    <Link to="/patients">
                        <Button variant="contained" style={{fontSize:"14px", width:"100%"}}>
                            المرضي
                        </Button>
                    </Link>

                    <Link to="/ExpensesRevenues">
                        <Button variant="contained" style={{fontSize:"14px", width:"100%"}}>
                            المصروفات والايرادات
                        </Button >
                    </Link>

                    {/* <Link to="/settings">
                        <Button variant="contained" style={{fontSize:"14px", width:"100%"}}>
                            الاعدادات
                        </Button>
                    </Link> */}

                    <Link to="/signup">
                        <Button variant="contained" style={{fontSize:"14px", width:"100%"}}>
                        تسجيل ايميل جديد
                        </Button>
                    </Link>
                    
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
