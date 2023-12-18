import classes from "./Store.module.css";
function Store() {
  return (
    <table className={classes.styledTable}>
      <thead>
        <tr>
          <th>النوع</th>
          <th>الاسم</th>
          <th>السعر</th>
          <th>الكميه المتاحه</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>johndoe@example.com</td>
          <td>123-456-7890</td>
        </tr>
      </tbody>
    </table>
  );
}
export default Store;
