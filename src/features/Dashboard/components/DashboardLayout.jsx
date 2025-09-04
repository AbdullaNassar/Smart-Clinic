import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "../hooks/useRecentBookings";
import Spinner from "../../../shared/components/ui/Spinner";
import SalesChart from "./SalesChart";
import DurationChart from "./DuartionChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 34rem 34rem;
    gap: 1.2rem;
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
  if (isLoading1) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} />
      <TodayActivity />
      <DurationChart confirmedStays={bookings} />
      <div style={{ gridColumn: "1/-1", fontSize: "1.6rem", width: "100%" }}>
        <SalesChart bookings={bookings} numDays={numDays} />
      </div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
