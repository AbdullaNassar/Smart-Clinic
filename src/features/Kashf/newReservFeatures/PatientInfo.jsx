import classes from "./PatientInfo.module.css"

function PatientInfo({data,isLoading,error}){
   
    // console.log(data);
      if(isLoading)return<p>Loading...</p>
    return (
        <div>
            <div  className={classes.row}>
                <label>اسم المريض:</label>
                <input disabled={true} value={data?.name}/>
            </div>
            <div  className={classes.row}>
                <label>العمر:</label>
                <input disabled={true} value={data?.age} />
            </div>
            <div  className={classes.row}>
                <label>النوع:</label>
                <input disabled={true} value={data?.gender} />
            </div>
            <div  className={classes.row}>
                <label>رقم الهاتف:</label>
                <input disabled={true} value={data?.phone} />   
            </div>
            <div  className={classes.row}>
                <label>ملاجظات:</label>
                <textarea disabled={true} value={data?.notes} />
            </div>
        </div>
    );
}
export default PatientInfo;