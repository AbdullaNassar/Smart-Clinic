import { Link } from "react-router-dom";
import classes from "./Patients.module.css";
// import { Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from "@mui/material";
function Patients(){
    return (
        <div className={classes.all}>
            <div className={classes.content}>
    <div className={classes.btns}>
         <Link to="/newPatient">
                    <Button variant="contained" size="large" style={{backgroundColor: "teal", width:"100%"}}> 
                        اضافة مريض جديد
                    </Button>
        </Link>
        <Link to="/patientHistory">
                    <Button  variant="contained"  style={{backgroundColor: "teal", width:"100%"}}>
                        عرض جميع المرضي
                    </Button>
        </Link>
                    
                </div>
    </div>
    </div>
    );
}
export default Patients;