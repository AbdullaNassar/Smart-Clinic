import { useState } from "react";
import classes from "./DailyInfo.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint } from "react-icons/fa6";
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { usePatient } from "../contexts/PatientContext";

const initData=[
    {
        name:"عبدالله مؤمن محمود",
        age:23,
        type:"حجز جديد",
        date:new Date(),
        notes:"",
    },
    {
        name:"طه بندو",
        age:21,
        type:"اعاده كشف",
        date:new Date(),
        notes:"",
    },
    {
        name:"محمد يسري",
        age:26,
        type:"حجز جديد",
        date:new Date(),
        notes:"",
    },
];
function DailyInfo(){
    const{patients}=usePatient();
    const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

    function formatTime(date) {
        return new Intl.DateTimeFormat("en", {
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(date);
      }
    const [startDate, setStartDate] = useState(new Date());
    // console.log((startDate));

    const filteredList = patients.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getDate() === startDate.getDate() &&
          itemDate.getMonth() === startDate.getMonth() &&
          itemDate.getFullYear() === startDate.getFullYear()
        );
      });
      
      console.log(filteredList);

      useEffect(() => {
        const handleAfterPrint = () => {
          generatePDF();
          window.removeEventListener('afterprint', handleAfterPrint);
        };
    
        window.addEventListener('afterprint', handleAfterPrint);
    
        return () => {
          window.removeEventListener('afterprint', handleAfterPrint);
        };
      }, []);
    
      const generatePDF = () => {
        const doc = new jsPDF();
        doc.html(document.body, {
          callback: function () {
            doc.save('webpage.pdf');
          },
        });
      };
    
      const handleSavePDF = () => {
        window.print();
      };
      
    return(
        <div>
            <div className={classes.header}>
                <div>
                    <time>{formatDate(startDate)} </time>
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setStartDate(newDate);
                    }}>-</button>
                    <button onClick={()=>{
                        const newDate = new Date(startDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setStartDate(newDate);
                    }}>+</button>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate((date))} />
                </div>
                <div onClick={handleSavePDF} className={classes.print}>
                    <label>طباعة</label>
                    <span ><FaPrint/></span>
                </div>
            </div>
            <div>
            <table className={classes.customers}>
                <tr>
                    <th>الاسم</th>
                    <th>السن</th>
                    <th>نوع الحجز</th>
                    <th>تاريخ الحجز</th>
                    <th>ملاحظات</th>
                </tr>
                {filteredList.map(item=>
                <tr>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.type}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.notes}</td>
                </tr>)}
               
            </table>
              
            </div>
        </div>
    );
}
export default DailyInfo;