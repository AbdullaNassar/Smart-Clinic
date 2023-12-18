import { Link } from "react-router-dom";
import classes from "./Main.module.css";
import DashboardFilter from "../features/Dashboard/DashboardFilter";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { Button } from "@mui/material";
function Main() {
  return (
    <div className={classes.all}>
      <div className={classes.main}></div>
      <div className={classes.content}>
        <DashboardFilter />
        <DashboardLayout />
      </div>
    </div>
  );
}
export default Main;
