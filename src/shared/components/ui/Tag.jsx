import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  /* Responsive styles */
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.3rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.8rem;
  }
`;

export default Tag;
