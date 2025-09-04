import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getReservations,
  updateReservation,
  updateReservationColumn,
} from "../services/apiReservation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./ShowReservation.module.css";
import { useState } from "react";
import QuickCheck from "../../Kashf/components/QuickCheck";
import OldDiasies from "../../Kashf/components/OldDiasies";
import Symptoms from "../../Kashf/components/Symptoms";
import Diagnosis from "../../Kashf/components/Diagnosis";
import Rosheta from "../../Kashf/components/Rosheta";
import MedicalTests from "../../Kashf/components/MedicalTests";
import Xrays from "../../Kashf/components/Xrays";
import Food from "../../Kashf/components/Food";
import OpposingMedications from "../../Kashf/components/OpposingMedications";
import { getPatientInfo } from "../../patient/services/apiPatients";
import PatientInfo from "../../Kashf/components/PatientInfo";
import Printer from "../../Kashf/components/Printer";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import PrinterSetting from "../../Kashf/components/PrinterSetting";
import useReservations from "../hooks/useReservetions";
function ShowReservation() {
  const [all, setAll] = useState(false);
  const [quick, setQuick] = useState(false);
  const [diagnosis, setDiagonsis] = useState(false);
  const [rosheta, setRosheta] = useState(false);
  const [medical, setMedical] = useState(false);
  const [xray, setXray] = useState(false);
  const [food, setFood] = useState(false);
  const [opposite, setOpposite] = useState(false);

  const [cur, setCur] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientID = searchParams.get("patID");
  const bookingID = searchParams.get("bokID");

  const {
    revenues: reservations,
    errorRevenues: error,
    loadingRevenues: isLoading,
  } = useReservations();

  const queryClient = useQueryClient();

  let dataReserv;
  let reservationID;

  const mutation = useMutation((params) => updateReservationColumn(...params), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
      toast.success("تم تعديل البيانات بنجاح");
    },
    onError: (error) => {
      toast.error("خطأ في تعديل البيانات: " + error.message);
    },
  });
  const {
    data: patientData,
    isLoading: loadingPatient,
    error: errorPatient,
  } = useQuery(["patientInfo", patientID], () => getPatientInfo(patientID));
  if (isLoading) return <h2>Loading...</h2>;
  function isFound() {
    if (reservations !== undefined) {
      for (let i = 0; i < reservations.length; i++) {
        if (
          reservations[i].bookingID == bookingID &&
          reservations[i].patientID == patientID
        ) {
          reservationID = reservations[i].id;
          dataReserv = reservations[i];
          return true;
        }
      }
      return false;
    }
    return false;
  }
  if (!isFound()) return <h2>لا يوجد تفاصيل كشف لهذا الحجز</h2>;

  function switchTab(id) {
    setCur(id);
  }

  function saveData(type, data) {
    switch (type) {
      case "quickCheck": {
        const id = reservationID;
        const columnName = "quickCheck";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        break;
      }
      case "oldDisease": {
        const id = reservationID;
        const columnName = "oldDisease";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);

        break;
      }
      case "symptoms": {
        const id = reservationID;
        const columnName = "symptoms";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);

        break;
      }
      case "diagnosis": {
        const id = reservationID;
        const columnName = "diagnosis";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        break;
      }
      case "rosheta": {
        const id = reservationID;
        const columnName = "rosheta";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);

        break;
      }
      case "medicalTests": {
        const id = reservationID;
        const columnName = "medicalTest";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        break;
        // mutate(dataReserv)
      }
      case "xrays": {
        const id = reservationID;
        const columnName = "xrays";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        //   setDataReserv((prev)=>({...prev, xrays:data}));
        break;
      }
      case "foods": {
        const id = reservationID;
        const columnName = "food";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        break;
      }
      case "oppositeMedicines": {
        const id = reservationID;
        const columnName = "oppositeMedicines";
        const columnValue = data;
        const params = [id, columnName, columnValue];
        mutation.mutate(params);
        //   setDataReserv((prev)=>({...prev, oppositeMedicines:data}));
        // mutate(dataReserv);
        break;
      }
      default:
    }
    //   mutate(dataReserv);
  }
  const dummyarray = [];
  return (
    <div className={classes.all}>
      {cur !== 100 && (
        <div className={classes.btns}>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 0 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(0)}
          >
            بيانات المريض
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 1 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(1)}
          >
            فحص سريع
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 2 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(2)}
          >
            امراض سابقه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 3 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(3)}
          >
            الاعراض
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 4 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(4)}
          >
            التشخيص
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 5 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(5)}
          >
            الروشته العلاجيه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 6 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(6)}
          >
            التحاليل المطلوبه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 7 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(7)}
          >
            الاشعات المطلوبه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 8 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(8)}
          >
            الاكل المحدد
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 9 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(9)}
          >
            الادويه المتعارضه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 10 || cur === 11 ? "#cadef1" : "",
            }}
            onClick={() => switchTab(10)}
          >
            طباعه
          </Button>
          <Button
            variant="text"
            style={{
              fontSize: "16px",
              backgroundColor: cur === 0 ? "#cadef1" : "",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            اغلاق
          </Button>
        </div>
      )}
      {cur === 0 && (
        <PatientInfo
          data={patientData}
          isLoading={loadingPatient}
          error={errorPatient}
        />
      )}
      {cur === 1 && (
        <QuickCheck data={dataReserv.quickCheck} saveData={saveData} />
      )}
      {cur === 2 && (
        <OldDiasies
          data={
            dataReserv.oldDisease === null ? dummyarray : dataReserv.oldDisease
          }
          saveData={saveData}
        />
      )}
      {cur === 3 && (
        <Symptoms
          data={dataReserv.symptoms === null ? dummyarray : dataReserv.symptoms}
          saveData={saveData}
        />
      )}
      {cur === 4 && (
        <Diagnosis data={dataReserv.diagnosis} saveData={saveData} />
      )}
      {cur === 5 && (
        <Rosheta
          data={dataReserv.rosheta === null ? dummyarray : dataReserv.rosheta}
          saveData={saveData}
        />
      )}
      {cur === 6 && (
        <MedicalTests
          data={
            dataReserv.medicalTest === null
              ? dummyarray
              : dataReserv.medicalTest
          }
          saveData={saveData}
        />
      )}
      {cur === 7 && (
        <Xrays
          data={dataReserv.xrays === null ? dummyarray : dataReserv.xrays}
          saveData={saveData}
        />
      )}
      {cur === 9 && (
        <OpposingMedications
          data={
            dataReserv.oppositeMedicines === null
              ? dummyarray
              : dataReserv.oppositeMedicines
          }
          saveData={saveData}
        />
      )}
      {cur === 10 && (
        <PrinterSetting
          func={switchTab}
          all={all}
          setAll={setAll}
          quick={quick}
          setQuick={setQuick}
          diagnosis={diagnosis}
          setDiagonsis={setDiagonsis}
          rosheta={rosheta}
          setRosheta={setRosheta}
          medical={medical}
          setMedical={setMedical}
          xray={xray}
          setXray={setXray}
          food={food}
          setFood={setFood}
          opposite={opposite}
          setOpposite={setOpposite}
        />
      )}
      {cur === 11 && (
        <Printer
          data={dataReserv}
          patientinfo={patientData}
          all={all}
          quick={quick}
          diagnosis={diagnosis}
          rosheta={rosheta}
          medical={medical}
          xray={xray}
          food={food}
          opposite={opposite}
        />
      )}
    </div>
  );
}
export default ShowReservation;
