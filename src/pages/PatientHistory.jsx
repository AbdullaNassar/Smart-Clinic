import { useEffect, useState } from "react";
import { usePatient } from "../contexts/PatientContext";
import classes from "./PatientHistory.module.css";
import { getPatients } from "../services/apiPatients";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/apiReservation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaPrint, FaSquareWhatsapp } from "react-icons/fa6";
import Pagination from "../UI/Pagnition";
import { IoSearchOutline } from "react-icons/io5";

function PatientHostory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  console.log(page);
  const [searchQuery, setSearchQuery] = useState(null);
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  // console.log(patients);

  const {
    isLoading: loadingReservations,
    data: reservations,
    error: errorReservations,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });
  // console.log(reservations);

  function getCountReservations(id) {
    let ans = 0;
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].patientID === id) ans++;
    }
    return ans;
  }
  // console.log(searchQuery);
  let filteredList = patients;
  if (!isLoading && searchQuery)
    filteredList = patients.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  console.log(filteredList);

  let bookingsCount = 0;
  if (filteredList !== undefined) {
    bookingsCount = filteredList.length;
    console.log(bookingsCount);
    let x = [];
    for (
      let from = (page - 1) * 10, count = 0;
      from < filteredList.length && count < 10;
      count++, from++
    ) {
      x.push(filteredList[from]);
    }
    filteredList = x;
  }

  const navigate = useNavigate();
  return (
    <div className={classes.all}>
      <div className={classes.search}>
        <div className={classes.searchContainer}>
          <input
            placeholder="بحث..."
            type="text"
            id="search"
            className={classes.input}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchParams.set("page", 1);
              setSearchParams(searchParams);
            }}
          />
          <span className={classes.searchIcon}>
            <IoSearchOutline />
          </span>
        </div>
        <span
          onClick={() => {
            window.print();
          }}
        >
          <FaPrint />
        </span>
      </div>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && !loadingReservations && (
        <table className={classes.customers}>
          <tr>
            <th></th>
            <th>الاسم</th>
            {/* <th>الرقم</th> */}
            <th style={{ textAlign: "center" }}>السن</th>
            <th>رقم الهاتف</th>
            <th>النوع</th>
            <th>الزيارات</th>
            <th>ملاحظات</th>
            <th className="noPrint"></th>
          </tr>
          {filteredList.map((item, idx) => (
            <tr>
              <td>{(page - 1) * 10 + idx + 1}</td>
              <td>{item.name}</td>
              {/* <td>{item.id}</td> */}
              <td style={{ textAlign: "center" }}>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>{getCountReservations(item.id)}</td>
              <td>{item.notes}</td>
              <td className={`${classes.option} noPrint`}>
                <a
                  className="btnOutlined"
                  onClick={() => {
                    navigate(`/patientDetails/${item.id}`);
                  }}
                >
                  تفاصيل
                </a>
                <Link
                  className={classes.whats}
                  to={`https://wa.me/+20${item.phone}`}
                  target="_blank"
                >
                  <span>
                    <FaSquareWhatsapp />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      )}
      {filteredList !== undefined && <Pagination count={bookingsCount} />}
    </div>
  );
}
export default PatientHostory;
