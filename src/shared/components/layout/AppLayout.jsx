import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import classes from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={classes.container}>
      <Header />
      <Sidebar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
