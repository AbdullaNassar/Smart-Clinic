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
      {/* <Img src="https://p7.hiclipart.com/preview/957/974/456/hospital-logo-clinic-health-care-physician-business.jpg" alt="Logo" /> */}
      <Img src="https://img.freepik.com/premium-vector/avatar-icon_791764-3659.jpg?w=740" alt="Logo" />
      {/* <Img src="https://img.freepik.com/free-vector/doctor-with-medical-service-icons_24877-51508.jpg?w=740&t=st=1698751192~exp=1698751792~hmac=9ace77ac821185c9b057cf317771b60c9e22b83bc2f8b3734b4df0a42ad3df34" alt="Logo" /> */}
      {/* <Img src="https://img.freepik.com/premium-photo/minimal-doctor-symbol-blue-background-3d-rendering_750318-39.jpg?w=740" alt="Logo" /> */}
    </StyledLogo>
  );
}

export default Logo;

