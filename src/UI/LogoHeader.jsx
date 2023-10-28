import { useNavigate } from "react-router-dom";
import classes from "./LogoHeader.module.css";
function LogoHeader(){
    const navigate =useNavigate();
    return(
        <div onClick={()=>navigate('/')} className={classes.logo}>
            <img src="https://img.freepik.com/premium-vector/medical-halth-care-icon_602006-1945.jpg?w=740" alt="logo"/>
            <h2>العيادة</h2>
        </div>
    );
}

export default LogoHeader;