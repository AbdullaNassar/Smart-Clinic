import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NewPatient from "./pages/NewPatient";
import PatientHostory from "./pages/PatientHistory";
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
import TodayBooking from "./features/Booking/TodayBooking";
import PatientDetails from "./features/patient/PatientDetails";
import ShowReservation from "./features/Kashf/displayReservation/ShowReservation";
import ExpensesRevenues from "./features/ExpensesRevenues/ExpensesRevenues";
import NewExpense from "./features/ExpensesRevenues/NewExpense";
import NewRevenue from "./features/ExpensesRevenues/NewRevenue";
import ShowExpenses from "./features/ExpensesRevenues/ShowExpenses";
import ShowRevenues from "./features/ExpensesRevenues/ShowRevenues";
import Settings from "./features/seetings/Settings";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./UI/ProtectedRoute";
import SignupForm from "./features/authentication/SignupForm";
import { Toaster } from "react-hot-toast";
import AppLayout from "./UI/AppLayout";
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
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              // <ProtectedRoute>
                <AppLayout/>
              // </ProtectedRoute>
              }
              >
              
              <Route path="/" element={<Main/>}/>
              <Route path="/newPatient" element={<NewPatient/>} />
              <Route path="/patients" element={<Patients/>} />
              <Route path="/patientHistory" element={<PatientHostory/>}/>
              <Route path="/booking" element={<Booking/>} />
              <Route path="/todayBooking" element={<TodayBooking/>}/>
              <Route path="/allBookings" element={<AllBookings/>}/>
              <Route path="/newBooking" element={<NewBooking/>} />
              <Route path="/reservations" element={<Reservation/>} />
              <Route path="/newReservations" element={<NewReservation/>} />
              <Route path="/allReservations" element={<AllReservations/>} />
              <Route path="/ReservationDetails" element={<ShowReservation/>} />
              <Route path="/dailyInfo" element={<DailyInfo/>}/>
              <Route path="/patientDetails/:id" element={<PatientDetails/>} />
              <Route path="/ExpensesRevenues" element={<ExpensesRevenues/>}/>
              <Route path="/ExpensesRevenues/newExpense"element={<NewExpense/>} />
              <Route path="/ExpensesRevenues/newRevenue"element={<NewRevenue/>} />
              <Route path="/ExpensesRevenues/expenses"element={<ShowExpenses/>} />
              <Route path="/ExpensesRevenues/revenues"element={<ShowRevenues/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/signup" element={<SignupForm/>} />
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
    </PatientProvider>
    </QueryClientProvider>
  );
}

export default App;
