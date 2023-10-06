import { Link } from "react-router-dom";
import classes from "./Booking.module.css";
function Booking(){
    return(
        <div className={classes.btns}>
                    <button>
                        <Link to="/newBooking">اضافة حجز جديد</Link>
                    </button>
                    <button>
                        <Link to="/allBookings">عرض جميع الحجوزات</Link>
                    </button>
                    
                </div>
    );
}
export default Booking;