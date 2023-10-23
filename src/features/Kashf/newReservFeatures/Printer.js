import classes from "./Printer.module.css"
import {FaHouse, FaLaptopCode, FaLocationArrow, FaPhoneFlip, FaRegHospital,FaSquareWhatsapp,FaUserNurse} from "react-icons/fa6";
function Printer({data={},isLoading, patientinfo={}}){
    function printPage() {
        window.print();
      }
    console.log(data);
    if(isLoading)return<h2>Loading...</h2>
    // console.log(data.diagnosis.notes);
      return (
        <div className={classes.all}>
            <div className={classes.header}>
                <div >
                    <h3>Ultra Clinic System</h3>
                    <span className={classes.logo}><FaRegHospital/> </span>
                </div>
                <div>
                    <h3>روشته علاجيه</h3>
                </div>
                <div>
                    <h3>عياده دكتور /عبدالله مؤمن<br/> للعظام والجراحه</h3>
                </div>
            </div>
            <hr/>
            <div className={classes.info}>
            <div><span className={classes.logo}><FaUserNurse/></span></div>
            <div>
                <label>تاريخ الكشف  22/3/2023</label>
            </div>
            <div className={classes.col}>
                {/* {data.quickCheck&&data.quickCheck.pressure!==""&&<label>ضغط الدم:{data.quickCheck.pressure}</label>} */}
                {data.quickCheck&&data.quickCheck?.pressure!==""&&<label>ضغط الدم:{data.quickCheck.pressure}</label>}
                {data.quickCheck&&data?.quickCheck?.diabites!==""&&<label>السكر:  {data?.quickCheck?.diabites}</label>}
                {data.quickCheck&&data?.quickCheck?.heartRate!==""&&<label>النبض:{data?.quickCheck?.heartRate}</label>}
                {data.quickCheck&&data?.quickCheck?.breathe!==""&&<label>التنفس:{data?.quickCheck?.breathe}</label>}
                {data.quickCheck&&data?.quickCheck?.weight!==""&&<label>الوزن:{data?.quickCheck?.weight}</label>}
                {data.quickCheck&&data?.quickCheck?.temperture!==""&&<label>الحراره:{data?.quickCheck?.temperture}</label>}
            </div>
            <div  className={classes.col}>
                <label>اسم المريض: {patientinfo?.name}</label>
                <label>السن:{patientinfo?.age}</label>
                <label>النوع:{patientinfo?.gender}</label>
                <label>اسم الدكتور: طه بندو</label>
                
                {data.diagnosis&&data.diagnosis?.notes!==""&&<label>ملاحظات: {data.diagnosis.notes}</label>}
                {data.diagnosis&&data.diagnosis?.details!==""&&<label>التشخيص: {data.diagnosis.details}</label>}
                {data.diagnosis&&data.diagnosis?.advices!==""&&<label>نصائح للمريض: {data.diagnosis.advices}</label>}
            </div>
            </div>
            <hr/>
            <div className={classes.card}>
            <div className={classes.box}>
            {data.rosheta&&data.rosheta.length>0&&<table className={classes.customTable}>
                <caption>العلاج</caption>
                <tr>
                    <th>اسم الدواء</th>
                    <th>الجرعه</th>
                    <th>ملاحظات</th>
                </tr>
                 {data.rosheta.map(item=>
                <tr>
                    <td>{item.name} </td>
                    <td>{item.times}</td>
                    {item.notes!==""&&<td>{item.notes}</td>}
                </tr>)}
            </table>}
            {/* <hr/> */}
            </div>
            <div className={classes.box}>
            {data.medicalTest&&data.medicalTest.length>0&&<table className={classes.customTable}>
                <caption>التحاليل المطلوبه</caption>
                <tr>
                    <th>اسم التحليل</th>
                    <th>ملاحظات</th>
                </tr>
                {data.medicalTest.map(item=>
                <tr>
                    <td>{item.name}</td>
                    {item.notes!==""&&<td>{item.notes}</td>}
                </tr>
                )}
            </table >}
            {/* <hr/> */}
            </div>
            <div className={classes.box}>
            {data.xrays&&data.xrays.length>0&&<table className={classes.customTable}>
                <caption>الاشعات المطلوبه</caption>
                <tr>
                    <th>اسم الاشعه</th>
                    <th>ملاحظات</th>
                </tr>
                {data.xrays.map(item=>
                    <tr>
                        <td>{item.name}</td>
                        {item.notes!==''&&<td>{item.notes}</td>}
                    </tr>)}
            </table>}
            {/* <hr/> */}
            </div>
            <div className={classes.box}>
            {data.food&&data.food.length>0&&<table className={classes.customTable}>
                <caption>الاكل اثناء فتره العلاج</caption>
                <tr>
                    <th>الطعام</th>
                    {/* <th>مسموح/ممنوع</th> */}
                </tr>
                {data.food.map(item=>
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.isOk===true?"مسموح":"ممنوع"}</td>
                    </tr>)}
            </table>}
            {/* <hr/> */}
            </div>
            <div className={classes.box}>
            {data.oppositeMedicines&&data.oppositeMedicines.length>0&&<table className={classes.customTable}>
                <caption>الادويه  المحظوره اثناء فتره العلاج</caption>
                <tr>
                    <th>اسم الدواء</th>
                    <th>ملاحظات</th>
                </tr>
                {data.oppositeMedicines.map(item=>
                    <tr>
                        <td>{item.name}</td>
                        {item.notes!==''&&<td>{item.notes}</td>}
                    </tr>)}
            </table>}
            {/* <hr/> */}
            </div>
            </div>
            <hr/>
            <div className={classes.footer}>
                <div className={classes.col}>
                    <span>+01063698275<FaPhoneFlip /> </span>
                    <span>+01063698275<FaSquareWhatsapp /> </span>
                </div>
                <div  className={classes.col}>
                    <span>جرجا ميدان المحطه 
                        <label><FaHouse /></label>
                        </span>
                    <span>development team 
                        <label><FaLaptopCode/></label>
                        </span>
                    <button className="no-print" onClick={printPage}>طباعه</button>
                </div>
                <div>

                </div>
                
            </div>
        </div>
        
      );
}
export default Printer;