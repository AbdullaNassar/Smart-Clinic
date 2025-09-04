import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  /* margin-bottom: 1.2rem; */
  text-align: right;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.4rem;
  color: #333;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
