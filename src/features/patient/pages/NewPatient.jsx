import classes from "./NewPatient.module.css";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import { AddPatientModal } from "../../../shared/components/ui/Modal";

function NewPatient() {
  const navigate = useNavigate();
  const { isAddPatientModal, closePatientModal } = usePatient();

  function onCancel() {
    navigate(-1);
    closePatientModal();
  }

  return (
    <div className={classes.all}>
      <AddPatientModal isOpen={isAddPatientModal} onCancel={onCancel} />
    </div>
  );
}
export default NewPatient;
