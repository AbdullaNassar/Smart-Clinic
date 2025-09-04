import { useQuery } from "@tanstack/react-query";
import { getPatientInfo } from "../services/apiPatients";

const usePatientInfo = (patientID) => {
  const { data, isLoading, error } = useQuery(
    ["patientInfo", patientID],
    () => getPatientInfo(patientID),
    {
      enabled: !!patientID,
    }
  );

  return { patientInfo: data, loadingPatient: isLoading, errorPatient: error };
};

export default usePatientInfo;
