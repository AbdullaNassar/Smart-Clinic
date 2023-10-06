import { Link } from "react-router-dom";

function Reservation(){
    return(
        <div>
            <button>
                <Link to="/newReservations">فتح كشف جديد</Link>
            </button>
            <button>
                <Link to="/allReservations">جميع الكشوفات</Link>
            </button>
        </div>
    );
}
export default Reservation;