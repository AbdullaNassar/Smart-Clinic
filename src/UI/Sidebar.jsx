import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";

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
  min-width: 30.6rem;

  @media print {
    display: none;
  }
`;

function Sidebar() {
  const location = useLocation();
  // console.log(location.pathname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (
    location.pathname === "/ReservationDetails" ||
    location.pathname === "/newReservations" ||
    location.pathname.includes("/patientDetails")
  )
    // if (!isSidebarOpen)
    // return (
    //   <span>
    //     <RiMenu2Fill />
    //   </span>
    // );
    return null;
  return (
    <StyledSidebar>
      <MainNav />
      <button className="toggle-button" onClick={toggleSidebar}>
        <span className="toggle-icon"></span>
      </button>
    </StyledSidebar>
  );
}

export default Sidebar;
