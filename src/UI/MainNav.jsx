import { NavLink } from "react-router-dom";
import styled from "styled-components";
import classes from "./MainNav.module.css";
import {
  HiArrowSmallDown,
  HiArrowSmallRight,
  HiCurrencyPound,
  HiMiniUserPlus,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyPound,
  HiOutlineDocumentPlus,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineSquaresPlus,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineUsers,
} from "react-icons/hi2";
import {
  FaCalendarDays,
  FaCalendarPlus,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { AiOutlineCalendar, AiTwotoneDatabase } from "react-icons/ai";
import { RiDatabase2Line, RiShoppingCartLine } from "react-icons/ri";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useState } from "react";
import { usePatient } from "../contexts/PatientContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & > * {
    padding: 0 rem;
    border-bottom: 1px solid #d7d5d5;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 1.2rem;

  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 0.8rem;
  transition: all 0.3s;
  & svg {
    /* width: 2.4rem; */
    /* height: 2.4rem; */
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
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
          {/* <StyledDiv>
            <span
              className={classes.open}
              onClick={() => setAppointOpen((e) => !e)}
            >
              {appointOpen ? (
                <HiOutlineChevronDown style={{ height: "2rem" }} />
              ) : (
                <HiOutlineChevronRight style={{ height: "2rem" }} />
              )}
            </span>
            <HiOutlineClock />
            <span className={classes.mgRight}>المواعيد</span>

          
          </StyledDiv> */}

          {appointOpen && (
            <ul className={`${classes.pad} ${classes.flex}`}>
              {/* <li>
                <StyledNavLink to="/newBooking">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>اضافة حجز</span>
                </StyledNavLink>
              </li> */}

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

              {/* <li>
                <StyledNavLink to="/todayBooking">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>مواعيد اليوم</span>
                </StyledNavLink>
              </li> */}

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
              {/* <li>
                <StyledNavLink to="/allBookings">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>قائمه المواعيد</span>
                </StyledNavLink>
              </li> */}
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
          {/* <StyledDiv>
            <span
              className={classes.open}
              onClick={() => setPatientOpen((e) => !e)}
            >
              {patientOpen ? (
                <HiOutlineChevronDown style={{ height: "2rem" }} />
              ) : (
                <HiOutlineChevronRight style={{ height: "2rem" }} />
              )}
            </span>
            <HiOutlineUserGroup />
            <span className={classes.mgRight}>المرضي</span>
          </StyledDiv> */}
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

              {/* <li>
                <StyledNavLink to="/newPatient">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "2rem", opacity: "0" }}
                    />
                  </span>
                  <HiOutlineHome />
                  <span>اضافة مريض</span>
                </StyledNavLink>
              </li> */}
              {/* <li>
                <StyledNavLink to="/patientHistory">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>سجلات المرضي</span>
                </StyledNavLink>
              </li> */}
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
          {/* <StyledDiv>
            <span
              className={classes.open}
              onClick={() => setFinanceOpen((e) => !e)}
            >
              {financeOpen ? (
                <HiOutlineChevronDown style={{ height: "2rem" }} />
              ) : (
                <HiOutlineChevronRight style={{ height: "2rem" }} />
              )}
            </span>
            <HiOutlineCurrencyPound />
            <span className={classes.mgRight}>الماليات</span>
          </StyledDiv> */}
          {financeOpen && (
            <ul className={`${classes.pad} ${classes.flex}`}>
              {/* <li>
                <StyledNavLink to="/revenues">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "1" }}
                    />
                  </span>
                  <span>الايرادات</span>
                </StyledNavLink>
              </li> */}
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
              {/* <li>
                <StyledNavLink to="/expenses">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>المصروفات</span>
                </StyledNavLink>
              </li> */}
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
              {/* <li>
                <StyledNavLink to="/newExpense">
                  <span>
                    <HiOutlineChevronDown
                      style={{ height: "1rem", width: "5.5rem", opacity: "0" }}
                    />
                  </span>
                  <span>تسجيل عمليه نقديه</span>
                </StyledNavLink>
              </li> */}
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
