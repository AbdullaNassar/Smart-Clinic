import classes from "./NewReservation.module.css";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import PatientInfo from "../../Kashf/components/PatientInfo";
import Diagnosis from "../../Kashf/components/Diagnosis";
import MedicalTests from "../../Kashf/components/MedicalTests";
import OldDiasies from "../../Kashf/components/OldDiasies";
import OpposingMedications from "../../Kashf/components/OpposingMedications";
import Printer from "../../Kashf/components/Printer";
import QuickCheck from "../../Kashf/components/QuickCheck";
import Rosheta from "../../Kashf/components/Rosheta";
import Symptoms from "../../Kashf/components/Symptoms";
import Xrays from "../../Kashf/components/Xrays";
import supabase from "../../../shared/services/supabase";
import { getPatientInfo } from "../../patient/services/apiPatients";
import { Button } from "@mui/material";
import { ConfirmationModal } from "../../../shared/components/ui/Modal";
import PrinterSetting from "../../Kashf/components/PrinterSetting";
import useCreateReservation from "../hooks/useCreateReservation";
import useUpdateBooking from "../../Booking/hooks/useUpdateBooking";
import usePatientInfo from "../../patient/hooks/usePatientInfo";

function NewReservation() {
  const [searchParams] = useSearchParams();
  const [all, setAll] = useState(false);
  const [quick, setQuick] = useState(false);
  const [diagnosis, setDiagonsis] = useState(false);
  const [rosheta, setRosheta] = useState(false);
  const [medical, setMedical] = useState(false);
  const [xray, setXray] = useState(false);
  const [food, setFood] = useState(false);
  const [opposite, setOpposite] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const patientID = searchParams.get("patID");
  const bookingID = searchParams.get("bokID");

  // Data fetching layer
  const { data, isLoading, error } = useQuery(["patientInfo", patientID], () =>
    getPatientInfo(patientID)
  );
  const { isAdding, mutate } = useCreateReservation();
  const mutation = useUpdateBooking();

  const initData = {
    patientID: patientID,
    bookingID: bookingID,
  };
  const [dataReserv, setDataReserv] = useState(initData);

  function saveData(type, data) {
    switch (type) {
      case "quickCheck": {
        setDataReserv((prev) => ({ ...prev, quickCheck: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "oldDisease": {
        setDataReserv((prev) => ({ ...prev, oldDisease: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "symptoms": {
        setDataReserv((prev) => ({ ...prev, symptoms: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "diagnosis": {
        setDataReserv((prev) => ({ ...prev, diagnosis: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "rosheta": {
        setDataReserv((prev) => ({ ...prev, rosheta: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "medicalTests": {
        setDataReserv((prev) => ({ ...prev, medicalTest: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "xrays": {
        setDataReserv((prev) => ({ ...prev, xrays: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "foods": {
        setDataReserv((prev) => ({ ...prev, food: data }));
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      case "oppositeMedicines": {
        setDataReserv((prev) => ({ ...prev, oppositeMedicines: data }));
        // mutate(dataReserv);
        toast.success("تم حفظ البيانات بنجاح");
        break;
      }
      default:
        toast.error("cant define type");
    }
  }
  async function getData() {
    let { data, error } = await supabase.from("Reservations").select("*");
    if (!error) console.log(data[0].test.name);
  }
  getData();
  const [cur, setCur] = useState(0);
  function switchTab(id) {
    setCur(id);
  }
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
            style={{ fontSize: "16px" }}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            انهاء الكشف
          </Button>
        </div>
      )}
      <ConfirmationModal
        isOpen={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onConfirm={() => {
          const id = bookingID;
          const columnName = "status";
          const columnValue = "تم الدخول والخروج";
          const params = [id, columnName, columnValue];
          mutation.mutate(params);
          mutate(dataReserv);
          navigate(-1);
          setIsOpenModal(false);
        }}
      />
      {cur === 0 && (
        <PatientInfo data={data} isLoading={isLoading} error={error} />
      )}
      {cur === 1 && (
        <QuickCheck data={dataReserv.quickCheck} saveData={saveData} />
      )}
      {cur === 2 && (
        <OldDiasies data={dataReserv.oldDisease} saveData={saveData} />
      )}
      {cur === 3 && <Symptoms data={dataReserv.symptoms} saveData={saveData} />}
      {cur === 4 && (
        <Diagnosis data={dataReserv.diagnosis} saveData={saveData} />
      )}
      {cur === 5 && <Rosheta data={dataReserv.rosheta} saveData={saveData} />}
      {cur === 6 && (
        <MedicalTests data={dataReserv.medicalTest} saveData={saveData} />
      )}
      {cur === 7 && <Xrays data={dataReserv.xrays} saveData={saveData} />}
      {/* {cur === 8 && <Food data={dataReserv.food} saveData={saveData} />} */}
      {cur === 9 && (
        <OpposingMedications
          data={dataReserv.oppositeMedicines}
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
          patientinfo={data}
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
export default NewReservation;
