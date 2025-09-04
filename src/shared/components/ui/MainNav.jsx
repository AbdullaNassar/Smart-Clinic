import styled from "styled-components";
import classes from "./MainNav.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineCurrencyPound,
  HiOutlineDocumentPlus,
  HiOutlineHome,
  HiOutlineSquaresPlus,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { RiDatabase2Line } from "react-icons/ri";
import { CiMoneyCheck1 } from "react-icons/ci";
import { usePatient } from "../../../features/patient/context/PatientContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & > * {
    padding: 0 rem;
    border-bottom: 1px solid #d7d5d5;
  }
  & > *:last-child {
    border-bottom: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 0.8rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: white;
    /* background-color: var(--color-grey-50); */
    background-color: var(--color-primary-light);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    /* width: 2.4rem; */
    /* height: 2.4rem; */
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    /* color: var(--color-brand-600); */
    color: #efefef;
  }
`;

function MainNav({ modal, onClick }) {
  const [appointOpen, setAppointOpen] = useState(true);
  const [patientOpen, setPatientOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const { openPatientModal } = usePatient();
  return (
    <nav className={`${!modal ? classes.navHidden : ""}`}>
      <NavList>
        <li onClick={onClick}>
          <StyledNavLink to="/">
            <span>
              <HiOutlineChevronDown style={{ height: "2rem", opacity: "0" }} />
            </span>
            <HiOutlineHome />
            <span>نظره عامه</span>
          </StyledNavLink>
        </li>
        <li onClick={onClick}>
          {appointOpen && (
            <ul className={`${classes.pad} ${classes.flex}`}>
              <li onClick={onClick}>
                <StyledNavLink to="/newBooking">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineSquaresPlus />
                  <span>اضافة حجز</span>
                </StyledNavLink>
              </li>

              <li onClick={onClick}>
                <StyledNavLink to="/todayBooking">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineClock />
                  <span>مواعيد اليوم</span>
                </StyledNavLink>
              </li>
              <li onClick={onClick}>
                <StyledNavLink to="/allBookings">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineCalendarDays />
                  <span>قائمه المواعيد</span>
                </StyledNavLink>
              </li>
            </ul>
          )}
        </li>

        <li onClick={onClick}>
          {patientOpen && (
            <ul className={`${classes.pad} ${classes.flex}`}>
              <li
                onClick={() => {
                  openPatientModal();
                  onClick();
                }}
              >
                <StyledNavLink to="/newPatient">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>

                  <HiOutlineUserPlus />

                  <span>اضافة مريض</span>
                </StyledNavLink>
              </li>

              <li onClick={onClick}>
                <StyledNavLink to="/patientHistory">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineUserGroup />
                  <span>سجلات المرضي</span>
                </StyledNavLink>
              </li>
            </ul>
          )}
        </li>

        <li>
          {financeOpen && (
            <ul className={`${classes.pad} ${classes.flex}`}>
              <li onClick={onClick}>
                <StyledNavLink to="/revenues">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineCurrencyPound />
                  <span>الايرادات</span>
                </StyledNavLink>
              </li>
              <li onClick={onClick}>
                <StyledNavLink to="/expenses">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <CiMoneyCheck1 />
                  <span>المصروفات</span>
                </StyledNavLink>
              </li>
              <li onClick={onClick}>
                <StyledNavLink to="/newExpense">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineDocumentPlus />
                  <span>تسجيل عملية نقديه</span>
                </StyledNavLink>
              </li>
            </ul>
          )}
        </li>
        <li onClick={onClick}>
          <StyledNavLink to="/store">
            <span>
              <HiOutlineChevronDown style={{ height: "2rem", opacity: "0" }} />
            </span>
            <RiDatabase2Line />
            <span>المخزن</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
//     border-bottom: 1px solid #bfbfbf;
