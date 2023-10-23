import classes from "./ConfirmDelete.module.css";
function ConfirmDelete({title, confirm, cancel}){
    return(
        <div className={classes.all} >
            <h2>Delete {title}</h2>
            <div>Are you sure you want to delete this {title}? this cannot be undone</div>
            <div className={classes.btns}>
                <button className={classes.cncl} onClick={cancel}>Cancel</button>
                <button className={classes.dlt} onClick={confirm}>delete</button>
            </div>
        </div>
    );
}
export default ConfirmDelete;