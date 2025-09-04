import classes from "./Main.module.css";
import DashboardFilter from "../components/DashboardFilter";
import DashboardLayout from "../components/DashboardLayout";

function Main() {
  return (
    <div className={classes.all}>
      {/* Responsive main container */}
      <div className={classes.content}>
        <DashboardFilter />
        <DashboardLayout />
      </div>
    </div>
  );
}
export default Main;
