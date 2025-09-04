import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../../shared/components/ui/ButtonIcon";
import { useLogout } from "../hooks/useLogout";
import SpinnerMini from "../../../shared/components/ui/SpinnerMini";
function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
