import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../UI/Tag";
import { Flag } from "../../UI/Flag";
import Button from "../../UI/Button";
// import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  /* grid-template-columns: 9rem 2rem 1fr 7rem 9rem; */
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, patients, type, price } = activity;

  return (
    <StyledTodayItem>
      {status === "تم الدخول والخروج" && <Tag type="green">تم الدخول والخروج</Tag>}
      {status === "لم يتم الدخول للدكتور" && <Tag type="blue">انتظار</Tag>}
      {status === "بالداخل عند الدكتور" && <Tag type="red">بالداخل عند الدكتور</Tag>}

      {/* <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} /> */}
      <Guest>{patients?.name}</Guest>
      <div>{type}</div>
      <div>{price}</div>
      {/* <div>{numNights} nights</div> */}

      {/* {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />} */}
    </StyledTodayItem>
  );
}

export default TodayItem;