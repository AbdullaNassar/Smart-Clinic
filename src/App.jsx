import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Main from "./features/Dashboard/pages/Main";
import NewPatient from "./features/patient/pages/NewPatient";
import PatientHostory from "./features/patient/pages/PatientHistory";
import { PatientProvider } from "./features/patient/context/PatientContext";
import NewBooking from "./features/Booking/pages/NewBooking";
import AllBookings from "./features/Booking/pages/AllBookings";
import AllReservations from "./features/Reservation/pages/AllReservations";
import NewReservation from "./features/Reservation/pages/NewReservation";
import TodayBooking from "./features/Booking/pages/TodayBooking";
import PatientDetails from "./features/patient/pages/PatientDetails";
import ShowReservation from "./features/Reservation/pages/ShowReservation";
import NewExpense from "./features/ExpensesRevenues/pages/NewExpense";
import ShowExpenses from "./features/ExpensesRevenues/pages/ShowExpenses";
import ShowRevenues from "./features/ExpensesRevenues/pages/ShowRevenues";
import Login from "./features/authentication/pages/Login";
import GlobalStyles from "./shared/styles/GlobalStyles";
import ProtectedRoute from "./shared/components/ui/ProtectedRoute";
import AppLayout from "./shared/components/layout/AppLayout";
import UpdateBooking from "./features/Booking/pages/UpdateBooking";
import Store from "./features/store/pages/Store";
import NotFound from "./shared/components/ui/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <PatientProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Main />} />
              <Route path="/newPatient" element={<NewPatient />} />
              <Route path="/patientHistory" element={<PatientHostory />} />
              <Route path="/todayBooking" element={<TodayBooking />} />
              <Route path="/allBookings" element={<AllBookings />} />
              <Route path="/newBooking" element={<NewBooking />} />
              <Route path="/updateBooking/:id" element={<UpdateBooking />} />
              <Route path="/newReservations" element={<NewReservation />} />
              <Route path="/allReservations" element={<AllReservations />} />
              <Route path="/ReservationDetails" element={<ShowReservation />} />
              <Route path="/patientDetails/:id" element={<PatientDetails />} />
              <Route path="/newExpense" element={<NewExpense />} />
              <Route path="/expenses" element={<ShowExpenses />} />
              <Route path="/revenues" element={<ShowRevenues />} />
              <Route path="/store" element={<Store />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
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
