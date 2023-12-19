import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useLocation } from "react-router-dom";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0rem;
  border-right: 1px solid var(--color-grey-100);

  /* grid-column: 1 / 3; */
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-height: 90vh;
  overflow: scroll;
  min-width: 30.6rem;

  @media print {
    display: none;
  }
`;

function Sidebar() {
  const location = useLocation();
  console.log(location.pathname);

  if (
    location.pathname === "/ReservationDetails" ||
    location.pathname === "/newReservations" ||
    location.pathname.includes("/patientDetails")
  )
    return null;
  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <MainNav />

      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
