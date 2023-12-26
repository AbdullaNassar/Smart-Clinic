import classes from "./Printer.module.css";
import {
  FaHouse,
  FaLaptopCode,
  FaLocationArrow,
  FaPhoneFlip,
  FaRegHospital,
  FaSquareWhatsapp,
  FaUserNurse,
} from "react-icons/fa6";
function Printer({
  data = {},
  isLoading,
  patientinfo = {},
  all,
  quick,
  diagnosis,
  rosheta,
  medical,
  xray,
  food,
  opposite,
}) {
  function printPage() {
    window.print();
  }
  console.log(data);
  if (isLoading) return <h2>Loading...</h2>;
  // console.log(data.diagnosis.notes);
  return (
    <div className={classes.all}>
      <div className={classes.header}>
        <div>
          <h3>Ultra Clinic System</h3>
          <span className={classes.logo}>
            <FaRegHospital />{" "}
          </span>
        </div>
        <div>
          <h3>روشته علاجيه</h3>
        </div>
        <div>
          <h3>
            عياده دكتور /عبدالله مؤمن
            <br /> للعظام والجراحه
          </h3>
        </div>
      </div>
      <hr />
      <div className={classes.info}>
        <div>
          <span className={classes.logo}>
            <FaUserNurse />
          </span>
        </div>
        <div>
          <label>تاريخ الكشف 22/3/2023</label>
        </div>
        <div className={classes.col}>
          {/* {data.quickCheck&&data.quickCheck.pressure!==""&&<label>ضغط الدم:{data.quickCheck.pressure}</label>} */}
          {(all || quick) &&
            data.quickCheck &&
            data.quickCheck?.pressure !== "" && (
              <label>ضغط الدم:{data.quickCheck.pressure}</label>
            )}
          {(all || quick) &&
            data.quickCheck &&
            data?.quickCheck?.diabites !== "" && (
              <label>السكر: {data?.quickCheck?.diabites}</label>
            )}
          {(all || quick) &&
            data.quickCheck &&
            data?.quickCheck?.heartRate !== "" && (
              <label>النبض:{data?.quickCheck?.heartRate}</label>
            )}
          {(all || quick) &&
            data.quickCheck &&
            data?.quickCheck?.breathe !== "" && (
              <label>التنفس:{data?.quickCheck?.breathe}</label>
            )}
          {(all || quick) &&
            data.quickCheck &&
            data?.quickCheck?.weight !== "" && (
              <label>الوزن:{data?.quickCheck?.weight}</label>
            )}
          {(all || quick) &&
            data.quickCheck &&
            data?.quickCheck?.temperture !== "" && (
              <label>الحراره:{data?.quickCheck?.temperture}</label>
            )}
        </div>
        <div className={classes.col}>
          <label>اسم المريض: {patientinfo?.name}</label>
          {patientinfo?.age && <label>السن:{patientinfo?.age}</label>}
          {patientinfo?.gender && <label>النوع:{patientinfo?.gender}</label>}
          {/* <label>اسم الدكتور: طه بندو</label> */}

          {/* {(all || diagnosis) &&
            data.diagnosis &&
            data.diagnosis?.notes !== "" && (
              <label>ملاحظات: {data.diagnosis.notes}</label>
            )}
          {(all || diagnosis) &&
            data.diagnosis &&
            data.diagnosis?.details !== "" && (
              <label>التشخيص: {data.diagnosis.details}</label>
            )} */}
          {data.diagnosis && data.diagnosis?.advices !== "" && (
            <label>نصائح للمريض: {data.diagnosis.advices}</label>
          )}
        </div>
      </div>
      <hr />
      <div className={classes.card}>
        <h3>R/</h3>
        <div className={classes.box}>
          {(all || rosheta) && data.rosheta && data.rosheta.length > 0 && (
            <table className={classes.customTable}>
              {/* <caption>RX</caption> */}
              <tr>
                <th> </th>
                <th></th>
                <th></th>
              </tr>
              {data.rosheta.map((item, idx) => (
                <tr className={classes.roshtaFont}>
                  {/* <td>{idx + 1}.</td> */}
                  <td>{item.name} </td>
                  <td>{item.times}</td>
                  {item.notes !== "" && <td>{item.notes}</td>}
                </tr>
              ))}
            </table>
          )}
          {/* <hr/> */}
        </div>
        <div className={classes.box}>
          {(all || medical) &&
            data.medicalTest &&
            data.medicalTest.length > 0 && (
              <div>
                {/* <hr /> */}
                <div className={classes.dataRow}>
                  <label>Medical Test:</label>
                  {data.medicalTest.map((item, idx) => (
                    <span>
                      {item.name}{" "}
                      {idx + 1 !== data.medicalTest.length ? "-" : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
          {/* <hr/> */}
        </div>
        <div className={classes.box}>
          {(all || xray) && data.xrays && data.xrays.length > 0 && (
            <div className={classes.bdTop}>
              {/* <hr /> */}
              <div className={classes.dataRow}>
                <label>xrays:</label>
                {data.xrays.map((item, idx) => (
                  <span>
                    {item.name} {idx + 1 !== data.xrays.length ? "-" : ""}
                  </span>
                ))}
              </div>
            </div>
            // <table className={classes.customTable}>
            //   <caption>الاشعات المطلوبه</caption>
            //   <tr>
            //     <th>اسم الاشعه</th>
            //     <th>ملاحظات</th>
            //   </tr>
            //   {data.xrays.map((item) => (
            //     <tr>
            //       <td>{item.name}</td>
            //       {item.notes !== "" && <td>{item.notes}</td>}
            //     </tr>
            //   ))}
            // </table>
          )}
          {/* <hr/> */}
        </div>
        <div className={classes.box}>
          <div className={`${classes.bdTop} ${classes.row}`}>
            {(all || food) && data.food && data.food.length > 0 && (
              <div>
                <table className={`${classes.customTable}`}>
                  <caption>الطعام اثناء فتره العلاج</caption>

                  {data.food.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.isOk === true ? "مسموح" : "ممنوع"}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
            {(all || opposite) &&
              data.oppositeMedicines &&
              data.oppositeMedicines.length > 0 && (
                <table className={classes.customTable}>
                  <label>الادويه المحظوره اثناء فتره العلاج</label>
                  {/* <tr>
                    <th>اسم الدواء</th>
                    <th>ملاحظات</th>
                  </tr> */}
                  {data.oppositeMedicines.map((item) => (
                    <tr className={classes.opositeItem}>
                      <td>{item.name}</td>
                      {item.notes !== "" && <td>{item.notes}</td>}
                    </tr>
                  ))}
                </table>
              )}
          </div>
        </div>
        {/* <div className={classes.box}>
          {(all || opposite) &&
            data.oppositeMedicines &&
            data.oppositeMedicines.length > 0 && (
              <table className={classes.customTable}>
                <caption>الادويه المحظوره اثناء فتره العلاج</caption>
                <tr>
                  <th>اسم الدواء</th>
                  <th>ملاحظات</th>
                </tr>
                {data.oppositeMedicines.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    {item.notes !== "" && <td>{item.notes}</td>}
                  </tr>
                ))}
              </table>
            )}
         
        </div> */}
      </div>
      {/* <hr /> */}
      <div className={classes.footer}>
        {/* <hr /> */}
        <div className={classes.col}>
          <span>
            +01063698275
            <FaPhoneFlip />{" "}
          </span>
          <span>
            +01063698275
            <FaSquareWhatsapp />{" "}
          </span>
        </div>
        <div className={classes.col}>
          <span>
            جرجا ميدان المحطه
            <label>
              <FaHouse />
            </label>
          </span>
          <span>
            development team
            <label>
              <FaLaptopCode />
            </label>
          </span>
          <button className="no-print" onClick={printPage}>
            طباعه
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default Printer;
