import Filter from "../../../shared/components/ui/Filter";
import { formatNumber } from "../../../shared/utils/helper";

function DashboardFilter() {
  let week = `اخر ${formatNumber(7)} ايام`;
  let month = `اخر ${formatNumber(30)} يوم`;
  let quarter = `اخر ${formatNumber(90)} يوم`;
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: week },
        { value: "30", label: month },
        { value: "90", label: quarter },
      ]}
    />
  );
}

export default DashboardFilter;
