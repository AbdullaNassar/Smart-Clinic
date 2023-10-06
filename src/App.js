import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NewPatient from "./pages/NewPatient";
import PatientHostory from "./pages/PatientHistory";
import Reply from "./pages/Reply";
import { PatientProvider } from "./contexts/PatientContext";
import DailyInfo from "./pages/DailyInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Patients from "./features/patient/Patients";
import Booking from "./features/Booking/Booking";
import NewBooking from "./features/Booking/NewBooking";
import AllBookings from "./features/Booking/AllBookings";
import Reservation from "./features/Reservation/Reservation";
import AllReservations from "./features/Kashf/AllReservations";
import NewReservation from "./features/Kashf/NewReservation";
const queryClient =new QueryClient({
  defaultOptions:{
    queries:{
      // staleTime:60*1000
      staleTime:0
    }
  }
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/newPatient" element={<NewPatient/>} />
          <Route path="/patients" element={<Patients/>} />
          <Route path="/patientHistory" element={<PatientHostory/>}/>
          <Route path="/booking" element={<Booking/>} />
          <Route path="/allBookings" element={<AllBookings/>}/>
          <Route path="/newBooking" element={<NewBooking/>} />
          <Route path="/reservations" element={<Reservation/>} />
          <Route path="/newReservations" element={<NewReservation/>} />
          <Route path="/allReservations" element={<AllReservations/>} />
          <Route path="/dailyInfo" element={<DailyInfo/>}/>
        </Routes>
      </BrowserRouter>
    </PatientProvider>
    </QueryClientProvider>
  );
}

export default App;
