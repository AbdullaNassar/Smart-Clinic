import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import classes from "./Sidebar.module.css";
import { SidebarModal } from "./Modal";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  /* padding: 3.2rem 0rem; */
  padding: 1.2rem 0rem;
  border-right: 1px solid var(--color-grey-100);

  /* grid-column: 1 / 3; */
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-height: 90vh;
  overflow: scroll;
  min-width: 5rem;
  @media (min-width: 1300px) {
    min-width: 30.6rem;
  }
  @media (max-width: 1000px) {
    /* grid-row: 2/-1;
    grid-column: 1/2;
    min-width: 20em; */
  }

  @media print {
    display: none;
  }
`;

function Sidebar() {
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (
    location.pathname === "/ReservationDetails" ||
    location.pathname === "/newReservations" ||
    location.pathname.includes("/patientDetails")
  ) {
    return null;
  }

  return (
    <StyledSidebar>
      <span className={classes.menuIcon} onClick={() => setIsOpenModal(true)}>
        <RiMenu2Fill />
      </span>
      <MainNav />

      <SidebarModal
        isOpen={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      />
    </StyledSidebar>
  );
}

export default Sidebar;
