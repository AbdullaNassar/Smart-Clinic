import { useQuery } from "@tanstack/react-query";
import { getMedicalTests } from "../services/apiMedicalTest";

const useMedicalTests = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["medicalTests"],
    queryFn: getMedicalTests,
  });

  return {
    loadingMedicalTests: isLoading,
    medicalTests: data,
    errorMedicalTests: error,
  };
};

export default useMedicalTests;
