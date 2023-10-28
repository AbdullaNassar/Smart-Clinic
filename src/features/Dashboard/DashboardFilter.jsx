import Filter from "../../UI/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "اخر 7 ايام" },
        { value: "30", label: "اخر 30 يوم" },
        { value: "90", label: "اخر 90 يوم" },
      ]}
    />
  );
}

export default DashboardFilter;