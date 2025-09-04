import styled from "styled-components";

import Tag from "../../../shared/components/ui/Tag";
import { formatPrice } from "../../../shared/utils/helper";

const StyledTodayItem = styled.li`
  display: grid;
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
      {status === "تم الدخول والخروج" && <Tag type="green">تمت الزيارة</Tag>}
      {status === "لم يتم الدخول للدكتور" && <Tag type="blue">انتظار</Tag>}
      {status === "بالداخل عند الدكتور" && <Tag type="red">عند الطبيب</Tag>}

      {/* <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} /> */}
      <Guest>{patients?.name}</Guest>
      <div>{type}</div>
      <div>{formatPrice(price)}</div>
    </StyledTodayItem>
  );
}

export default TodayItem;
