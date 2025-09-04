import { HiOutlineBanknotes, HiOutlineBriefcase } from "react-icons/hi2";

import Stat from "./Stat";
import { formatNumber, formatPrice } from "../../../shared/utils/helper";
import classes from "./Stats.module.css";

function Stats({ bookings = [], confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = formatNumber(bookings.length);

  const sales = bookings.reduce((acc, cur) => acc + cur.bookings.price, 0);

  return (
    <div className={classes.container}>
      <Stat
        title="الحجوزات"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <div className={classes.gap}>
        <Stat
          title="الايرادات"
          color="green"
          icon={<HiOutlineBanknotes />}
          value={formatPrice(sales)}
        />
      </div>
    </div>
  );
}

export default Stats;
