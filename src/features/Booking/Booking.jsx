import { Link } from "react-router-dom";
import classes from "./Booking.module.css";
import { Button } from "@mui/material";
function Booking() {
  return (
    <div className={classes.all}>
      <div className={classes.content}>
        <div className={classes.btns}>
          <Link to="/newBooking">
            <Button
              variant="contained"
              style={{ background: "teal", fontSize: "14px", width: "100%" }}
            >
              اضافة حجز جديد
            </Button>
          </Link>

          <Link to="/todayBooking">
            <Button
              variant="contained"
              style={{ background: "teal", fontSize: "14px", width: "100%" }}
            >
              عرض حجوزات اليوم
            </Button>
          </Link>

          <Link to="/allBookings">
            <Button
              variant="contained"
              style={{ background: "teal", fontSize: "14px", width: "100%" }}
            >
              عرض جميع الحجوزات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Booking;
