import { FaMoneyBill1 } from "react-icons/fa6";
import classes from "./MyHeading.module.css"
function MyHeading({title}){
    return(
        <div className={classes.heading}>
            <h2 className={classes.heading__title}>{title}</h2>
            <span><FaMoneyBill1/></span>
        </div>

    );
}
export default MyHeading;