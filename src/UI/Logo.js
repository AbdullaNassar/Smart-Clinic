import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="https://p7.hiclipart.com/preview/957/974/456/hospital-logo-clinic-health-care-physician-business.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

