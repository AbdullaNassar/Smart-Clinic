import styled from "styled-components";

const DashboardBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 1000px) {
    padding: 2rem;
    gap: 1.6rem;
  }

  @media (max-width: 750px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: var(--border-radius-sm);
  }
`;

export default DashboardBox;
