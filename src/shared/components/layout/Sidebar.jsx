import classes from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import styled from "styled-components";

import MainNav from "../ui/MainNav";
import { useState } from "react";
import { SidebarModal } from "../ui/Modal";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.2rem 0rem;
  border-right: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-height: 90vh;
  overflow-y: scroll;
  min-width: 5rem;
  @media (min-width: 1300px) {
    min-width: 30.6rem;
  }
  @media (max-width: 1000px) {
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
