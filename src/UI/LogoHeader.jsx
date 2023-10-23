import { useNavigate } from "react-router-dom";
import classes from "./LogoHeader.module.css";
function LogoHeader(){
    const navigate =useNavigate();
    return(
        <div onClick={()=>navigate('/')} className={classes.logo}>
            <img src="https://p7.hiclipart.com/preview/957/974/456/hospital-logo-clinic-health-care-physician-business.jpg" alt="logo"/>
            <h2>العيادة</h2>
        </div>
    );
}

export default LogoHeader;