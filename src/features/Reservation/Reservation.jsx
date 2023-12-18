import { Link } from "react-router-dom";

function Reservation() {
  return (
    <div>
      <button>
        <Link to="/newReservation">فتح كشف جديد</Link>
      </button>
      <button>
        <Link to="/newReservation">عرض جميع الكشوفات</Link>
      </button>
    </div>
  );
}
export default Reservation;
