import classes from "./PatientHistory.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaPrint, FaSquareWhatsapp } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

import { getPatients } from "../services/apiPatients";
import Pagination from "../../../shared/components/ui/Pagnition";
import { formatNumber } from "../../../shared/utils/helper";
import useReservations from "../../Reservation/hooks/useReservetions";
import usePatients from "../hooks/usePatients";
import Spinner from "../../../shared/components/ui/Spinner";
import ErrorFallback from "../../../shared/components/ui/ErrorFallback";

function PatientHostory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const [searchQuery, setSearchQuery] = useState(null);
  const navigate = useNavigate();

  // Date fetching layer
  const { isLoading, patients, error } = usePatients();
  const {
    loadingRevenues: loadingReservations,
    revenues: reservations,
    errorRevenues: errorReservations,
  } = useReservations();

  // Loading/error handling
  if (isLoading || loadingReservations) return <Spinner />;
  if (error || errorReservations) return <ErrorFallback />;

  function getCountReservations(id) {
    let ans = 0;
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].patientID === id) ans++;
    }
    return ans;
  }
  let filteredList = patients;
  if (!isLoading && searchQuery)
    filteredList = patients.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  let bookingsCount = 0;
  if (filteredList !== undefined) {
    bookingsCount = filteredList.length;
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

  return (
    <div className={classes.all}>
      <div className={`${classes.search} no-print`}>
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
          style={{ color: "#439A86" }}
          className="no-print"
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
            <th style={{ textAlign: "center" }}>السن</th>
            <th>رقم الهاتف</th>
            {/* <th>النوع</th> */}
            <th>الزيارات</th>
            <th>ملاحظات</th>
            <th className="noPrint"></th>
          </tr>
          {filteredList.map((item, idx) => (
            <tr key={item.id}>
              <td>{formatNumber((page - 1) * 10 + idx + 1)}</td>
              <td>{item.name}</td>
              <td style={{ textAlign: "center" }}>{formatNumber(item.age)}</td>
              <td>{formatNumber(item.phone)}</td>
              {/* <td>{item.gender === "male" ? "ذكر" : "انثي"}</td> */}
              <td>{formatNumber(getCountReservations(item.id))}</td>
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
