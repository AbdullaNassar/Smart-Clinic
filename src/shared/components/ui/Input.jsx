import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  text-align: right;
  direction: rtl;
  box-shadow: var(--shadow-sm);
  transition: border 0.2s ease-in-out;

  &:focus {
    outline: none;
    border: 1px solid var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export default Input;
