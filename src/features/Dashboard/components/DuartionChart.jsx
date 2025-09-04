import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Heading from "../../../shared/components/ui/Heading";
import { formatNumber } from "../../../shared/utils/helper";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media (max-width: 1000px) {
    grid-row: 4/5;
    grid-column: 1/2;
  }
`;

const startDataLight = [
  {
    duration: "حجز عادي",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "حجز مستعجل",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "اعاده كشف",
    value: 0,
    color: "#22c55e",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.bookings.type;
      if (num === "حجز عادي") return incArrayValue(arr, "حجز عادي");
      if (num === "حجز مستعجل") return incArrayValue(arr, "حجز مستعجل");
      if (num === "اعادة كشف") return incArrayValue(arr, "اعاده كشف");

      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const startData = startDataLight;
  const data = prepareData(startData, confirmedStays);
  if (!data.length)
    return (
      <ChartBox className="text-3xl font-semibold">
        لا توجد إيرادات اخر {formatNumber(numDays)} ايام
      </ChartBox>
    );
  return (
    <ChartBox>
      <Heading as="h2">انواع الايرادات</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
