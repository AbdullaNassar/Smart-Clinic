import classes from "./Printer.module.css"
import {FaHouse, FaLaptopCode, FaLocationArrow, FaPhoneFlip, FaRegHospital,FaSquareWhatsapp,FaUserNurse} from "react-icons/fa6";
function Printer(){
    function printPage() {
        window.print();
      }
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
                <label>ضغط الدم:120</label>
                <label>السكر: 600 عالي</label>
                <label>النبض:سريعه</label>
                <label>التنفس:سريع</label>
                <label>الوزن:80</label>
                <label>الحراره:37</label>
            </div>
            <div  className={classes.col}>
                <label>اسم المريض: عبدالله مؤمن</label>
                <label>السن:23</label>
                <label>النوع:ذكر</label>
                <label>اسم الدكتور: طه بندو</label>
                <label>ملاحظات:استشاره بعد اسبوع</label>
                <label>التشخيص:صداع</label>
                <label>نصائح للمريض: الراحه التامه</label>
            </div>
            </div>
            <hr/>
            <div>
            <table className={classes.customTable}>
                <caption>العلاج</caption>
                <tr>
                    <th>اسم الدواء</th>
                    <th>الجرعه</th>
                    <th>ملاحظات</th>
                </tr>
                <tr>
                    <td>catafast </td>
                    <td>1 مره بعد الاكل</td>
                    <td>الخميس فقط</td>
                </tr>
                <tr>
                    <td>aspiren 500</td>
                    <td>5 مرات بعد الاكل</td>
                    <td>يوميا عدا الجمعه</td>
                </tr>
                <tr>
                    <td>kitofan 500</td>
                    <td>3 مرات بعد الاكل</td>
                    <td>يوميا عدا الجمعه</td>
                </tr>
                <tr>
                    <td>congestal 500</td>
                    <td>3 مرات بعد الاكل</td>
                    <td>يوميا عدا الجمعه</td>
                </tr>
            </table>
            <hr/>
            </div>
            <div>
            <table className={classes.customTable}>
                <caption>التحاليل المطلوبه</caption>
                <tr>
                    <th>اسم التحليل</th>
                    <th>ملاحظات</th>
                </tr>
                <tr>
                    <td>liver </td>
                    <td>التحليل عند الاستيقاظ صباحا</td>
                </tr>
                <tr>
                    <td>hemoglobin </td>
                    <td>...</td>
                </tr>
            </table >
            <hr/>
            </div>
            <div>
            <table className={classes.customTable}>
                <caption>الاشعات المطلوبه</caption>
                <tr>
                    <th>اسم الاشعه</th>
                    <th>ملاحظات</th>
                </tr>
                <tr>
                    <td>رسم قلب </td>
                    <td>عدم الاكل قبل التحليل بساعه</td>
                </tr>
                <tr>
                    <td>اشعه علي المخ </td>
                    <td>...</td>
                </tr>
            </table>
            <hr/>
            </div>
            <div>
            <table className={classes.customTable}>
                <caption>الاكل المسموح اثناء فتره العلاج</caption>
                <tr>
                    <th>اسم الاكل/الشراب</th>
                    <th>ملاحظات</th>
                </tr>
                <tr>
                    <td>سمك</td>
                    <td>...</td>
                    
                </tr>
                <tr>
                    <td>فراخ</td>
                    <td>....</td>
                </tr>
            </table>
            <hr/>
            </div>
            <div>
            <table className={classes.customTable}>
                <caption>الادويه  المحظوره اثناء فتره العلاج</caption>
                <tr>
                    <th>اسم الدواء</th>
                    <th>ملاحظات</th>
                </tr>
                <tr>
                    <td>kitofan</td>
                    <td>...</td>
                    
                </tr>
                
            </table>
            <hr/>
            </div>
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