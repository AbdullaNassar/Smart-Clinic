import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import classes from "./Header.module.css";
import LogoHeader from "./LogoHeader";

const StyledHeader = styled.header`
  grid-column: 1/-1;
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media print {
    display: none;
  }

  @media (max-width: 400px) {
    padding: 0;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <LogoHeader />
      <div className={classes.box}>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
