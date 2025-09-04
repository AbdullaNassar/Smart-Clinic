import styled from "styled-components";
import { ar } from "date-fns/locale";
import DashboardBox from "./DashboardBox";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Heading from "../../../shared/components/ui/Heading";
import { formatNumber } from "../../../shared/utils/helper";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 1000px) {
    /* max-width: 50rem; */
    max-width: 100%;
  }
`;

function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    const day = formatNumber(format(date, "d")); // Arabic digits for day
    const month = format(date, "MMMM", { locale: ar }); // Arabic month name

    return {
      label: `${day} ${month}`,
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.bookings.price, 0),
    };
  });

  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    // extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  const startDate = allDates.at(0);
  const endDate = allDates.at(-1);

  const formattedStart = `${format(startDate, "MMMM", {
    locale: ar,
  })} ${formatNumber(format(startDate, "dd"))} ${formatNumber(
    format(startDate, "yyyy")
  )}`;
  const formattedEnd = `${format(endDate, "MMMM", {
    locale: ar,
  })} ${formatNumber(format(endDate, "dd"))} ${formatNumber(
    format(endDate, "yyyy")
  )}`;
  return (
    <StyledSalesChart>
      <Heading as="h2">
        الايرادات من: {formattedStart} &mdash;
        {formattedEnd}
      </Heading>
      <ResponsiveContainer height={300} width="90%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="ج.م"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="اجمالي الارباح"
            unit="ج.م"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
