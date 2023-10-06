import { Link } from "react-router-dom";
import classes from "./Patients.module.css";
function Patients(){
    return (
    <div className={classes.btns}>
                    <button>
                        <Link to="/newPatient">اضافة مريض جديد</Link>
                    </button>
                    <button>
                        <Link to="/patientHistory">عرض جميع المرضي</Link>
                    </button>
                    <button>
                        <Link to="/allReservations">كشوفات المريض</Link>
                    </button>
                    <button>
                        <Link to="/patientHistory">روشتات المريض</Link>
                    </button>
                    <button>
                        <Link to="/dailyInfo">تحاليل المريض</Link>
                    </button>
                    <button>
                        <Link to="/dailyInfo">اشعة المريض</Link>
                    </button>
                </div>
    );
}
export default Patients;