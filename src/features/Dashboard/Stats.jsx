import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
  } from "react-icons/hi2";
  import Stat from "./Stat";
  import { formatCurrency } from "../../utils/helper"; 
  
  function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1.
    const numBookings = bookings.length;
  
    // // 2.

     
    const sales = bookings.reduce((acc, cur) => acc + cur.bookings.price, 0);
    console.log(sales)
    // // 3.
    // const checkins = confirmedStays.length;
  
    // // 4.
    // const occupation =
    //   confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    //   (numDays * cabinCount);
    // // num checked in nights / all available nights (num days * num cabins)
  
    return (
      <>
        <Stat
          title="الحجوزات"
          color="blue"
          icon={<HiOutlineBriefcase />}
          value={numBookings}
        />
        <Stat
          title="الايرادات"
          color="green"
          icon={<HiOutlineBanknotes />}
          value={formatCurrency(sales)}
          // value={formatCurrency(2400)}
        />
        {/* <Stat
          title="Check ins"
          color="indigo"
          icon={<HiOutlineCalendarDays />}
        //   value={checkins}
          value={30}
        /> */}
        <Stat
          title="معدل الزياده"
          color="yellow"
          icon={<HiOutlineChartBar />}
        //   value={Math.round(occupation * 100) + "%"}
          value={Math.round(34) + "%"}
        />
      </>
    );
  }
  
  export default Stats;