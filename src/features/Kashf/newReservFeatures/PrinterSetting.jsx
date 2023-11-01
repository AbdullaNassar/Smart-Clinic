import { useState } from "react";
import classes from "./PrinterSetting.module.css";
import { Button } from "@mui/material";

function PrinterSetting({func,all,setAll,quick,setQuick,diagnosis,setDiagonsis,rosheta,setRosheta,medical,setMedical,xray,setXray,food,setFood,opposite,setOpposite}){
 
    

    // console.log(all,quick,diagnosis,rosheta,medical,xray,food,opposite);

    return(
        <div className={classes.info}>
            <div className={classes.row}>
                <input id='all' type="checkbox" checked={all||all} onChange={()=>setAll(x=>!x)}/>
                <label htmlFor="all">الكل</label>
            </div>
            <div className={classes.row}>
                <input disabled={all} id="quick" type="checkbox"  checked={quick||all} onChange={()=>setQuick(e=>!e)}/>
                <label htmlFor="quick">فحص سريع</label>
            </div>
            {/* <div>
                <input type="checkbox"  checked={diagnosis} onChange={()=>setDiagonsis(e=>!e)}/>
                <label>التشخيص</label>
            </div> */}
            <div className={classes.row}>
                <input disabled={all} id="rosheta" type="checkbox"  checked={rosheta||all} onChange={()=>setRosheta(e=>!e)}/>
                <label htmlFor="rosheta">الروشته العلاجيه</label>
            </div>
            <div className={classes.row}>
                <input disabled={all} id="medical" type="checkbox"  checked={medical||all} onChange={()=>setMedical(e=>!e)}/>
                <label htmlFor="medical">التحاليل المطلوبه</label>
            </div>
            <div className={classes.row}>
                <input disabled={all} id="xray" type="checkbox"  checked={xray||all} onChange={()=>setXray(e=>!e)}/>
                <label htmlFor="xray">الاشعات المطلوبه</label>
            </div>
            <div className={classes.row}>
                <input disabled={all} id="food" type="checkbox"  checked={food||all} onChange={()=>setFood(e=>!e)}/>
                <label htmlFor="food">الطعام المحدد</label>
            </div>
            <div className={classes.row}>
                <input disabled={all} id="opposite" type="checkbox"  checked={opposite||all} onChange={()=>setOpposite(e=>!e)}/>
                <label htmlFor="opposite">الادويه المتعارضه</label>
            </div>

            <Button variant="contained" style={{fontSize:"14px", width:"100%"}} onClick={()=>{
                func(11);
            }}>الذهاب للطباعه</Button>
        </div>
    );
}
export default PrinterSetting;