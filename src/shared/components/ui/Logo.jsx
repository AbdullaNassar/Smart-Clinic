import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img
        src="https://res.cloudinary.com/deuxt0stn/image/upload/v1756959504/hospital-logo-clinic-health-care-physician-business_1_sxsstf.png"
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
