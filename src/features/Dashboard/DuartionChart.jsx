import styled from "styled-components";
import Heading from "../../UI/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
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

  /* my style */
  width: 500px;
    margin-right: 25px;
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
//   {
//     duration: "4-5 nights",
//     value: 0,
//     color: "#84cc16",
//   },
//   {
//     duration: "6-7 nights",
//     value: 0,
//     color: "#22c55e",
//   },
//   {
//     duration: "8-14 nights",
//     value: 0,
//     color: "#14b8a6",
//   },
//   {
//     duration: "15-21 nights",
//     value: 0,
//     color: "#3b82f6",
//   },
//   {
//     duration: "21+ nights",
//     value: 0,
//     color: "#a855f7",
//   },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.bookings.type;
      if (num === 'حجز عادي')  return incArrayValue(arr, "حجز عادي")
      if (num === 'حجز مستعجل') return incArrayValue(arr, "حجز مستعجل");
      if (num === 'اعادة كشف')  return incArrayValue(arr, "اعاده كشف");
    
     
    //   return incArrayValue(arr, "كشف عادي");
    //   if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
    //   if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
    //   if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
    //   if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
    //   if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
//   const { isDarkMode } = useDarkMode();
const isDarkMode=false;
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
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