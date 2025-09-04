import styled from "styled-components";
import Logout from "../../../features/authentication/components/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0;
  padding-left: 0.5rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
